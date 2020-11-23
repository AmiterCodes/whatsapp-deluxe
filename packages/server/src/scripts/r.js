
module.exports = () => {
const fs = require('fs');
var qrcode = require('qrcode-terminal');
const fetch = require('node-fetch');
const wb = require('whatsapp-web.js');
const queryString = require('query-string');
var parser = require('fast-xml-parser');
const API = require('../api');
let parse = require('node-html-parser').parse;
var he = require('he');
const ClientInfo = require('whatsapp-web.js/src/structures/ClientInfo');
let Client = wb.Client;
let MessageMedia = wb.MessageMedia;
// a simple TeX-input example
var mjAPI = require("mathjax-node-svg2png");
mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  }
});
mjAPI.start();


const sharmuta = [
    'שי ישרמוטה בת זונה מוצצת קש של פחית קולה נטושה',
    'שתקי יבת זונה מפגרת',
    'סתמי תפה שלך יא שרמוטה מי בכלל שאל אותך מי בת זונה',
    'בת זונה מפגרת באמת מפגרת חינוך מיוחד כבר עשו דוקטורט עדיין בכיתה ג',
    'שי ישרמוטה מי יגע בך עם מקל לא יגעו בך בת זונה',
    'ישרמוטה הכוס שלך רקוב כוס חילזון',
    'שרמוטה מזדיינת',
    'לכי תתאבדי למה אף אחד לא אוהב אותך שרמוטה בת זונה איכס מי יגע בך',
    'ישרמוטה אף אחד לא שם עלייך שאפילו הקללות עלייך לא קוללו באופן ידני',
    'יזונה בת שרמוטה הרדיוס של התחת שלך נמדד על ידי מודל גאוצנטרי',
    'לכי תחפשי מי ינענע אותך יא בת שרמוטה',
    'את אפילו לא בת של אלף זונות כי כל הזונות שונאות אותך',
    'כוס אמא שלך יא גבה מכוערת לכי תחפשי עגיל בחור תחת של חברה שלך',
    'את נראית כמו משטוע יא מזדיינת בתחת',
    'מה את לומדת בויצו יא מזדיינת לכי תל אביבית מסריחה',
    'את עושה לי חלחלה יא תירוץ של אישה לכי תמצצי אבוקדו',
    'אשכנזייה מטומטמת תעשי סלטה משולשת ממגדלי עזראלי',
    'לכי תבכי לאבא שלך שלא אוהב אותך יא חתיכת חביתה מקושקשת',
    'את נראית כמו הכיפה של הזין יא וואג\'יינה רופפת',
    'פאק שי אול מיי הוומיז הייט שיי',
    'לכי לסנטר לצבוע את השערות של הפוסי עם כל החברות הטראנסג\'נדריות שלך',
]

const download = require('image-downloader')

const votingServer = 'http://localhost:8080/';
const voiceServer = 'https://localhost:5000/';


let games = []


// Use the saved values
const { client } = API.default;

client.on('message_revoke_everyone',async (msg, rev) => {
    if(rev != null && !msg.fromMe) {
        let chat = await msg.getChat()
        let auth = msg.author;
        if(!chat.isGroup) auth = chat.id._serialized;
        let contact = await client.getContactById(auth);
        console.log(`@${contact.id.user} שלח ומחק: ` + rev.body);
    }
});

let tq = [
    {
        nigga: 'atjklt@c.us',
        options: [false,false,false,true],
        msg: 'aklajhkld@c.us'
    }
]

var options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};





String.prototype.reverse = function () {
    var s = "";
    var i = this.length;
    while (i > 0) {
        s += this.substring(i - 1, i);
        i--;
    }
    return s;
}
Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

let postedQuestions = []

let mendel = 0;

const Instagram = require('instagram-web-api');
const { DateTime } = require('luxon');
//let insta = new Instagram({username: 'naveamit', password: })

let config = require('./data.json');

