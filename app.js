const main_sheet = "main";
const data_sheet = "data";
const base_url = "http://coins.lakebodom.net";
const path = "/api/v3/coins/markets?vs_currency=usd&ids="
const target_url = base_url + path;
const maxlen = 255 - target_url.length;
const ss = SpreadsheetApp.getActiveSpreadsheet()

function onOpen() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const entries = [{
        name: "Update Coins",
        functionName: "main"
    }];
    sheet.addMenu("Coins", entries);
}

function get_coin_range() {

    let coins = []
    let range = ss.getSheetByName(main_sheet).getRange("A2:A");
    let vals = range.getValues();


    vals.forEach(function (el) {
        if (!!el[0].trim()) {
            coins.push(el[0].toLowerCase());
        }
    });

    return coins.sort();

}

function get_requests(coins) {

    var requests = [];
    var q = target_url;

    coins.forEach(function (c) {

        if (q.length + c.length > maxlen) {
            requests.push(q.slice(0, -1));
            q = target_url;
        }
        q += c + ",";
    });

    requests.push(q.slice(0, -1));
    return requests;
}

function write_headers(keys) {
    keys = keys.map(k => k.replace(/_/g, " "));
    keys = [keys]
    const r = ss.getSheetByName(data_sheet).getRange(1, 1, 1, keys[0].length);
    r.setValues(keys);
}

function format_keys(key, value) {

    if (key === "id") {
        return value.toLowerCase();
    } else if (key === "symbol") {
        return value.toUpperCase();
    }
    return value;
}


function process_coins(coins) {

    let formatted = []
    let table = [];
    let keys = Object.keys(coins[0])
    keys = keys.map(v => v.toLowerCase());

    coins.forEach((c) => {
        keys.forEach((k) => {
            formatted.push(c[k] ? format_keys(k, c[k]) : "");
        });
        table.push(formatted);
        formatted = [];
    });
    ss.getSheetByName(data_sheet).getRange("A1:Z").clearContent();
    write_headers(keys);
    ss.getSheetByName(data_sheet).getRange(2, 1, table.length, keys.length).setValues(table);
}


function collect_data(url_list) {

    let data = []
    let results = UrlFetchApp.fetchAll(url_list);

    results.forEach(function (r) {
        let p = JSON.parse(r.getContentText());
        data.push.apply(data, p);
    });

    data.sort(function (a, b) {
        if (a.symbol < b.symbol) {
            return -1;
        }
        if (a.symbol > b.symbol) {
            return 1;
        }
        return 0;
    })
    return data;
}

function main() {
    let coins = get_coin_range();
    let r = get_requests(coins);
    let d = collect_data(r);
    process_coins(d);
}

