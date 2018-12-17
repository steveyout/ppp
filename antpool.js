const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
var randomItem = require('random-item');
const Markup = require('telegraf/markup');
const bot = new Telegraf("769118259:AAHF97a0Ck1r7iPVa6qCda6hyyA4TqaMy64");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
var randomDecimal = require('random-decimal');
const { enter,leave } = Stage
var btc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var rates = require("bitcoin-exchange-rates");
var cron = require('node-cron');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var coinbase = require('coinbase');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'

var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var con = mysql.createConnection({
    host: "bjy7dmuln-mysql.services.clever-cloud.com",
    user: "utyc70jnaxrlnjyw",
    password: "hB9MNmpZFAfzgfaIdFh",
    database:"bjy7dmuln"
});
var rn = require('random-number');
var options = {
    min:  0.000001
    , max:  0.0001
}
//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start
bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    con.query("SELECT id FROM account WHERE id=" + id, function (err, result, fields) {
        console.log(result.length)
        if (message.text == start&&result.length===0) {
            var chatid = ctx.from.id;
            var firstname = ctx.from.first_name;
            var bal = 0;
            var tim = new Date();
            var address = 'none';
            var refa = 411002680;
            var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, ref: refa};
            con.query("insert into `account` SET ?", user, function (error, results) {
                ctx.replyWithHTML('welcome ' + ctx.from.first_name + ' to <b>Grand Mining BTC</b>.\n\n<b>✳ Hire miners</b>\n<b>✅ Gain income</b>\n<b>💵 Withdraw BTC</b>️', Markup
                    .keyboard([
                        ['🏠Menu'] // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())
            })

        } else if (message.text.split(start)[1] == id) {
            ctx.reply('🚫You cannot refer yourself', Markup
                .keyboard([
                    ['🏠Menu'] // Row1 with 2 buttons
                ])

                .resize()
                .extra())
        } else if (message.text.split(start)[1] !== id) {

            var chatd = ctx.from.id
            con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
                console.log(result.length)
                if (result.length === 0) {

                    var chatidi = ctx.from.id;
                    var firstnamee = ctx.from.first_name;
                    var bala = 0;
                    var time = new Date();
                    var addresse = 'none';
                    var refidi = message.text.split(start)[1]
                    var useri = {
                        id: chatidi,
                        balance: bala,
                        firstname: firstnamee,
                        time: time,
                        withdrawadd: addresse,
                        ref: refidi,
                    };
                    con.query("insert into `account` SET ?", useri)

                    var chatd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                        if (result[0].ref !== refidi) {
                            var refbonus =0.000005;
                            var ref = 1;
                            var refid = message.text.split(start)[1];
                            var sql = "update `account` set `balance` =`balance`+ '" + refbonus + "', friends =`friends`+ " + ref + ", friendsbonus = `friendsbonus`+" + refbonus + " where `id` = '" + refid + "'";



                            con.query(sql)

                            ctx.replyWithHTML('welcome ' + ctx.from.first_name + ' to <b>Grand Mining BTC</b>.\n\n<b>✳ Hire miners</b>\n<b>✅ Gain income</b>\n<b>💵 Withdraw BTC</b>️', Markup
                                .keyboard([
                                    ['🏠Menu'], // Row1 with 2 buttons
                                ])


                                .resize()
                                .extra())
                            con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                                ctx.telegram.sendMessage(result[0].id, 'you have a new refferal,you receive:<b>+0.000005 BTC 💵️</b>',Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('🔮Account', '🔮Account')

                                    ], {columns: 1})))


                            })
                        }
                    })

                } else if (result.length > 0) {
                    var rd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                        if (result[0].ref == ctx.message.text.split(start)[1]) {
                            ctx.reply('🚫you have already used this link', Markup
                                .keyboard([
                                    ['🏠Menu'] // Row1 with 2 buttons
                                ])

                                .resize()
                                .extra())
                        } else if (result[0].ref !== ctx.message.text.split(start)[1]) {
                            ctx.reply('???', Markup
                                .keyboard([
                                    ['🏠Menu'] // Row1 with 2 buttons
                                ])

                                .resize()
                                .extra())
                        }
                    })
                }
            })
        }
    })
})
//////////menu
bot.hears('🏠Menu',ctx => {
    ctx.replyWithHTML('<b>🏠Menu</b>',Markup
        .keyboard([
            ['🔮Account'],
          ['➕Deposit','🎉Shop','🏦Withdraw'],
            ['👤Refferal','🎁Bonus','☎️Suppoort']
        ])

        .resize()
        .extra())

        .then(()=>{
    ctx.replyWithHTML('<b>🔻Recent transactions 👇🏻</b>',Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.urlButton('🔻Recent transactions', 'https://t.me/GrandMiningBtcTransactions')

        ], { columns: 1 })))
        })

})
//////account
bot.hears('🔮Account',ctx => {
    var id=ctx.from.id
    var sql = "SELECT balance,withdrawadd from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        var btcAmount, currency, rates;

        rates = require('bitcoin-exchange-rates');

        btcAmount = results[0].balance;

        currency = 'USD';

        rates.fromBTC(btcAmount, currency, function (err, rate) {
            client.getSpotPrice({'currencyPair': 'BTC-USD'}, function (err, price) {
                ctx.replyWithHTML('<b>🔮Account</b>\n\n🔹 Total BTC:️<b>' + results[0].balance + '</b>\n\n🔹 Total usd:<b>' + rate + '</b>' + '\n\n🔹 <b>1 BTC</b>=<i>' + price.data.amount + '</i>')
                    .then(() => {
                        ctx.replyWithHTML('<i>➕  Add Btc to earn faster or \n      👬 invite your friends</i>', Markup
                            .keyboard([
                                ['🖥My Machines', '🎊stats'],
                                ['➕Deposit'],
                                ['🏠Menu']
                            ])

                            .resize()
                            .extra())
                            .then(() => {
                                ctx.replyWithHTML('<b>your withdraw wallet:</b> ' + results[0].withdrawadd, Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('🖋Set withdraw wallet', '🖋Set withdraw wallet')

                                    ], {columns: 1})))


                            })
                    })
            })
        })
    })
    ////////////transactions
    var user = ctx.from.id
    var sqli = "SELECT depoaddre,txid,ref,id from `account` where `id` = '" + user + "'";
    con.query(sqli, function (error, res, fields) {
        if (res[0].depoaddre.length > 1) {
            client.getAccount(btc, function (err, account) {
                account.getAddress(res[0].depoaddre, function (err, address) {
                    address.getTransactions({}, function (err, txs) {
                        if (txs.length === 0) {
                            console.log('no transactions today')
                        } else if (txs[0].id == res[0].txid) {
                            console.log('transaction already confirmed')
                        } else if (txs[0].id !== res[0].txid) {
                            var txid = txs[0].id
                            var balance = txs[0].amount.amount
                            var transactions = txs[0].amount.amount
                            var chatid = ctx.from.id
                            var sqli = "update `account` set `txid` = '" + txid + "', balance = `balance`+" + balance + ", transactions = `transactions`+" + transactions + " where `id` = '" + chatid + "'";
                            con.query(sqli, function (err, response) {
                                console.log(err)
                                var ref = res[0].ref
                                var refbonus = balance * 0.30
                                var sqla = "update `account` set `balance` = `balance`+" + refbonus + " where `id` = '" + ref + "'";
                                con.query(sqla)
                                ctx.telegram.sendMessage(res[0].id, 'we have received your deposit of ' + balance + '  BTC️ ')
                                ctx.telegram.sendMessage(ref, 'you refferal just deposited. ' + refbonus.toFixed(8) + 'BTC has been added to your  balance ')
                                ctx.telegram.sendMessage('@GrandMiningBtcTransactions', 'new deposit of ' + transactions + ' BTC by ' + ctx.from.first_name + '\n\nhttps://live.blockcypher.com/btc/address/' + res[0].depoaddre)
                            })
                        }
                    })
                })
            })
        }
    })



})
////action account
bot.action('🔮Account',ctx => {
    var id = ctx.from.id
    var sql = "SELECT balance,withdrawadd from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        var btcAmount, currency, rates;

        rates = require('bitcoin-exchange-rates');

        btcAmount = results[0].balance;

        currency = 'USD';

        rates.fromBTC(btcAmount, currency, function (err, rate) {
            client.getSpotPrice({'currencyPair': 'BTC-USD'}, function (err, price) {
                ctx.replyWithHTML('<b>🔮Account</b>\n\n🔹 Total BTC:️<b>' + results[0].balance + '</b>\n\n🔹 Total usd:<b>' + rate + '</b>' + '\n\n🔹 <b>1 BTC</b>=<i>' + price.data.amount + '</i>')
                    .then(() => {
                        ctx.replyWithHTML('<i>➕  Add Btc to earn faster or \n      👬 invite your friends</i>', Markup
                            .keyboard([
                                ['🖥My Machines', '🎊stats'],
                                ['➕Deposit'],
                                ['🏠Menu']
                            ])

                            .resize()
                            .extra())
                            .then(() => {
                                ctx.replyWithHTML('<b>your withdraw wallet:</b> ' + results[0].withdrawadd, Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('🖋Set withdraw wallet', '🖋Set withdraw wallet')

                                    ], {columns: 1})))


                            })
                    })
            })
        })
    })


})




