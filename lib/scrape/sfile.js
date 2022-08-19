const cheerio = require('cheerio')
const axios = require('axios')
const _math = require('mathjs')
const _url = require('url')
const request = require('request');

function sfilesearch(query){
	return new Promise((resolve, reject) => {
		axios.get('https://sfile.mobi/search.php?q=' + query + '&search=Search')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = [];
				const link = [];
				const neme = [];
				const size = [];
				$('div.w3-card.white > div.list > a').each(function(a, b) {
					link.push($(b).attr('href'))
				})
				$('div.w3-card.white > div.list > a').each(function(c, d) {
					name = $(d).text();
					neme.push(name)
				})
				$('div.w3-card.white > div.list').each(function(e, f) {
					siz = $(f).text();
					//sz = siz.
					size.push(siz.split('(')[1])
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						nama: neme[i],
						size: size[i].split(')')[0],
						link: link[i]
					})
				}
				resolve(result)
			})
			.catch(reject)
	})
}
function sfiledown(link) {
	return new Promise((resolve, reject) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const nama = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(2) > b').text();
				const size = $('#download').text().split('Download File')
				const desc = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(7) > center > h1').text();
				const type = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(4) > a:nth-child(3)').text();
				const upload = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(5)').text();
				const uploader = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(4) > a:nth-child(2)').text();
				const download = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(6)').text();
				const link = $('#download').attr('href')
				other = link.split('/')[7].split('&is')[0]
				const format = {
					judul: nama + other.substr(other.length - 6).split('.')[1],
					size: size[1].split('(')[1].split(')')[0],
					type: type,
					mime: other.substr(other.length - 6).split('.')[1],
					desc: desc,
					uploader: uploader,
					uploaded: upload.split('\n - Uploaded: ')[1],
					download_count: download.split(' - Downloads: ')[1],
					link: link
				}
				const result = {
					creator: 'Hanya Orang Biasa',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
/* 
sfiledown("https://sfile.mobi/7psnbyWgIEv").then(console.log)
 result : creator: "Hanya Orang Biasa"
			data: judul: "AeroInsta V16.0.2 UNClone DEFAULT Hazarapk"
					size: "46.83 MB"
					type: "APK"
					mime: "apk"
					desc: "Wa mod"
					uploader: "Doller Brajamusti"
					uploaded: "13 Dec 2021"
					download_count: "0"
					link: "https://sfile.mobi/download/971790/451994/1e9bc8b4472b226…ne-default-hazar.apk&is=e9a720c429aa4fc2c4f47f9d59102708"
sfilesearch("wa mod").then(console.log)
 (array) result : nama: "AeroInsta V16.0.2 UNClone DEFAULT Hazar.apk"
						size: "46.83 MB"
						link: "https://sfile.mobi/7psnbyWgIEv"
*/

module.exports = { sfilesearch, sfiledown }