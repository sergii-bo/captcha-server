const express = require('express');
const SvgCaptcha = require('svg-captcha');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const svgCaptcha = SvgCaptcha.create({ size: 6, noise: 3, color: true });
  const svgCaptchaMath = SvgCaptcha.createMathExpr({ mathMin: 1, mathMax: 50 });

	res.status(200).set('text/html').send(`
    <h1>Captcha generators</h1>
    <h2>svg captcha</h2>
    <a href="https://github.com/produck/svg-captcha" target="_blank">source</a>
    <p>Text and numbers:</p>
    ${svgCaptcha.data}
    <p>Math:</p>
    ${svgCaptchaMath.data}
  `);
});

app.listen(port, () => console.log(`captcha-api listening on ${port}!`));