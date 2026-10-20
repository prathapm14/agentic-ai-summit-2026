// Renders backgrounds, round photo frames and icons into .cache/img. Photos come from .cache/photos (downloaded from the website).
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const fa = require("react-icons/fa");
const CACHE = path.join(__dirname, ".cache"), OUT = path.join(CACHE, "img");
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const dark = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F1046"/><stop offset=".55" stop-color="#1E1B6E"/><stop offset="1" stop-color="#4C1D95"/></linearGradient>
    <radialGradient id="a" cx=".85" cy=".15" r=".45"><stop offset="0" stop-color="#C026D3" stop-opacity=".45"/><stop offset="1" stop-color="#C026D3" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx=".1" cy=".95" r=".5"><stop offset="0" stop-color="#2563EB" stop-opacity=".5"/><stop offset="1" stop-color="#2563EB" stop-opacity="0"/></radialGradient></defs>
    <rect width="1920" height="1080" fill="url(#g)"/><rect width="1920" height="1080" fill="url(#a)"/><rect width="1920" height="1080" fill="url(#b)"/>
    <g stroke="#8B9CFF" stroke-opacity=".18" stroke-width="2" fill="none"><path d="M1500 0 v120 h160 l60 60 h200"/><path d="M1580 0 v60 h120"/><path d="M0 860 h180 l60 -60 h140"/><path d="M0 940 h260"/></g>
    <g fill="#8B9CFF" fill-opacity=".35"><circle cx="1720" cy="180" r="7"/><circle cx="380" cy="800" r="7"/><circle cx="260" cy="940" r="7"/></g></svg>`;
  await sharp(Buffer.from(dark)).png().toFile(path.join(OUT, "bg-dark.png"));
  const light = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs>
    <radialGradient id="a" cx="1" cy="0" r=".6"><stop offset="0" stop-color="#E9E3FF"/><stop offset="1" stop-color="#FFFFFF"/></radialGradient></defs>
    <rect width="1920" height="1080" fill="url(#a)"/></svg>`;
  await sharp(Buffer.from(light)).png().toFile(path.join(OUT, "bg-light.png"));
  const S = 640, inner = S - 64;
  const ring = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><defs><linearGradient id="r" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2563EB"/><stop offset=".55" stop-color="#7C3AED"/><stop offset="1" stop-color="#C026D3"/></linearGradient></defs>
    <circle cx="${S / 2}" cy="${S / 2}" r="${S / 2 - 2}" fill="url(#r)"/><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2 - 22}" fill="#fff"/></svg>`);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${inner}" height="${inner}"><circle cx="${inner / 2}" cy="${inner / 2}" r="${inner / 2}" fill="#fff"/></svg>`);
  for (const file of fs.readdirSync(path.join(CACHE, "photos"))) {
    const photo = await sharp(path.join(CACHE, "photos", file)).resize(inner, inner, { fit: "cover", position: "attention" }).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    await sharp(ring).composite([{ input: photo, left: 32, top: 32 }]).png().toFile(path.join(OUT, "ph-" + file.replace(/\.\w+$/, ".png")));
  }
  await sharp(ring).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${inner}" height="${inner}"><circle cx="${inner / 2}" cy="${inner / 2}" r="${inner / 2}" fill="#EEEAFE"/></svg>`), left: 32, top: 32 }]).png().toFile(path.join(OUT, "ph-empty.png"));
  const icons = { chat: fa.FaComments, hashtag: fa.FaHashtag, passport: fa.FaPassport, mic: fa.FaMicrophone, bulb: fa.FaLightbulb, rocket: fa.FaRocket, globe: fa.FaGlobe, play: fa.FaPlay };
  for (const [name, Icon] of Object.entries(icons)) for (const [suffix, color] of [["w", "#FFFFFF"], ["v", "#6D28D9"]]) {
    await sharp(Buffer.from(renderToStaticMarkup(React.createElement(Icon, { size: 256, color })))).resize(256, 256).png().toFile(path.join(OUT, `ic-${name}-${suffix}.png`));
  }
  console.log(fs.readdirSync(OUT).length, "images");
})();