client.on('ready',async () => {
    
    await client.pupPage.evaluate(async () => {
        window.Store.SendSeen.sendSeen = () => {}
        let a = true;
        let int = setInterval(() => {
        a = !a;    
        Store.Wap.sendSetStatus(a ? " ➖👅➖ 🖤" : " 👁️👅👁️ 💛") 
        },1000)
    });

    //await insta.login()
    console.log('bot online')
    fetch(votingServer + "setcouncil", {
        method: 'PUT',
        body: '972546461280-1571250832@g.us'
    })
    
    let sent = false;

    setInterval(async() => {
        let req =await fetch(votingServer + 'update', 
        {
            method: 'PUT'
        })
        let day = config.last_day;

        let today = DateTime.local();

        if(today.day > day) {
            const chats = ['972586649222-1571252631@g.us', '972545645252-1600004388@g.us', '972509702398-1589224361@g.us', '972587843578-1573827076@g.us']
            //const chats = ['972544805278@c.us']
            let searchString = `https://www.reddit.com/r/justjerklessjuly/search.json?q=give%20it%20up%20for%20day%20${today.day}&restrict_sr=1&sort=top`
            let redditData = await(await fetch(searchString)).json();



            let imgUrl = redditData.data.children[0].data.url_overridden_by_dest

            let { filename } = await download.image({ url: imgUrl, dest: './photos/' })

            
            chats.forEach(async c => {
                let reich = await client.getChatById(c);
                reich.sendMessage(MessageMedia.fromFilePath(filename), { caption: `יום ${today.day}!! תנו את זה ליום ${today.day}!!` })

            
            })
            
            config.last_day = today.day;

            fs.writeFileSync("data.json", JSON.stringify(config));
        }
        

        let data = await req.json();
        data.forEach(async mts => {
            let c = await client.getChatById(mts.chatID);
            let content = mts.content;
            c.sendMessage(content);
        })
    },10000)
});



