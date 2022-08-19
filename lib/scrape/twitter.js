const cheerio = require("cheerio")
const axios = require("axios")
const qs = require("qs")

function twitter(link){
	return new Promise((resolve, reject) => {
		let config = {
			'URL': link
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		resolve({
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
			})
		})
	.catch(reject)
	})
}


//twitter("https://twitter.com/PassengersMovie/status/821025484150423557").then(console.log)
/*
desc: "Plan your escape aboard the Starship Avalon with #Passeng… 🚀 🚀 🚀 https://t.co/dlNC50FhBu https://t.co/X0go99a4hO"
thumb: "https://pbs.twimg.com/media/C2GF3vxUQAArTD0.jpg"
HD: "https://video.twimg.com/amplify_video/820082508054179840/vid/240x240/b6ImBrQddohap5-6.mp4"
SD: "https://video.twimg.com/amplify_video/820082508054179840/vid/720x720/K8BEWmSeNsrQI_pA.mp4"
audio: "https://twdown.net/mp3.php?v=NHBtLkFwX0lRcnNOZVNtV0VCOEsv…Gl2Ly86c3B0dGg=&t=token%260c05c632a2822a0a877c7e991602543"
*/
module.exports = { twitter }