//////deposit
bot.hears('➕Deposit',ctx => {
    ctx.replyWithHTML('<b>💰Add funds to buy miners</b>\n\n<i>🔵your billing address will be generated,which you can use to deposit funds to your account to buy miners</i>\n\n<i>🔵After you make a deposit, the BTC will be automatically deposited to your account after a few minutes.</i>\n\n🔵Minimum deposit:<b>0.001 BTC</b>',Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('👇🏻Get deposit address', '👇🏻Get deposit address')

        ], {columns: 1})))



})
////wallet adress
bot.action('👇🏻Get deposit address',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoaddre.length <= 0) {
            client.getAccount(btc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    var ide =ctx.from.id
                    ctx.replyWithHTML('<code>' + adress + '</code>',Markup
                        .keyboard([
                            ['🎉Shop'],
                            ['🏠Menu']
                        ])

                        .resize()
                        .extra())
                    var sqli = "update `account` set `depoaddre` = '" + adress + "' where `id` = '" + ide + "'";
                    con.query(sqli, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>⏳ Awaiting Payment...</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<code>' + results[0].depoaddre + '</code>',Markup
                    .keyboard([
                        ['🎉Shop'],
                        ['🏠Menu']
                    ])

                    .resize()
                    .extra())

                    .then(() => {
                        ctx.replyWithHTML('<code>⏳ Awaiting Payment...</code>')

                    })
            })
        }
    })





})
/////////refferal
bot.hears('👤Refferal',ctx => {
    var id=ctx.from.id
    var sql = "SELECT friends,friendsbonus from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
    ctx.replyWithHTML('<b>👤Refferal</b>',Markup
        .keyboard([
            ['🏠Menu']
        ])
        .resize()
        .extra())
        .then(()=> {
            ctx.replyWithHTML('invite your friends and receive  BTC as a bonus and 30% from every deposit of your friend. You income is unlimited\n\n♦you get <b>0.000005 BTC</b> per refferal️\n♦ <b>Fake, empty or spam  </b>️users are deleted after checking.\n\n👥 Refferals: <b>' + results[0].friends + '</b>\n💵Your income: <b>' + results[0].friendsbonus + '</b>', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('⚡️Refferal link', '⚡️Refferal link')

                ], {columns: 1})))

        })

        })



})

