const axios = require('axios');
const cheerio = require('cheerio');

const baseURL = 'https://www.mynimeku.com/'

function nimeLatestAnime() {
    return new Promise((resolve, reject) => {
        axios.get(baseURL).then(({ data }) => {
            let $ = cheerio.load(data)
            let result = []
            $('div.flexbox-item > a').each(function(i, e) {
                let title = $(e).attr('title')
                let link = $(e).attr('href')
                let status = $(e).find('div.flexbox-status').text()
                let thumb = $(e).find('div.flexbox-thumb > img').attr('data-src')
                let episode = $(e).find('div.flexbox-episode > span.eps').text().split(' ')[1]
                let type = $(e).find('div.flexbox-type').text()
                result.push({ title, status, episode, type, thumb, link })
            })
            resolve(result)
        }).catch(reject)
    })
}

function nimeLatestKomik() {
    return new Promise((resolve, reject) => {
        axios.get(baseURL).then(({ data }) => {
            let $ = cheerio.load(data)
            let result = []
            $('div.flexbox4-item').each(function(i, e) {
                let title = $(e).find('a').attr('title')
                let link = $(e).find('a').attr('href')
                let thumb = $(e).find('div.flexbox4-thumb > img').attr('data-src')
                let type = $(e).find('div.flexbox4-type').text()
                let status = $(e).find('div.flexbox-status').text()
                let chapter = $(e).find('ul.chapter > li').text().split(' ')[1]
                result.push({ title, status, chapter, type, thumb, link })
            })
            resolve(result)
        }).catch(reject)
    })
}

function nimeSearch(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://www.mynimeku.com/?s='+query).then(res => {
            const $ = cheerio.load(res.data)
            const result = []
            const hasil = []
            $('body > main > div > div > div.flexbox2 > div > div').each( function(a, b) {
                const url = $(b).find('a').attr('href')
                const thumb = $(b).find('a > div > img').attr('src')
                const title = $(b).find('a > div > img').attr('alt')
                result.push({ url, thumb, title })
                result.forEach(v => {
                    if(!/anime/.test(v.url)) return
                    hasil.push(v)
                })
            })
            resolve(hasil)
        }).catch(reject)
    })
}
function nimeDetail(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            const $ = cheerio.load(res.data)
            const _eps = []
            $('#episode_list > ul > li').each( function(a, b) {
                const link = $(b).find('div > div.flexeps-infoz > a').attr('href')
                const title = $(b).find('div > div.flexeps-infoz > a').attr('title')
                _eps.push({ link, title })
            })
            const result = {
                thumb: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-thumb > img').attr('src'),
                title: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-titlex > h2').text(),
                title_japanese: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-titlex > span').text(),
                rating: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-infoz.score > span').text(),
                musim: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(3) > span > a').text(),
                studio: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(4) > span > a').text(),
                episode: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(5) > span').text(),
                aired: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(6) > span').text(),
                genre: $('body > main > div > div > div.container > div.series-flex > div.series-flexright > div.series-genres').text(),
                synopsis: $('body > main > div > div > div.container > div.series-flex > div.series-flexright > div.series-synops > p').text(),
                episode_list: _eps
            }
            resolve(result)
        }).catch(reject)
    })
}
function nimeDownload(url) { 
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            const $ = cheerio.load(res.data)
            const dl_link = {
                low: {
                    uptobox: $('#linklist > p:nth-child(10) > a:nth-child(1)').attr('href'),
                    mega: $('#linklist > p:nth-child(10) > a:nth-child(2)').attr('href'),
                    zippyshare: $('#linklist > p:nth-child(10) > a:nth-child(3)').attr('href'),
                },
                medium: {
                    uptobox: $('#linklist > p:nth-child(13) > a:nth-child(1)').attr('href'),
                    mega: $('#linklist > p:nth-child(13) > a:nth-child(2)').attr('href'),
                    zippyshare: $('#linklist > p:nth-child(13) > a:nth-child(3)').attr('href'),
                },
                high: {
                    uptobox: $('#linklist > p:nth-child(16) > a:nth-child(1)').attr('href'),
                    mega: $('#linklist > p:nth-child(16) > a:nth-child(2)').attr('href'),
                    zippyshare: $('#linklist > p:nth-child(16) > a:nth-child(3)').attr('href')
                }
            }
            resolve(dl_link)
        }).catch(reject)
    })
}
function downloadNimek(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('title').text()
			let thumb = $('meta[property="og:image"]').attr('content')
			let url = $('#linklist').find('a').attr('href')
			resolve({ title, thumb, url })
		}).catch(reject)
	})
}

function downloadKomik(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('title').text()
			let result = []
			$('div.reader-area > p > img').get().map(v => result.push($(v).attr('src')))
			resolve({ title, result })
		}).catch(reject)
	})
}

module.exports = { nimeLatestAnime, nimeLatestKomik, nimeSearch, nimeDetail, nimeDownload, downloadNimek, downloadKomik }
