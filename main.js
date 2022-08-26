
__path = process.cwd()

var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var fetch = require('node-fetch')
var canvacord = require('canvacord').Canvas
var fs = require('fs')
var thiccysapi = require('textmaker-thiccy')
var encode = require('nodejs-base64-encode')
var w5botapi = require('w5-textmaker')
var reverse = require('text-reverse')
var tiktok = require('tiktok-scraper-without-watermark')
let fancy = require('fancy-font-maker')
var turl = require('turl')

const {
  PlayLinkMP3,
  PlayLinkMP4,
  PlayAudio,
  PlayVideo,
  ytSearch
  } = require("./lib/youtube");

const dev = ['KAZE'];

async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
async function robarXd(url) {
he = await fetch(url).then(c => c.json())
 return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}

 router.get("/", (req, res)=> {
	   console.log(__dirname)
})

//[ - ////////// --- Api's Youtube --- ////////// - ]\\

router.get('/youtube/playmp3', async(req, res, next) => {
 q = req.query.q
if (!q) return res.json({ status : 400, creator : `${dev}`, result : "Masukkan parameternya: q"})
PlayAudio(q).then((hasil) => {
 res.json({
 status: 200,
 dev: `${dev}`,
 hasil: hasil
 })}).catch(e => {
res.json({
 msg: `Kesalahan server dari dalam`
 })})})
 
 router.get('/youtube/playmp4', async(req, res, next) => {
q = req.query.q
if (!q) return res.json({ status : false, creator : `creator`, mensagem : "Masukkan parameternya: q"})
PlayVideo(q).then((hasil) => {
 res.json({
 status: true,
 kode: 200,
 creator: `${dev}`,
 hasil: hasil
 })}).catch(e => {
res.json({
 msg: `Kesalahan server dari dalam`
 })})})

 router.get('/youtube/mp3', async(req, res, next) => {
 link = req.query.link
if (!link) return res.json({ status : false, creator : `creator`, mensagem : "Masukkan parameter: LINK"})
PlayLinkMP3(link).then((hasil) => {
 res.json({
 status: true,
 kode: 200,
 creator: `${dev}`,
 hasil: hasil
 })}).catch(e => {
res.json({
 msg: `Kesalahan server dari dalam`
 })})})

 router.get('/youtube/mp4', async(req, res, next) => {
 link = req.query.link
if (!link) return res.json({ status : false, creator : `creator`, mensagem : "Masukkan parameter: LINK"})
PlayLinkMP4(link).then((hasil) => {
 res.json({
 status: true,
 kode: 200,
 dev: `${dev}`,
 hasil: hasil
 })}).catch(e => {
res.json({
 msg: `Kesalahan server dari dalam`
 })})})

 router.get('/youtube/search', async(req, res, next) => {
q = req.query.q
 if (!q) return res.json({ status : false, creator : `creator`, mensagem : "Tempatkan parameter: q"})
 ytSearch(q).then(result => {
res.json({
status: true,
dev: `${dev}`,
hasil: result
})}).catch(e => {
res.json({
msg: `Kesalahan server dari dalam`
})})})

//[ - ///////// --- Api's Text Pro --- ///////// - ]\\

router.get('/textpro/summer-neon', async(req, res, next) => {
  query = req.query.q
  if (!query) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukkan parameternya: q"})
  thiccysapi.textpro("https://textpro.me/create-a-summer-neon-light-text-effect-online-1076.html", query
  ).then(async (linkdaimagem) => { 
  try { 
  res.json({
  status: 400,
  dev: `${dev}`,
  hasil: {
  img: `${linkdaimagem}`,
  }})
  } catch(err) { 
  console.log(err)
  res.json({
  status: 400,
  dev: `${dev}`,
  hasil: {
  error: `${err}`,
  }})}})})

  router.get('/textpro/batman', async(req, res, next) => {
    query = req.query.q
    if (!query) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukkan parameternya: q"})
    thiccysapi.textpro("https://textpro.me/make-a-batman-logo-online-free-1066.html", query
    ).then(async (linkdaimagem) => { 
    try { 
    res.json({
    status: 400,
    dev: `${dev}`,
    hasil: {
    img: `${linkdaimagem}`,
    }})
    } catch(err) { 
    console.log(err)
    res.json({
    status: 400,
    dev: `${dev}`,
    hasil: {
    error: `${err}`,
    }})}})})

    router.get('/textpro/pencil', async(req, res, next) => {
      query = req.query.q
      if (!query) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukkan parameternya: q"})
      thiccysapi.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", query
      ).then(async (linkdaimagem) => { 
      try { 
      res.json({
      status: 400,
      dev: `${dev}`,
      hasil: {
      img: `${linkdaimagem}`,
      }})
      } catch(err) { 
      console.log(err)
      res.json({
      status: 400,
      dev: `${dev}`,
      hasil: {
      error: `${err}`,
      }})}})})