//REFLINK
bot.action('⚡️Refferal link',ctx => {
    ctx.reply('http://t.me/GrandMiningBtc_bot?start='+ctx.from.id)


})

///////////miners
bot.hears('🎉Shop',ctx => {
    ctx.replyWithHTML('<b>🖥Buy miners to mine BTC for you</b>', Markup
        .keyboard([
            ['➕Deposit'],
            ['🏠Menu']
        ])

        .resize()
        .extra())
        .then(() => {
            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(2).png?1545075779875'})
                .then(() => {
                    ctx.replyWithHTML('<b>Antiminer s7</b>\n\n<i>price:0.0001 ฿</i>\n<i>income: 0.00000008 ฿ per hour</i>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('➕Buy Antiminer s7', '➕Buy Antiminer s7')

                        ], {columns: 2})))
                }).then(() => {
                //bookshop
                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(5).png?1545076953746'})
                    .then(() => {
                        ctx.replyWithHTML('<b>Avalon6</b>\n\n<i>price:  0.001 ฿ </i>\n<i>income:   0.00000093 ฿per hour</i>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('➕Buy Avalon6', '➕Buy Avalon6')

                            ], {columns: 2})))


                    }).then(() => {
                    //bakery
                    ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(4).png?1545075851633'})
                        .then(() => {
                            ctx.replyWithHTML('<b>Antminer R4</b>\n\n<i>price: 0.005 ฿ </i>\n<i>income:  0.00000521 ฿ per hour</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('➕Buy Antminer R4', '➕Buy Antminer R4')

                                ], {columns: 2})))


                        }).then(() => {
                        //butcher
                        ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(3).png?1545075764270'})
                            .then(() => {
                                ctx.replyWithHTML('<b>Whatsminer M3X</b>\n\n<i>price: 0.01 ฿  </i>\n<i>income:  0.00001125 ฿ per hour</i>', Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('➕Buy Whatsminer M3X', '➕Buy Whatsminer M3X')

                                    ], {columns: 2})))


                            }).then(() => {
                            //supermarket
                            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(2).png?1545075779875'})
                                .then(() => {
                                    ctx.replyWithHTML('<b>Antiminer T9</b>\n\n<i>price: 0.05 ฿ </i>\n<i>income:  0.000067 ฿ per hour</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('➕Buy Antiminer T9', '➕Buy Antiminer T9')

                                        ], {columns: 2})))


                                }).then(() => {
                                //jewellary
                                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(1).png?1545077135576'})
                                    .then(() => {
                                        ctx.replyWithHTML('<b>DragonMint T1</b>\n\n<i>price: 0.1 ฿ </i>\n<i>income:  0.000158 ฿ per hour</i>', Extra
                                            .HTML()
                                            .markup((m) => m.inlineKeyboard([
                                                m.callbackButton('➕Buy DragonMint T1', '➕Buy DragonMint T1')

                                            ], {columns: 2})))


                                    }).then(() => {
                                    //jewellar
                                    ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fstock-photo-cryptocurrency-mining-farm-bitcoin-and-altcoins-mining-asic-miner-d-rendering-774975592.jpg?1545077197455'})
                                        .then(() => {
                                            ctx.replyWithHTML('<b>Antminer S9i</b>\n\n<i>price: 0.25 ฿ </i>\n<i>income:  0.0005 ฿ per hour</i>', Extra
                                                .HTML()
                                                .markup((m) => m.inlineKeyboard([
                                                    m.callbackButton('➕Buy Antminer S9i', '➕Buy Antminer S9i')

                                                ], {columns: 2})))
                                        })
                                })
                            })
                        })
                    })
                })
            })
        })
})

