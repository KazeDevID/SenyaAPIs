senya = process.cwd()

var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var fetch = require('node-fetch')
var canvacord = require('canvacord').Canvas
var fs = require('fs')
const {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./lib/youtube");

var creator = ['KazeDevID']; // Nama Creator
var key = 'SenyaAPIs' // Ini Api nya

resposta = { //Kesalahan message pada server
    semkey: {
        status: false,
        creator: `${creator}`,
        kode: 406,
        pesan: 
        'Masukkan apikey di url'
    },
    cdtxt: {
        status: false,
        creator: `${creator}`,
        kode: 406,
        pesan: 
        'sisipkan teks di url'
    },
    cdimg: {
        status: false,
        creator: `${creator}`,
        kode: 406,
        pesan: 
        'Sisipkan gambar di url'
    },
    error: {
       status: false,
        creator: `${creator}`,
        pesan: 
        'ops :/ada kesalahan pada server internal'
    }
}

var keyinvalida = senya + '/src/keyresult.html' // key invalid

async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}
 router.all('/loli', async (req, res) => {
   var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })
  router.get('/canvas/*', async (req, res) => {
  var cdapikey = req.query.apikey;
   let { url, text } = req.query
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
  switch(req.path.replace(/\/canvas/, '').toLowerCase()) {
 case '/trigger':
 case '/trigger/':
  if (!url) return res.status(408).send(resposta.cdimg)
  res.type('gif')
  res.send(await canvacord.trigger(url))
 break
 case '/changemymind':
 case '/changemymind/':
  if (!text) return res.status(408).send(resposta.cdimg)
  res.type('jpg')
  res.send(await canvacord.changemymind(text))
  break
 case '/clyde':
 case '/clyde/':
  if (!text) return res.status(408).send(resposta.cdimg)
  res.type('jpg')
  res.send(await canvacord.clyde(text))
  break
 default: 
 res.status(404).json({
            status:404,
            error: 'Halaman yang anda cari tidak ditemukan',
            endpoint: req.path
        })
 }
  } catch (e) {
  console.error(e) 
   res.type('text/json')
   res.status(400).send(resposta.error)
 }
 })
 router.get('/nsfw/hentai', async (req, res) => {
 var cdapikey = req.query.apikey;
 try {
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 end = getRandom([,"waifu", "neko"])
 let { url } = await getJson(`https://api.waifu.pics/nsfw/${end}`)
 let buffer = await getBuffer(url)
 res.type('png')
 res.send(buffer)
 } catch {
 res.type('text/json')
 res.status(400).send(resposta.error)
 }
 })
 router.get('/download/ytmp3', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 link = req.query.link          
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 if (!link) return res.json({ status : false, creator : `creator`, pesan : "Coloque o link"})
 ytDonlodMp3(link).then((akk) => {
res.json({
status: true,
kode: 200,
creator: `${creator}`,
hasil: akk
})}).catch(e => {
res.sendFile(error)})})

 router.get('/download/ytmp4', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 link = req.query.link          
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 if (!link) return res.json({ status : false, creator : `creator`, pesan : "Coloque o link"})
 ytDonlodMp4(link).then((akk) => {
res.json({
status: true,
kode: 200,
creator: `${creator}`,
hasil: akk
})}).catch(e => {
res.sendFile(error)})})

 router.get('/download/play', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 nome = req.query.nome
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 if (!nome) return res.json({ status : false, creator : `creator`, pesan : "Coloque o nome"})
 ytPlayMp3(nome).then((akk) => {
res.json({
status: true,
kode: 200,
creator: `${creator}`,
hasil: akk
})}).catch(e => {
res.sendFile(error)})})

 router.get('/download/playv', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 nome = req.query.nome
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 if (!nome) return res.json({ status : false, creator : `creator`, pesan : "cantumkan nama"})
 ytPlayMp4(nome).then((akk) => {
res.json({
status: true,
kode: 200,
creator: `${creator}`,
hasil: akk
})}).catch(e => {
res.sendFile(error)})})

 router.all('/shota', async (req, res) => {
 var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/shotas.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })
router.post('/post/body', async (req, res) => {
  res.send(req.body)
})
   router.all('/nsfwloli', async (req, res) => {
   var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/nsfwlolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })
   router.all('*', async (req, res) => {
   res.status(404).json({
            status:404,
            error: 'Halaman yang anda cari tidak ditemukan',
            endpoint: req.path
        })
})
  

module.exports = router
