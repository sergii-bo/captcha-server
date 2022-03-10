const express = require('express')
const fs = require('fs')
const SvgCaptcha = require('svg-captcha')
const TrekCaptcha = require('trek-captcha')

const prot = process.env.PORT || 'http'
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const hostaddr = `${prot}://${host}:${port}`

const app = express()
app.use(express.static('assets'));

app.get('/', (req, res) => {
	res.status(200).set('text/html').send(`
    <h1>Captcha generators</h1>
    <a href="${hostaddr}/svg-captcha">svg captcha</a>
    <br />
    <a href="${hostaddr}/trek-captcha">trek captcha</a>
  `)
})

app.get('/svg-captcha', (req, res) => {
  const svgCaptcha = SvgCaptcha.create({ size: 6, noise: 3, color: true })
  const svgCaptchaMath = SvgCaptcha.createMathExpr({ mathMin: 1, mathMax: 50, noise: 3 })

  console.log('svg captcha text', svgCaptcha.text)
  console.log('svg captcha math text', svgCaptchaMath.text)

	res.status(200).set('text/html').send(`
    <a href="${hostaddr}">HOME</>
    <h2>svg captcha</h2>
    <a href="https://github.com/produck/svg-captcha" target="_blank">source</a>
    <p>Text and numbers:</p>
    ${svgCaptcha.data}
    <p>Math:</p>
    ${svgCaptchaMath.data}
  `)
})

app.get('/trek-captcha', async (req, res) => {
  const { token, buffer } = await TrekCaptcha()
  const captchaImgName = 'trek-captcha-img.gif'
  fs.createWriteStream(`assets/${captchaImgName}`)
    .on('finish', () => {
      console.log('trek captcha text', token)
    })
    .end(buffer)

	res.status(200).set('text/html').send(`
    <a href="${hostaddr}">HOME</>
    <h2>trek captcha</h2>
    <a href="https://github.com/trekjs/captcha" target="_blank">source</a>
    <p>Text:</p>
    <img src="${hostaddr}/${captchaImgName}"/>
  `)
})

app.listen(port, () => console.log(`captcha-api listening on ${port}!`))