router.get('/textpro/summer', async(req, res, next) => {
  query = req.query.q
  if (!query) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukkan parameternya: q"})
  thiccysapi.textpro("https://textpro.me/create-a-summer-text-effect-with-a-palm-tree-1083.html", query
  ).then(async (linkdaimagem) => { 
  try { 
  res.json({
  status: 400,
  dev: `${dev}`,
  hasil: {
  img: `${linkdaimagem}`,
  }})
  } catch(err) { 
  console.log(err)
  res.json({
  status: 400,
  dev: `${dev}`,
  hasil: {
  error: `${err}`,
  }})}})})

  router.get('/textpro/3d_business', async(req, res, next) => {
    query = req.query.q
    if (!query) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukkan parameternya: q"})
    thiccysapi.textpro("https://textpro.me/3d-business-sign-text-effect-1078.html", query
    ).then(async (linkdaimagem) => { 
    try { 
    res.json({
    status: 200,
    dev: `${dev}`,
    hasil: {
    img: `${linkdaimagem}`,
    }})
    } catch(err) { 
    console.log(err)
    res.json({
    status: 400,
    dev: `${dev}`,
    hasil: {
    error: `${err}`,
    }})}})})
    
    router.get('/textpro/3dgoldenblack', async(req, res, next) => {
    query = req.query.q
    if (!query) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukkan parameternya: q"})
    thiccysapi.textpro("https://textpro.me/free-creative-3d-golden-text-effect-online-1075.html", query
    ).then(async (linkdaimagem) => { 
    try { 
    res.json({
    status: 200,
    dev: `${dev}`,
    hasil: {
    img: `${linkdaimagem}`,
    }})
    } catch(err) { 
    console.log(err)
    res.json({
    status: 400,
    dev: `${dev}`,
    hasil: {
    error: `${err}`,
    }})}})})

    router.get('/textpro/graffiti', async(req, res, next) => {
      text1 = req.query.texto1
      text2 = req.query.texto2
      if (!text1) return res.json({ status : 400, dev : `${dev}`, mensaje : "Tempatkan parameter: text1"})
      if (!text2) return res.json({ status : 400, dev : `${dev}`, mensaje : "Tempatkan parameter: text2"})
      thiccysapi.textpro("https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html",
      [text1], [text2]
      ).then(async (linkdaimagem) => { 
      try { 
      res.json({
      status: 200,
      dev: `${dev}`,
      hasil: {
      img: `${linkdaimagem}`,
      }})
      } catch(err) { 
      console.log(err)
      res.json({
      status: 400,
      dev: `${dev}`,
      hasil: {
      error: `${err}`,
      }})}})})

    router.get('/textpro/pornhub', async(req, res, next) => {
      text1 = req.query.texto1
      text2 = req.query.texto2
      if (!text1) return res.json({ status : 400, dev : `${dev}`, mensaje : "Tempatkan parameter: text1"})
      if (!text2) return res.json({ status : 400, dev : `${dev}`, mensaje : "Tempatkan parameter: text2"})
      thiccysapi.textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html",
      [texto1], [texto2]
      ).then(async (linkdaimagem) => { 
      try { 
      res.json({
      status: 200,
      dev: `${dev}`,
      hasil: {
      img: `${linkdaimagem}`,
      }})
      } catch(err) { 
      console.log(err)
      res.json({
      status: 400,
      dev: `${dev}`,
      hasil: {
      error: `${err}`,
      }})}})})
    
    router.get('/textpro/vintage', async(req, res, next) => {
    text1 = req.query.texto1
    text2 = req.query.texto2
    if (!text1) return res.json({ status : 400, dev : `${dev}`, mensaje : "Tempatkan parameter: text1"})
    if (!text2) return res.json({ status : 400, dev : `${dev}`, mensaje : "Tempatkan parameter: text2"})
    thiccysapi.textpro("https://textpro.me/create-realistic-vintage-style-light-bulb-1000.html",
    [text1], [text2]
    ).then(async (linkdaimagem) => { 
    try { 
    res.json({
    status: 200,
    dev: `${dev}`,
    hasil: {
    img: `${linkdaimagem}`,
    }})
    } catch(err) { 
    console.log(err)
    res.json({
    status: 400,
    dev: `${dev}`,
    hasil: {
    error: `${err}`,
    }})}})})
    
    router.get('/textpro/halloween', async(req, res, next) => {
    text1 = req.query.texto1
    text2 = req.query.texto2
    if (!text1) return res.json({ status : 400, dev : `${dev}`, mensaje : "Tempatkan parameter: text1"})
    if (!text2) return res.json({ status : 400, dev : `${dev}`, mensaje : "Tempatkan parameter: text2"})
    thiccysapi.textpro("https://textpro.me/create-a-spooky-halloween-text-effect-online-1046.html",
    [text1], [text2]
    ).then(async (linkdaimagem) => { 
    try { 
    res.json({
    status: 200,
    dev: `${dev}`,
    hasil: {
    img: `${linkdaimagem}`,
    }})
    } catch(err) { 
    console.log(err)
    res.json({
    status: 400,
    dev: `${dev}`,
    hasil: {
    error: `${err}`,
    }})}})})
    
    router.get('/textpro/thunder', async(req, res, next) => {
    query = req.query.q
    if (!query) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukan parameternya: q"})
    thiccysapi.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", query
    ).then(async (linkdaimagem) => { 
    try { 
    res.json({
    status: 200,
    dev: `${dev}`,
    hasil: {
    img: `${linkdaimagem}`,
    }})
    } catch(err) { 
    console.log(err)
    res.json({
    status: 400,
    dev: `${dev}`,
    hasil: {
    error: `${err}`,
    }})}})})

     //[ - ///////// --- Api's NSFW --- ///////// - ]\\

  router.all('/loli', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'server error :/' })
   }
   })

   

  router.all('/Api/Nsfw/HentaiGif', async (req, res) => {
    try {
    json = JSON.parse(fs.readFileSync('lib/hnt_gifs.json').toString())
    random = json[Math.floor(Math.random() * json.length)]
    res.send({ status: 200, link: random })
    } catch (e) {
    res.send({ status: 400, response: 'Server Error!' })
    }
    })

    router.get('/nsfw/hentai', async (req, res) => {
      try {
      end = getRandom([,"waifu", "neko"])
      let { url } = await getJson(`https://api.waifu.pics/nsfw/${end}`)
      let buffer = await getBuffer(url)
      res.type('png')
      res.send(buffer)
      } catch {
      res.type('text/json')
      res.status(400).send({ status: 400, message: 'Server Error' })
      }
      })
     
      router.all('/shota', async (req, res) => {
        try {
        json = JSON.parse(fs.readFileSync('lib/shotas.json').toString())
        random = json[Math.floor(Math.random() * json.length)]
        res.type('png')
        res.send(await getBuffer(random))
        } catch (e) {
        res.send({ status: 400, response: 'Server Error!' })
        }
        })

        router.all('/nsfw/pussy', async (req, res) => {
          try {
          json = JSON.parse(fs.readFileSync('lib/pussy.json').toString())
          random = json[Math.floor(Math.random() * json.length)]
          res.type('jpg')
          res.send(await getBuffer(random))
          } catch (e) {
          res.send({ status: 400, response: 'Server Error!' })
          }
          })
        router.all('/Nsfw/HentaiGifs', async (req, res) => {
          try {
          json = JSON.parse(fs.readFileSync('lib/hnt_gifs.json').toString())
          random = json[Math.floor(Math.random() * json.length)]
          res.type('gif')
          res.send(await getBuffer(random))
          } catch (e) {
          res.send({ status: 400, response: 'Server Error!' })
          }
          })
        router.all('/Nsfw/Masturbation', async (req, res) => {
          try {
          json = JSON.parse(fs.readFileSync('lib/masturbation.json').toString())
          random = json[Math.floor(Math.random() * json.length)]
          res.type('jpg')
          res.send(await getBuffer(random))
          } catch (e) {
          res.send({ status: 400, response: 'Server Error!' })
          }
          })
        router.all('/Nsfw/yuri', async (req, res) => {
          try {
          json = JSON.parse(fs.readFileSync('lib/yuri.json').toString())
          random = json[Math.floor(Math.random() * json.length)]
          res.type('jpg')
          res.send(await getBuffer(random))
          } catch (e) {
          res.send({ status: 400, response: 'Server Error!' })
          }
          })

          router.all('/nsfwloli', async (req, res) => {
            try {
            json = JSON.parse(fs.readFileSync('lib/nsfwlolis.json').toString())
            random = json[Math.floor(Math.random() * json.length)]
            res.type('png')
            res.send(await getBuffer(random))
            } catch (e) {
            res.send({ status: 400, response: 'Server Error' })
            }
            })
           
   
 //[ - ///////// --- Api's tools --- ///////// - ]\\

 router.all('/test', async (req, res, next) => {
  try {
    emojimix_api = `https://Senya-Api-v3.herokuapp.com/youtube/playmp3?q=https://youtu.be/9VPcNd2Fuak`
    op = await getJson(emojimix_api)
    res.send({ status: 400, result: `${op.hasil.download}` })
  } catch (err) {
    console.error(err)
    res.send({ status: 400, response: 'Server Error!' })
  }
}
)

  router.all('/tools/emojimix', async (req, res, next) => {
    e1 = req.query.emoji1;
    e2 = req.query.emoji2;
    if (!e1) return res.json({ status : 400, dev : `${dev}`, mensaje : "masukkan parameternya: EMOJI1"})
    if (!e2) return res.json({ status : 400, dev : `${dev}`, mensaje : "masukkan parameternya: EMOJI2"})
    try {
      emojimix_api = `https://infinitybot-api.herokuapp.com/api/lzcanvas/emojimix?emoji1=${e1}&emoji2=${e2}&apikey=lz`
      res.type('png')
      res.send(await getBuffer(emojimix_api))
    } catch (err) {
      console.error(err)
    }
  }
  )

  router.all('/tools/encode', async (req, res, next) => {
    texto = req.query.texto;
    if(!texto) return res.json({status : 400, dev : `${dev}`, mensaje : "Masukan parameternya: ?texto="})
    try {
      anu = await encode.encode(`${texto}`, 'base64')
      res.json({ status: 200, dev: `${dev}`, hasil: { encode: `${anu}`}})
    } catch (err) {
      res.send({ status: 400, response: 'Server Error!' })
    }
  }
  )

  router.all('/tools/decode', async (req, res, next) => {
    texto = req.query.texto;
    if(!texto) return res.json({status : 400, dev : `${dev}`, mensaje : "masukkan parameternya: ?texto="})
    try {
      anu = await encode.decode(`${texto}`, 'base64')
      res.json({ status: 200, dev: `${dev}`, hasil: { decode: `${anu}`}})
    } catch (err) {
      res.send({ status: 400, response: 'Server Error!' })
    }
  }
  )

  router.all('/tools/fliptxt', async (req, res, next) => {
    texto = req.query.texto;
    if(!texto) return res.json({status : 400, dev : `${dev}`, mensaje : "masukkan parameternya: ?texto="})
    try {
      newStr = reverse(`${texto}`)
      res.json({ status: 200, dev: `${dev}`, hasil: { reverse: `${newStr}`}})
    } catch (err) {
      res.send({ status: 400, response: 'Server Error!' })
    }
  }
  )

  router.all('/tools/fancytext', async (req, res, next) => {
    texto = req.query.texto;
    if(!texto) return res.json({status : 400, dev : `${dev}`, mensaje : "masukkan parameternyaMasukan parameternya: ?texto="})
    try {
      getfancy = fancy(text)
      var result = getfancy

console.log(result)
      res.json({ status: 200, dev: `${dev}`, hasil: `${result.font01}\n\n${result.font03}\n\n${result.font04}\n\n${result.font05}\n\n${result.font06}\n\n${result.font07}\n\n${result.font08}\n\n${result.font09}\n\n${result.font21}\n\n${result.clean}\n\n${result.circle}\n\n${result.hug}`})
    } catch (err) {
      res.send({ status: 400, response: 'Server Error!' })
    }
  }
  )

  router.get('/tools/tinyurl', async(req, res, next) => {
    url = req.query.url
    if (!url) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukan parameternya: url"})
    // const url = 'https://www.tiktok.com/@youneszarou/video/6942436555692805381'
    turl.shorten(`${url}`)
     .then(result => {
          console.log(result)
          res.json({ status: 200, dev: `${dev}`, hasil:  `${result}`})
     })
     .catch(e => 
      console.log(e),
      res.send({ status: 400, response: 'Server Error!' })
      )
  })

  // Social Media Api`s

  router.get('/download/tiktok-dl-nowm', async(req, res, next) => {
    url = req.query.url
    if (!url) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukan parameternya: url"})
    // const url = 'https://www.tiktok.com/@youneszarou/video/6942436555692805381'
    tiktok.tiktokdownload(`${url}`)
     .then(result => {
          console.log(result)
          res.json({ status: 200, dev: `${dev}`, hasil:  `${result.nowm}`})
     })
     .catch(e => 
      console.log(e),
      res.send({ status: 400, response: 'Server Error!' })
      )
  })

  router.get('/download/tiktok-dl-wm', async(req, res, next) => {
    url = req.query.url
    if (!url) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukan parameternya: url"})
    // const url = 'https://www.tiktok.com/@youneszarou/video/6942436555692805381'
    tiktok.tiktokdownload(`${url}`)
     .then(result => {
          console.log(result)
          res.json({ status: 200, dev: `${dev}`, hasil:  `${result.wm}`})
     })
     .catch(e => 
      console.log(e),
      res.send({ status: 400, response: 'Server Error!' })
      )
  })

  router.get('/download/tiktok-dl-audio', async(req, res, next) => {
    url = req.query.url
    if (!url) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukan parameternya: url"})
    // const url = 'https://www.tiktok.com/@youneszarou/video/6942436555692805381'
    tiktok.tiktokdownload(`${url}`)
     .then(result => {
          console.log(result)
          res.json({ status: 200, dev: `${dev}`, hasil:  `${result.audio}`})
     })
     .catch(e => 
      console.log(e),
      res.send({ status: 400, response: 'Server Error!' })
      )
  })

  router.get('/socialmedia/igdownloader', async(req, res, next) => {
    url = req.query.url
    if (!url) return res.json({ status : 400, dev : `${dev}`, mensaje : "Masukan parameternya: url"})
    // const url = 'https://www.tiktok.com/@youneszarou/video/6942436555692805381'
    w5botapi.instagram(`${url}`)
     .then(data => {
          console.log(data)
          // res.json({ status: 200, dev: `${dev}`, hasil:  `${result.audio}`})
     })
     .catch(e => 
      console.log(e),
      res.send({ status: 400, response: 'Server Error!' })
      )
  })
  

  router.get('/canvas/*', async (req, res) => {
   let { url, texto } = req.query
   try {
  switch(req.path.replace(/\/canvas/, '').toLowerCase()) {
 case '/trigger':
 case '/trigger/':
  if (!url) return res.status(408).send({ status: 408, message: 'Masukkan url di parameter'})
  res.type('gif')
  res.send(await canvacord.trigger(url))
 break
 case '/changemymind':
 case '/changemymind/':
  if (!texto) return res.status(408).send({ status: 408, message: 'masukkan teks ke dalam parameter' })
  res.type('jpg')
  res.send(await canvacord.changemymind(texto))
  break
 case '/clyde':
 case '/clyde/':
  if (!texto) return res.status(408).send({ status: 408, message: 'masukkan teks ke dalam parameter' })
  res.type('jpg')
  res.send(await canvacord.clyde(texto))
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
res.status(400).send({ status: 400, menssagem: 'Server Error!' })
}
})
   
 router.all('/papure', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/backgrounds.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('jpg')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Server Error!' })
   }
   })
   
router.post('/post/body', async (req, res) => {
  res.send(req.body)
})
router.all('*', async (req, res) => {
  res.status(404).json({
           status:404,
           error: 'Halaman yang anda cari tidak ditemukan',
           endpoint: req.path
       })
})

module.exports = router
