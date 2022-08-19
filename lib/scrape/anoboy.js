const cheerio = require('cheerio')
const axios = require('axios')

function anoboys(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://anoboy.digital/?s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const format = [];
				const link = [];
				const judul = [];
				const thumb = [];
				const uptime = [];
				$('body > div.wrap > div.container > div.column-content > a > div > div.amvj > h3').each(function(a, b) {
					jud = $(b).text();
					judul.push(jud)
				})
				$('body > div.wrap > div.container > div.column-content > a > div > div.jamup').each(function(c, d) {
					upt = $(d).text();
					uptime.push(upt)
				})
				$('body > div.wrap > div.container > div.column-content > a > div > amp-img').each(function(e, f) {
					thumb.push($(f).attr('src'))
				})
				$('body > div.wrap > div.container > div.column-content > a').each(function(g, h) {
					link.push($(h).attr('href'))
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: judul[i],
						thumb: thumb[i],
						link: link[i]
					})
				}
				const result = {
					status: data.status,
					creator: 'Fajar Ihsana',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
function anoboydl(query) {
	return new Promise((resolve, reject) => {
		axios.get(query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				resolve({
					judul: $('body > div.wrap > div.container > div.pagetitle > h1').text(),
					uptime: $('body > div.wrap > div.container > div.pagetitle > div > div > span > time').text(),
					direct_link: $('#tontonin > source').attr('src'),
					mforu: {
						SD: $('#colomb > p > span:nth-child(1) > a:nth-child(3)').attr('href'),
						HD: $('#colomb > p > span:nth-child(1) > a:nth-child(5)').attr('href')
					},
					zippy: {
						SD: $('#colomb > p > span:nth-child(3) > a:nth-child(3)').attr('href'),
						HD: $('#colomb > p > span:nth-child(3) > a:nth-child(5)').attr('href')
					},
					mirror: {
						SD: $('#colomb > p > span:nth-child(5) > a:nth-child(3)').attr('href'),
						HD: $('#colomb > p > span:nth-child(5) > a:nth-child(5)').attr('href')
					}
				})
			})
			.catch(reject)
	})
}

module.exports = { anoboys, anoboydl };