const axios = require('axios')
const cheerio = require('cheerio')
const Mime = require('mime-types')

const mediafire = async (url) => {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const hasil = {}
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const nama = seplit[5]
mime = nama.split('.')
const mime = mime[1]
hasil.title = nama 
hasil.size = size
hasil.mime = mime
hasil.link = link
return hasil
}

function mediafire2(url) {
	return new Promise((res, rej) => {
		if (!/https?:\/\//.test(url) && !url.includes('mediafire')) return rej('Invalid url!')
		axios(url).then(async(c) => {
			let $ = cheerio.load(c.data)
			let title = $('div.dl-btn-label').attr('title')
			let size = $('a#downloadButton').text().split('\n')[1].replace(/ /g, '').replace(/\(|\)/g, '').replace('Download', '')
			let link = $('a#downloadButton').attr('href')
			let mimetype = await Mime.lookup(link)
			res({ title, size, mimetype, link })
		}).catch(rej)
	})
}


module.exports = { mediafire, mediafire2 }