/////////////////miners
//ant1
bot.action('➕Buy Antiminer s7',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.0001){
            var amount=0.0001 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant1` = `ant1`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Antiminer s7</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
///ant2
bot.action('➕Buy Avalon6',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.001){
            var amount=0.001 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant2` = `ant2`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Avalon6</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
///////ant3
bot.action('➕Buy Antminer R4',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.005 ){
            var amount=0.005  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant3` = `ant3`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Antminer R4</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})

////ant4
bot.action('➕Buy Whatsminer M3X',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.01 ){
            var amount=0.01  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant4` = `ant4`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Whatsminer M3X</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
////ant5
bot.action('➕Buy Antiminer T9',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.05 ){
            var amount=0.05  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant5` = `ant5`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Antiminer T9</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
/////ant6
bot.action('➕Buy DragonMint T1',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.1 ){
            var amount=0.1  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant6` = `ant6`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>DragonMint T1</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
///////////////////ant7
bot.action('➕Buy Antminer S9i',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.25 ){
            var amount=0.25  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant7` = `ant7`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Antminer S9i</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})


////bonus
bot.hears('🎁Bonus',ctx => {
    var id=ctx.from.id
    var bonus= randomDecimal({min: 0.000001, max: 0.00005, fixed: 8});
    var dat=new Date().getDate()
    var sql = "SELECT bonus from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].bonus==dat) {
            ctx.reply('⛔️ You already collected your daily bonus.\nNext bonus will be available in 24hours',Markup
                .keyboard([
                    ['➕Deposit'],
                    ['🏠Menu']
                ])

                .resize()
                .extra())
        }else {
            var sqli = "update `account` set `balance` = `balance`+'" + bonus + "', bonus = " + dat + " where `id` = '" + id + "'";
            con.query(sqli)
            ctx.replyWithHTML('Your account has been credited with:\n\n<b>Daily bonus: +</b>'+bonus+'BTC\n<i>next bonus will be available after 24hrs</i>')
        }
    })


})

////
bot.hears('🎊stats',ctx => {
    con.query('SELECT `id` FROM `account`', function (error, result) {
        con.query('SELECT SUM(transactions)FROM account;', function (err, response) {
            const re = JSON.parse(JSON.stringify(response[0]).replace('SUM(transactions)', 'suma'))
            con.query('SELECT `started` FROM `account` WHERE `id`=411002680', function (err, respa) {
                ctx.replyWithHTML('<b>📈Stastistics</b>\n\n📈Days online: ' + respa[0].started + '\n👨🏻‍️Members: ' + result.length + '\n💰Total transacted: ' + re.suma + ' BTC',Markup
                    .keyboard([
                        ['🏠Menu'] // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())
                    .then(()=>{
                        ctx.replyWithHTML('<b>🔻Recent transactions 👇🏻</b>',Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.urlButton('🔻Recent transactions', 'https://t.me/GrandMiningBtcTransactions')

                            ], { columns: 1 })))
                    })
            })
        })
    })
})




///CRON
cron.schedule('*/1 * * * * *', () => {
    var id=411002680;
    var idle=1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")

})
//days on
cron.schedule('0 0 0 * * *', () => {
    con.query('update account set `started`=`started`+1 WHERE `id`=411002680')

})









bot.startPolling()