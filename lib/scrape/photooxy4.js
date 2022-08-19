const fetch = require("node-fetch");
const FormData = require("form-data");
const cheerio = require("cheerio");

// Request URL: https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html
exports.party = (text) => {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        form.append('optionNumber_0', 0)
        form.append('text_2', text)
        form.append('login', 'OK')
        fetch("https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html", {
                method: "POST",
                headers: {
                    Accept: "/",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
                    ...form.getHeaders(),
                },
                body: form.getBuffer(),
            })
            .then(async data => {
                data = await data.text()
                const $ = cheerio.load(data)
                const result = $('div.thumbnail > img').attr('src')
                resolve("https://photooxy.com" + result)
            })
            .catch(reject)
    })
}

exports.sky = (text) => {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        form.append('text_1', text)
        form.append('login', 'OK')
        fetch("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", {
                method: "POST",
                headers: {
                    Accept: "/",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
                    ...form.getHeaders(),
                },
                body: form.getBuffer(),
            })
            .then(async data => {
                data = await data.text()
                const $ = cheerio.load(data)
                const result = $('div.thumbnail > img').attr('src')
                resolve("https://photooxy.com" + result)
            })
            .catch(reject)
    })
}

exports.glitch = (text, text2) => {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        form.append('text_1', text)
        form.append('text_2', text2)
        form.append('login', 'OK')
        fetch("https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html", {
                method: "POST",
                headers: {
                    Accept: "/",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
                    ...form.getHeaders(),
                },
                body: form.getBuffer(),
            })
            .then(async data => {
                data = await data.text()
                const $ = cheerio.load(data)
                const result = $('div.thumbnail > img').attr('src')
                resolve("https://photooxy.com" + result)
            })
            .catch(reject)
    })
}