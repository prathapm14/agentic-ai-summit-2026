// Deck theme (from the summit poster) and a helper that writes it into a .pptx, since pptxgenjs cannot set theme colours.
const fs = require("fs");
const JSZip = require("jszip");
const THEME = { name: "Agentic AI Summit 2026", headFontFace: "Arial", bodyFontFace: "Calibri",
  colors: { dk1: "14154A", lt1: "FFFFFF", dk2: "1E2A78", lt2: "F4F2FF", accent1: "2563EB", accent2: "7C3AED", accent3: "C026D3", accent4: "0EA5E9", accent5: "5B6385", accent6: "F59E0B", hlink: "2563EB", folHlink: "7C3AED" } };
const SLOTS = ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];

async function applyTheme(file, theme = THEME) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const part = "ppt/theme/theme1.xml";
  const xml = await zip.file(part).async("string");
  const scheme = `<a:clrScheme name="${theme.name}">` + SLOTS.map((k) => `<a:${k}><a:srgbClr val="${theme.colors[k]}"/></a:${k}>`).join("") + "</a:clrScheme>";
  const out = xml.replace(/<a:clrScheme\b[\s\S]*?<\/a:clrScheme>/, () => scheme);
  if (out === xml) throw new Error("No colour scheme found in the theme");
  zip.file(part, out);
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}
module.exports = { THEME, applyTheme };