client.on('message_create', async (msg) => {



    let chat = await msg.getChat();
    let sender = msg.author;
    if(!chat.isGroup) sender = chat.id._serialized;


    if(msg.fromMe) sender = '972544805278@c.us'
    console.table([sender, chat.id._serialized])
    if(chat.id._serialized == "972524657985@c.us") {
        msg.forward("972544805278-1599502846@g.us")
    }
    let sendMath = (msg, math) => {
        try {
        mjAPI.typeset({
            math,
            png:true,
            scale: 4,
            format: "TeX", // or "inline-TeX", "MathML"
          }, function (data) {
            if (!data.errors) {
                msg.reply(new MessageMedia('image/png', data.png.slice('data:image/png;base64,'.length)))
                console.log("Math sent")
            } else {
                msg.reply("קרתה בעיה")
            }
          });
        } catch(e) {
            msg.reply("קרתה בעיה חמורה")
        }
    }

    

    if(msg.body.startsWith("מתמ ")) {
        let math = msg.body.slice("מתמ ".length);
        console.log(math);
        sendMath(msg, math)
    }

    if(msg.body.includes("https://vm.tiktok.com/") && !msg.fromMe && msg.author != '972523634701@c.us') {
        msg.reply("טיקטוק זה שעמום טוטאלי" + "(" + "על פי חוק #59" + ")" + "\n" + "_ההודעה הזאת נכתבה באופן אוטומטי על ידי בוט_")
    }

    if(msg.body.startsWith("tex ")) {
        let math = msg.body.slice("tex ".length);
        console.log(math);
        sendMath(msg, math)
    }

    let chatM = [
        'כולם שונאים אותך',
        'תמות כבר, אתה סתם מציק לכולם',
        `אין לך חברים
תתאבד כבר`,
        
    ];
    if(msg.body == "?מה") {
        msg.reply(chatM[mendel]);
        mendel = (mendel + 1) % chatM.length;
    }

    if(msg.body == "!חיים מענדל") {
        msg.reply(`צ'אט המדגים בריונות ברשת
אף אחד לא אוהב אותך`)
    }

    if(msg.body.startsWith("פוסט של ")) {
        let username = msg.body.slice("פוסט של ".length);
        console.log(username)
        let photos = await insta.getPhotosByUsername({ username, first: 1 })
        photos = (photos.user.edge_owner_to_timeline_media.edges)
        console.log(photos)
        if(photos.length == 0) {
            msg.reply("אין תמונות או משהו")
            return;
        } 
        console.log("Image exists")
        let { filename } = await download.image({url: photos[0].node.display_url, dest: './photos/' })
        console.log("Image downloaded")
        msg.reply(MessageMedia.fromFilePath(filename), null,{caption: "תהנה בחור טוב"});
        console.log("Image sent")
        return;
    }

    if(msg.body.startsWith("תן לייק ל")) {
        let username = msg.body.slice("תן לייק ל".length);
        console.log(username)
        let photos = await insta.getPhotosByUsername({ username, first: 1 })
        photos = (photos.user.edge_owner_to_timeline_media.edges)
        console.log(photos)
        if(photos.length == 0) {
            msg.reply("אין תמונות או משהו")
            return;
        } 
        console.log("Image exists")
        await insta.like({ mediaId: photos[0].node.id })
        console.log("Liked")
        return;
    }


    if(msg.body.startsWith("מערכת")) {
        let cl = msg.body.substring("מערכת ".length);
        let id = undefined;
        if(msg.body == "מערכת") id = 19;
        
        if(cl == "יב2" || cl == 'י"ב2' || cl == "") id = 19;
        if(cl == "יב3" || cl == 'י"ב3') id = 20;
        if(cl == "יב7" || cl == 'י"ב7') id = 36;
        if(cl == "יב4" || cl == 'י"ב4') id = 22;

        if(id == undefined) return;

        const browser = client.pupBrowser;
        const page =await browser.newPage();
        
        await page.goto("http://ramon.iscool.co.il/default.aspx", {waitUntil: 'domcontentloaded'});
        
        await Promise.all([
            page.waitForNavigation(),
            page.select("#dnn_ctr8330_TimeTableView_ClassesList", id + "")]);
        await Promise.all([
            page.waitForNavigation(),
            page.click("#dnn_ctr8330_TimeTableView_btnChangesTable")]);
            await page.evaluate(() => {
                document.querySelectorAll("div > b").forEach(d => d.innerText == "חינוך גופני" ? d.innerText = "כדורגל" : d.innerText = "חשבון")
    document.querySelector('html').innerHTML = document.querySelector('html').innerHTML.replaceAll("חינוך גופני","כדורגל")
            })
        await page.screenshot({
            path: "sharabi.png",
            fullPage: true
        })
        await page.close();
        msg.reply(MessageMedia.fromFilePath("./sharabi.png"));
    }

    if(msg.body == "נווה עמית") {
        msg.reply("שווה הכי");
        return;
    }

    if(msg.body == "שבת שלום") {
        msg.reply(MessageMedia.fromFilePath("nim.jpg"),null, {caption: 'מאדרפאקרס' })
    }

    if(msg.body.startsWith("code ")) {
        const code = msg.body.substring(5);
        let carbon = require('./carbon');
        const qs = queryString.stringify({
            code
        })
        await carbon({ url: 'https://carbon.now.sh/?' + qs });
        await msg.reply(MessageMedia.fromFilePath("carbon.png"));
        return;
    }

    if(msg.body == "עמית נווה") {
        msg.reply("הכי שווה");
        return;
    }

    if(msg.body == "בטרייה") {
        let info = new ClientInfo(client);
        let status = await info.getBatteryStatus()
        
        msg.reply(`לעמית נווה כרגע יש ${status.battery}% סוללה, והטלפון שלו במצב ${status.plugged ? "נטען" : "לא נטען"}`)
    }

    if(msg.body == 'תן שידוך') {

        
        if(!chat.name.includes("שמיניסטים")) {  
            if(!chat.isGroup) {
                msg.reply("אוווואוווו, אני מבין שיש ניסיון להתחיל איתי, בטח חשבת שזה יהיה מהלך חכם אבל אני צפיתי אותו מראש")
            } else {
                let parts = [...chat.participants];
                parts.shuffle();
                let person1 = parts.pop();
                let person2 = parts.pop();

                let contact1 = await client.getContactById(person1.id._serialized);
                let contact2 = await client.getContactById(person2.id._serialized);

                let name1 = contact1.pushname;
                let name2 = contact2.pushname;

                if(name1 === undefined) {
                    name1 = contact1.name;
                }
                if (name2 === undefined) {
                    name2 = contact2.name;
                }
                if(name1 === undefined) {
                    name1 = contact1.number;
                    if(contact1.number == 972544805278) name1 = "Amit Nave";
                }
                if (name2 === undefined) {
                    name2 = contact2.number;
                    if(contact2.number == 972544805278) name2 = "Amit Nave";
                }

                let person1url = await contact1.getProfilePicUrl();
                let person2url = await contact2.getProfilePicUrl();

                console.log(person1url);
                console.log(person2url);

            
                let background = './rabbi.jpg'
                const { createCanvas, loadImage } = require('canvas')
                const canvas = createCanvas(300,300)
                const ctx = canvas.getContext('2d')
                
                ctx.font = '20px Sans'
            
                let image = await loadImage(background)
            
                ctx.drawImage(image, 0, 0, 300, 300)
                
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText(`אני מכריז עליכם, ${name1}`, 150, 200)
                ctx.fillText(` ו${name2} כבעל ואישה`, 150, 230);
                ctx.fillStyle = "black";
            
                if(person1url != undefined) {
                image = await loadImage(person1url)
                ctx.drawImage(image, 20, 60, 100, 100)
                }
                if(person2url != undefined) {
                image = await loadImage(person2url)
                ctx.drawImage(image, 180,60,100,100);
                }
                const fs = require('fs')
                const out = fs.createWriteStream(__dirname + '/test.jpeg')
                const stream = canvas.createJPEGStream()
                stream.pipe(out)
                out.on('finish', () => {
                    console.log('The JPEG file was created.')
                    msg.reply(MessageMedia.fromFilePath('test.jpeg'));
                })
            }
        }
    }

    if(msg.body == "עמית נווה רועי גרשון") {
        msg.reply("הכי שווה מקום ראשון");
        return;
    }

    let repliedToBot = false;
    let repliedMessage = '';
    if(msg.hasQuotedMsg){
        let qMsg = await msg.getQuotedMessage();
        repliedMessage = qMsg.body;
        if(qMsg.fromMe) {
            repliedToBot = true;
        }
    }



    let message = {
        content: msg.body,
        chatId: chat.id._serialized,
        repliedMessage,
        repliedToBot,
        sender
        
    }
    let req = await fetch(votingServer + "message", {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
        'Content-Type': 'application/json'
        }
    });
    let txt = await req.text();
    if(txt == '') return;
    let data = JSON.parse(txt);
    data.forEach(async mts => {
        let c = await client.getChatById(mts.chatID);
        let content = mts.content;
        c.sendMessage(content);
    })
});






