const cheerio = require('cheerio')
const axios = require('axios')
const _math = require('mathjs')

function goreSearch(query) {
	return new Promise(async (resolve, reject) => {
		axios.get('https://seegore.com/?s=' + query).then(dataa => {
			const $$$ = cheerio.load(dataa)
			pagina = $$$('#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a').text();
			rand = Math.floor(Math.random() * pagina) + 1
			if (rand === 1) {
				slink = 'https://seegore.com/?s=' + query
			} else {
				slink = `https://seegore.com/page/${rand}/?s=${query}`
			}
			axios.get(slink)
				.then(({
					data
				}) => {
					const $ = cheerio.load(data)
					const link = [];
					const judul = [];
					const uploader = [];
					const format = [];
					const thumb = [];
					$('#post-items > li > article > div.content > header > h2 > a').each(function(a, b) {
						link.push($(b).attr('href'))
					})
					$('#post-items > li > article > div.content > header > h2 > a').each(function(c, d) {
						jud = $(d).text();
						judul.push(jud)
					})
					$('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function(e, f) {
						upl = $(f).text();
						uploader.push(upl)
					})
					$('#post-items > li > article > div.post-thumbnail > a > div > img').each(function(g, h) {
						thumb.push($(h).attr('src'))
					})
					for (let i = 0; i < link.length; i++) {
						format.push({
							judul: judul[i],
							uploader: uploader[i],
							thumb: thumb[i],
							link: link[i]
						})
					}
					const result = {
						creator: 'Fajar Ihsana',
						data: format
					}
					resolve(result)
				})
				.catch(reject)
		})
	})
}
function goreRandom() {
	return new Promise(async (resolve, reject) => {
		rand = Math.floor(Math.random() * 218) + 1
		randvid = Math.floor(Math.random() * 16) + 1
		if (rand === 1) {
			slink = 'https://seegore.com/gore/'
		} else {
			slink = `https://seegore.com/gore/page/${rand}/`
		}
		axios.get(slink)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				const result = [];
				const username = [];
				const linkp = $(`#post-items > li:nth-child(${randvid}) > article > div.post-thumbnail > a`).attr('href')
				const thumbb = $(`#post-items > li:nth-child(${randvid}) > article > div.post-thumbnail > a > div > img`).attr('src')
				axios.get(linkp)
					.then(({
						data
					}) => {
						const $$ = cheerio.load(data)
						const format = {
							judul: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
							views: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
							comment: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text() == '' ? 'Tidak ada komentar' : $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
							thumb: thumbb,
							link: $$('video > source').attr('src')
						}
						const result = {
							creator: 'Fajar Ihsana',
							data: format
						}
						resolve(result)
					})
					.catch(reject)
			})
	})
}
function goreDl(link) {
	return new Promise(async (resolve, reject) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $$ = cheerio.load(data)
				const format = {
					judul: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
					views: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
					comment: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
					link: $$('video > source').attr('src')
				}
				const result = {
					creator: 'Fajar Ihsana',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
module.exports = { goreSearch, goreRandom, goreDl };