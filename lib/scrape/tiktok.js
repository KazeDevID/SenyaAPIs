const tiktok_scrape = require('tiktok-scraper')
const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const { musicaldown } = require('./musicaldown')

const headers = {
	"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
	"referer": "https://www.tiktok.com/",
	"cookie": "tt_webid_v2=6976572065375626290; ttwid=1|WphZXEIq_oTph3Rcy7Ybj7o2YmzOAhfdWm23L35UL7Q|1634565622|26309b01156f00c630959974d6ff872e1c6b5d6f6275cbe3aac6738e4f6d50f5; tt_webid=6976572065375626290; tt_csrf_token=KOCPsah2eI6vhK6-F_73Uben; cmpl_token=AgQQAPOgF-RMpbF7dxi_PJ07-rBaZ9U_nbArYPwp_A"
}

async function tiktok3 (Url) {
	return new Promise (async (resolve, reject) => {
		await axios.request({
			url: "https://ttdownloader.com/",
			method: "GET",
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
				"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
			}
		}).then(respon => {
			const $ = cheerio.load(respon.data)
			const token = $('#token').attr('value')
			axios({
				url: "https://ttdownloader.com/req/",
				method: "POST",
				data: new URLSearchParams(Object.entries({url: Url, format: "", token: token})),
				headers: {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
					"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
				}
			}).then(res => {
				const ch = cheerio.load(res.data)
				const result = {
					status: res.status,
					result: {
						video: ch('#results-list > div:nth-child(2)').find('div.download > a').attr('href'),					
						audio: ch('#results-list > div:nth-child(4)').find(' div.download > a').attr('href')
					}
				}
				resolve(result)
			}).catch(reject)
		}).catch(reject)
	})
}

function tiktok(url) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://ttdownloader.com/', {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
            }
        })
            .then(({ data }) => {
                const $ = cheerio.load(data)
                let token = $('#token').attr('value')
                let config = {
                    'url': url,
                    'format': '',
                    'token': token
                }
                axios('https://ttdownloader.com/req/', {
                    method: 'POST',
                    data: new URLSearchParams(Object.entries(config)),
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
                    }
                })
                    .then(({ data }) => {
                        const $ = cheerio.load(data)
                        resolve({
                            nowm: $('div:nth-child(2) > div.download > a').attr('href'),
                            wm: $('div:nth-child(3) > div.download > a').attr('href'),
                            audio: $('div:nth-child(4) > div.download > a').attr('href')
                        })
                    })
            })
            .catch(reject)
    })
}

async function noWM(Url) {
	return new Promise (async (resolve, reject) => {
		await axios.request({
			url: "https://ttdownloader.com/",
			method: "GET",
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
				"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
			}
		}).then(respon => {
			const $ = cheerio.load(respon.data)
			const token = $('#token').attr('value')
			axios({
				url: "https://ttdownloader.com/req/",
				method: "POST",
				data: new URLSearchParams(Object.entries({url: Url, format: "", token: token})),
				headers: {
					"accept": "/",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
					"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
				}
			}).then(res => {
				const ch = cheerio.load(res.data)
				const result = {}
				result.videoUrl = ch('#results-list > div:nth-child(3)').find('div.download > a').attr('href')				
				result.nowatermark = ch('#results-list > div:nth-child(2)').find('div.download > a').attr('href')				
				result.music = ch('#results-list > div:nth-child(4)').find('div.download > a').attr('href')
				resolve(result)
			}).catch(reject)
		}).catch(reject)
	})
}
async function tiktok2(url) { 
var fullUrl = await fetch(url)
const tiktok = await tiktok_scrape.getVideoMeta(fullUrl.url, {headers})
const ingfo = tiktok.collector[0]
const obj = {
	videoInfo: {
		id: ingfo.id,
		desc: ingfo.text,
		like: ingfo.diggCount,
		share: ingfo.shareCount,
		play: ingfo.playCount,
		comment: ingfo.commentCount,
		mentions: ingfo.mentions,
		hashtags: ingfo.hashtags,
	},
	musicMeta: {
		musicId: ingfo.musicMeta.musicId,
		musicName: ingfo.musicMeta.musicName,
		musicAuthor: ingfo.musicMeta.musicAuthor,
		duration: ingfo.musicMeta.duration,
		coverThumb: ingfo.musicMeta.coverThumb,
	},
	authorMeta: {
		id: ingfo.authorMeta.id,
		name: ingfo.authorMeta.name,
		nickName: ingfo.authorMeta.nickName,
		following: ingfo.authorMeta.following,
		heart: ingfo.authorMeta.heart,
		bio: ingfo.authorMeta.signature,
		avatar: ingfo.authorMeta.avatar,
	}
}
return obj
}

module.exports = { tiktok } 