client.on('message', async msg => {
    let authid = msg.author;
    let chat = await msg.getChat();
    const mentions = await msg.getMentions();
    let duelRegex = /^!duel @\d+$/g
    let acceptRegex = /^!accept @\d+$/g

    if(msg.body.match(acceptRegex)) {
        for (let contact of mentions) {
            await duel(contact, await client.getContactById(authid), chat, msg);
            return;
        }
        console.log("no mention specified");
    }

    if (msg.body.match(duelRegex)) {
        for (let contact of mentions) {
            await ask(await client.getContactById(authid), contact, chat, msg);
            return;
        }
        console.log("no mention specified");
    }

    if (!chat.isGroup) {
        if (msg.hasQuotedMsg) {
            let qMsg = await msg.getQuotedMessage()
            
            let game = games.find(g => g.message != undefined && g.message.id._serialized == qMsg.id._serialized)
            console.log(game);
            console.log(authid);
            if (game == undefined) return;
            if (msg.body.match(/^[1-3]$/g)) {
                if (game.p1.id.user == chat.id.user) {
                    reply(1, game, msg, qMsg);
                    return;
                }
                if (game.p2.id.user == chat.id.user) {
                    reply(2, game, msg, qMsg);
                    return;
                }

                msg.reply("זה לא המשחק שלך");
            }
        }
    }
})

