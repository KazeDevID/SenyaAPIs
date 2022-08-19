const cheerio = require('cheerio')
const axios = require('axios')


function drakor(query) {
	return new Promise((resolve, reject) => {
		queryy = query.replace(/ /g, '+')
		axios.get('https://drakorasia.net/?s=' + queryy + '&post_type=post')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = [];
				const link = [];
				const judul = [];
				const thumb = [];
				$('#post > div > div.thumbnail > a').each(function(a, b) {
					link.push($(b).attr('href'))
					thumb.push($(b).find('img').attr('src'))
				})
				$('#post > div > div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > a > h2').each(function(c, d) {
					titel = $(d).text();
					judul.push(titel)
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						judul: judul[i],
						thumb: thumb[i],
						link: link[i]
					})
				}
				resolve(result)
			})
			.catch(reject)
	})
}
module.exports = drakor