const axios = require('axios')
const cheerio = require('cheerio')

const base_url = 'https://doujindesu.xxx/'

function DDlatest() {
	return new Promise((resolve, reject) => {
		axios.get(base_url).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.animposx').each(function(i, e) {
				let title = $(e).find('a').attr('alt')
				let chapter = $(e).find('div.plyepisode').find('a').text().trim()
				let type = $(e).find('div.type').text()
				let score = $(e).find('div.score').text().trim()
				let thumb = $(e).find('img').attr('src')
				let link = $(e).find('div.plyepisode').find('a').attr('href')
				result.push({ title, chapter, type, score, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function DDdownload(url) {
	return new Promise((resolve, reject) => {
		if (!/https?:\/\//.test(url)) return reject('Invalid url!')
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('div.lm').find('h1').text()
			let link = $('div.chright').find('a').attr('href')
			let image = []
			$('div.reader-area > img').each(function(i, e) {
				image.push($(e).attr('src'))
			})
			resolve({ title, link, image })
		}).catch(reject)
	})
}

function DDsearch(query) {
	return new Promise((resolve, reject) => {
		axios.get(`${base_url}?s=${query}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.animposx').each(function(i, e) {
				let title = $(e).find('div.title').text().trim()
				let score = $(e).find('div.score').text().trim()
				let type = $(e).find('div.type').text().replace(/Publishing|Finished/i, '')
				let status = $(e).find('div.type').text().replace(/Manhwa|Manga|Doujinshi/i, '')
				let thumb = $(e).find('img').attr('src')
				let link = $(e).find('a').attr('href')
				result.push({ title, score, type, status, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

/*
 DDlatest().then(console.log)
	 result : title: "A Wonderful New World"
							chapter: "Ch. 127"
							type: "Manhwa"
							score: "8.8"
							thumb: "https://doujindesu.xxx/wp-content/uploads/2020/09/1282.jpg"
							link: "https://doujindesu.xxx/2021/12/17/a-wonderful-new-world-chapter-127/" 
 DDdownload(`https://doujindesu.id/2021/11/26/15-fun-no-zangyou/`).then(console.log)
	result : title: "15-fun no Zangyou"
				link: "https://www.mirrored.to/files/1FZJHRPN/[Doudesu]_15-fun_no_Zangyou.pdf_links"
				image: Array 
 DDsearch(`Secret class`).then(console.log)
	result : title: "Secret Campus"
							score: "8.6"
							type: "Manhwa"
							status: "Finished"
							thumb: "https://doujindesu.xxx/wp-content/uploads/2021/12/2975.jpg"
							link: "https://doujindesu.xxx/manga/secret-campus/"  
*/
module.exports = { DDlatest, DDdownload, DDsearch }