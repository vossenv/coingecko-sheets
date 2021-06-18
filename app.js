const axios = require('axios');

const main_sheet = "main";
const base_url = "http://coins.lakebodom.net";
const path = "/api/v3/coins/markets?vs_currency=usd&ids="
const target_url = base_url + path;
const maxlen = 255 - target_url.length;

const link = "aave,acoin,cardano,akropolis,allianceblock,aleph,algorand,ampleforth,aragon-china-token,ankr,1inch,aurora,api3,apollon-limassol,arpa-chain,arcs,cosmos,concierge-io,avalanche-2,band-protocol,bat-finance,bitcoin-cash,bitcoin-cash-abc-2,bet-protocol,bloc-money,binancecoin,bns-token,bosagora,thunderbolt,boson-protocol,bridge-oracle,bitcoin-cash-sv,bitcoin,bittorrent-2,burency,pancakeswap-token,cardstack,carnomaly,cashaa,cryptobosscoin,celo,chain-guardians,chromaway,chiliz,cryptoindex-io,nervos-network,combo-2,compound-governance-token,coti,crypto-com-chain,crypterium,curve-dao-token,clintex-cti,cudos,crowns,constellation-labs,dao-maker,dapp-com,dash,derogold,dero,defichain,digibyte,dia-data,divi,dmm-governance,dodo,dogecoin,polkadot,defipulse-index,stacktical,defi-yield-protocol,elrond-erd-2,elastos,dogelon-mars,enjincoin,enq-enecuum,eos,eosforce,equalizer,ethernity-chain,unfederalreserve,ethereum-classic,ethereum,electroneum,energy-web-token,fractal,filecoin,fortknoxter,zelcash,franklin,the-forbidden-forest,ampleforth-governance-token,ferrum-network,frontier-token,fitmin,gas,glitch-protocol,graphlinq-protocol,gamb,gochain,gomoney2,grin,the-graph,gspi,hackenai,hedera-hashgraph,hymnode,hord,hathor,hydra,hyve,internet-computer,icon,ideaology,iostoken,iota,jarvis,just,jupiter,kardiachain,kambria,kucoin-shares,kadena,klever,kyber-network-crystal,kryll,kusama,labs-group,unilayer,chainlink,launchx,lockchain,tokenlon,loopring,litecoin,lattice-token,wrapped-terra,lympo,lukso-token,mahadao,matrix-ai-network,decentraland,marcopolo,nftx-hashmasks-index,matic-network,mirror-protocol,morpheus-labs,maker,milk-alliance,moneyswap,multivac,mxc,maxonrow,nano,neo,unifty,nimiq-2,noia-network,pundi-x,newscrypto-coin,omisego,harmony,ontology,opacity,oraichain-token,orbs,orion-protocol,loki-network,orchid-protocol,pax-gold,chainx,polkadex,pha,phoenixdao,pivx,pluton,proof-of-liquidity,polkamarkets,polylastic,presearch,prometeus,props,parsiq,pundi-x-2,vulcan-forged,quant-network,qtum,reapit,republic-protocol,augur,revelation-coin,revv,redfox-labs-2,rio-defi,rally-2,render-token,oasis-network,ravencoin,the-sandbox,terra-sdt,senso,super-zero,safe-haven,shiba-inu,sharering,smartkey,havven,solana,soul-token,shopping-io,sparkpoint,starchain,standard-protocol,storj,strong,stox,suku,sushi,suterusu,swingby,swipe,sylo,taraxa,token-cashpay,telcoin,theta-token,thekey,telos,toko,tomochain,tower,trias-token,tron-bsc,upbots,uma,unifi-protocol-dao,uniswap,uno-re,ultra,vaiot,velo,vechain,videocoin,v-id-blockchain,verasity,v-systems,vethor-token,waves,wax,waves-enterprise,winklink-bsc,wom-token,wirex,curate,digitalbits,xdce-crowd-sale,nem,haven,stellar,monero,ripple,xensor,tezos,symbol,yearn-finance,yield-optimization-platform,zcash,zeroswap,zencash,zilliqa,orcax"
const test_coins = link.split(",");

console.log();

function getIdRange() {

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.getSheetByName(main_sheet);
    var range = ss.getRange("A2:A");
    var values = range.getValues();
    return values.filter(function (el) {
        return el != null && el != "";
    });

}

function get_requests(coins) {

    var requests = [];
    var q = target_url;

    coins.forEach(function (c) {
        q += c + ",";
        if (q.length > maxlen) {
            requests.push(q.slice(0, -1));
            q = target_url;
        }
    });
    return requests;
}


function getUrl(url) {
    return axios.get(url);
}

function offline_process(requests) {
    let calls = []
    requests.forEach(function (c) {
        calls.push(getUrl(c))
    });

    Promise.all(calls)
        .then(function (results) {
            let coins = [];
            results.forEach(function (c) {
                coins.push.apply(coins, c.data)
            });

            process_coins(coins);
        });
}

function process_coins(coins) {
    let x;
}

function make_call(url) {

}

r = get_requests(test_coins);
offline_process(r);

var x
