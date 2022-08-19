//Source: https://github.com/ariffb25/stikerinbot recode by Me!
const axios = require('axios')
const cheerio = require('cheerio')
const qs = require('qs')

let is = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
        "cookie": "pll_language=en; PHPSESSID=58578e38aa296f5a12a495fc5e5f0c2e"
    }
}

function _token(host) {
    return new Promise(async (resolve, reject) => {
        axios.request({
            url: host, method: 'GET', headers: {
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                "cookie": "pll_language=en; PHPSESSID=58578e38aa296f5a12a495fc5e5f0c2e"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let token = $('#token').attr('value')
            resolve(token)
        })
    })
}

function aiodl(url) {
    return new Promise(async (resolve, reject) => {
        let host = 'https://aiovideodl.ml/'
        let form = { data: { 'url': url, 'token': (await _token(host)) } }
        axios.post(host + 'wp-json/aio-dl/video-data/', qs.stringify(form.data), { headers: is.headers })
            .then(({ data }) => {
                if (data == 'error') return resolve({ message: 'Error!' })
				resolve(data)
				console.log(data)
			})
    })
}

async function aiodl2(url){
  return new Promise(async(resolve, reject) => {
    await axios.get("https://aiovideodl.ml/", {
      headers: {
        "User-Agent":"Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        "cookie":"pll_language=en;_ga=GA1.2.1686453003.1631818437;_gid=GA1.2.902417181.1635084800;PHPSESSID=73e827c0161936f3c62f08e7210d8463"
      }
    }).then(async result => {
      if(result.status !== 200) return reject;
      $ = cheerio.load(result.data);
      postData = {
        "url": url,
        "token": $("input[name='token']").attr("value")
      };
      await axios.post("https://aiovideodl.ml/wp-json/aio-dl/video-data/", qs.stringify(postData), {
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
          "User-Agent":"Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          "origin":"https://aiovideodl.ml",
          "referer":"https://aiovideodl.ml/",
          "cookie":"pll_language=en;_ga=GA1.2.1686453003.1631818437;_gid=GA1.2.902417181.1635084800;PHPSESSID=73e827c0161936f3c62f08e7210d8463"
        }
      }).then(anu => {
        if(anu.status !== 200) return reject;
        resolve(anu.data);
        });
    }).catch(reject);
  });
}

module.exports = { aiodl, aiodl2 }
/*
aiodl("https://vt.tiktok.com/ZSePnUhdp/").then(console.log)
  if tiktok link
result : url: "https://vt.tiktok.com/ZSePnUhdp/"
			title: "twice bagus"
			thumbnail: "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037…res=1639818000&x-signature=HNZJPIJLqulSByH3Z1v02iZhFTA%3D"
			duration: null
			source: "tiktok"
			medias: Array (3 items)
			0: url: "https://v16m-default.akamaized.net/45afab8f0000097485064…cjRnanFgLS1kL2NzczVfMTEtMmBiYzY1XjUvXzE6Yw%3D%3D&vl=&vr="
				quality: "watermark"
				extension: "mp4"
				size: 749051
				formattedSize: "731.5 KB"
			1: url: "https://v16m-default.akamaized.net/05317c4176516dca00b19…cjRnanFgLS1kL2Nzc2MzMjQ1MjA1X2JfYTRgLzM6Yw%3D%3D&vl=&vr="
				quality: "hd"
				extension: "mp4"
				size: 423553
				formattedSize: "413.63 KB"
			2: url: "https://sf16-sg-default.akamaized.net/obj/tos-alisg-ve-2774/6dc99eee85614120ab179d7c847f21d1"
				quality: "128kbps"
				extension: "mp3"
*/