let numToSymbol = (n) => {
    if(n == 1) return '🗿'
    if(n == 2) return '🧻'
    if(n == 3) return '✂️'
    return '🤡'
}

let reply = async (p, game, msg, qMsg) => {
    let player = `p${p}rep`
    if (game[player] == undefined) {
        game[player] = msg.body;
        let {p1rep, p2rep} = game;
        if (p1rep != undefined && p2rep != undefined) {
            let chat = await qMsg.getChat();
            let {
                p1,
                p2
            } = game;
            let winner = 0;
            if(p1rep == 1 && p2rep == 3) winner = 1;
            else if (p2rep == 1 && p1rep == 3) winner = 2;
            else if (p1rep > p2rep) winner = 1;
            else if (p2rep > p1rep) winner = 2;

            if(winner == 0)
            {
                let msg = await chat.sendMessage(`אוקיי המשחק נגמר!\n
    @${p1.id.user} בחר/ה ${numToSymbol(p1rep)}
    @${p2.id.user} בחר/ה ${numToSymbol(p2rep)}
    \nהמשחק נגמר בתיקו`, 
    { mentions: [p1, p2]});
            } else {
                let winP = winner == 1 ? p1 : p2;
                let msg = await chat.sendMessage(`אוקיי המשחק נגמר!\n
    @${p1.id.user} בחר/ה ${numToSymbol(p1rep)}
    @${p2.id.user} בחר/ה ${numToSymbol(p2rep)}
    \n🏆🏆@${winP.id.user} ניצח/ה!🏆🏆`, 
    { mentions: [p1, p2, winP]});
            }
            game.finished = true;
            return;
        } else {
            msg.reply('מחכה לשחקן האחר')
        }

        return;
    }

    msg.reply('כבר בחרת יא טיפש/ה')
}

let ask = async (p1, p2, chat, msg) => {
    if (!chat.isGroup) {
        msg.reply("אתה לא יכול להתחיל משחק בפרטי");
        return;
    }
    if (games.some(game =>
            ((game.p1.id.user == p1.id.user && game.p2.id.user == p2.id.user) || (game.p2.id.user == p1.id.user && p2.id.user == game.p1.id.user)) &&
            !game.finished
        )) {
        msg.reply("כבר יש משחק כזה");
        return;
    }

    games.push({
        p1,
        p2,
        accepted: false,
        finished: false,
        p1rep: undefined,
        p2rep: undefined,
        message: undefined,
    })

    chat.sendMessage(`שלום לך, @${p2.id.user},\n @${p1.id.user}רוצה להתחיל איתך קרב\n\nהשתמש ב !accept @${p1.id.user}`, {
        mentions: [p2, p1, p1]
    })
}

let duel = async (p1, p2, chat, msg) => {

    let g = games.find(game =>
        ((game.p1.id.user == p1.id.user && game.p2.id.user == p2.id.user) &&
            !game.finished &&
            !game.accepted
        ));

    if (g == undefined) {
        console.table(games);
        msg.reply("לא נמצאו הזמנות");
        return;
    }
    g.accetped = true;

    let m = await chat.sendMessage(`אוקיי, משחק מתחיל\n @${p1.id.user}, @${p2.id.user} תענו להודעה הזאת בפרטי עם מספר החפץ שתרצו להשתמש, לפי הטבלה כאן:
    \n1 - 🗿
    \n2 - 🧻
    \n3 - ✂️`, {
        mentions: [p1, p2]
    })
    g.message = m;
}
}