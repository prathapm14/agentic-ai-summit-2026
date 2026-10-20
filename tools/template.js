// Builds slides/agentic-ai-summit-2026-speaker-template.pptx: branded layouts with placeholders that speakers fill in.
const pptxgen = require("pptxgenjs");
const path = require("path");
const { THEME, applyTheme } = require("./theme");
const CACHE = path.join(__dirname, ".cache");
const IMG = (f) => path.join(CACHE, "img", f), A = (f) => path.join(CACHE, "assets", f);

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "Agentic AI Summit 2026 · Speaker template"; pres.author = "Innovation Tech Community"; pres.company = "Innovation Tech Community";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;
  const kicker = { text: { text: "AGENTIC AI SUMMIT 2026  ·  24 OCTOBER 2026", options: { x: 0.7, y: 1.2, w: 7, h: 0.4, fontSize: 14, bold: true, color: C.background2, charSpacing: 5, margin: 0 } } };
  const logoDark = { image: { path: A("itc-logo.png"), x: 0.7, y: 0.45, w: 0.6, h: 0.6 } };
  const footer = [
    { text: { text: "Agentic AI Summit 2026  ·  #AgenticAISummit2026", options: { x: 0.6, y: 6.95, w: 7, h: 0.35, fontSize: 10, color: C.accent5, margin: 0 } } },
    { image: { path: A("itc-logo.png"), x: 12.25, y: 6.82, w: 0.48, h: 0.48 } },
  ];
  const num = { x: 11.55, y: 6.95, w: 0.5, h: 0.35, fontSize: 10, color: C.accent5 };
  const title = () => ({ placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.45, w: 11.4, h: 0.85, fontSize: 32, bold: true, color: C.text2, align: "left", valign: "middle", margin: 0 }, text: "Slide title" } });

  pres.defineSlideMaster({ title: "Session title", background: { path: IMG("bg-dark.png") }, objects: [logoDark, kicker,
    { image: { path: A("poster.png"), x: 8.3, y: 2.35, w: 4.4, h: 2.475 } },
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 1.9, w: 7.2, h: 2.4, fontSize: 40, bold: true, color: C.background1, align: "left", valign: "bottom", margin: 0 }, text: "Your session title" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.7, y: 4.55, w: 7.2, h: 1.4, fontSize: 20, color: C.background2, align: "left", valign: "top", margin: 0 }, text: "Your name · Your role, Company" } }] });
  pres.defineSlideMaster({ title: "Section divider", background: { path: IMG("bg-dark.png") }, objects: [logoDark,
    { placeholder: { options: { name: "number", type: "body", x: 0.7, y: 1.8, w: 4, h: 1.4, fontSize: 72, bold: true, color: C.background2, align: "left", valign: "bottom", margin: 0 }, text: "01" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 3.3, w: 11, h: 1.6, fontSize: 44, bold: true, color: C.background1, align: "left", valign: "top", margin: 0 }, text: "Section title" } }] });
  pres.defineSlideMaster({ title: "Title and content", background: { path: IMG("bg-light.png") }, slideNumber: num, objects: [...footer, title(),
    { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 1.6, w: 12.1, h: 5.0, fontSize: 20, color: C.text1, align: "left", valign: "top", margin: 0 }, text: "Add your points here" } }] });
  pres.defineSlideMaster({ title: "Text and picture", background: { path: IMG("bg-light.png") }, slideNumber: num, objects: [...footer, title(),
    { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 1.6, w: 5.9, h: 5.0, fontSize: 18, color: C.text1, align: "left", valign: "top", margin: 0 }, text: "Explain the idea" } },
    { rect: { x: 6.9, y: 1.6, w: 5.8, h: 5.0, fill: { color: "F4F2FF" } } },
    { placeholder: { options: { name: "picture", type: "pic", x: 6.9, y: 1.6, w: 5.8, h: 5.0, color: C.text1 }, text: "Insert a screenshot or diagram" } }] });
  pres.defineSlideMaster({ title: "Title only", background: { path: IMG("bg-light.png") }, slideNumber: num, objects: [...footer, title()] });
  pres.defineSlideMaster({ title: "Code or demo", background: { path: IMG("bg-light.png") }, slideNumber: num, objects: [...footer, title(),
    { rect: { x: 0.6, y: 1.6, w: 12.1, h: 5.05, fill: { color: "14154A" } } },
    { placeholder: { options: { name: "code", type: "body", x: 0.9, y: 1.85, w: 11.5, h: 4.55, fontSize: 16, fontFace: "Courier New", color: C.background2, align: "left", valign: "top", margin: 0 }, text: "// Paste your code here" } }] });
  pres.defineSlideMaster({ title: "About the speaker", background: { path: IMG("bg-light.png") }, slideNumber: num, objects: [...footer, title(),
    { image: { path: IMG("ph-empty.png"), x: 0.6, y: 1.7, w: 4.0, h: 4.0 } },
    { placeholder: { options: { name: "photo", type: "pic", x: 0.95, y: 2.05, w: 3.3, h: 3.3, color: C.text1 }, text: "Your photo" } },
    { placeholder: { options: { name: "body", type: "body", x: 5.2, y: 1.7, w: 7.5, h: 4.9, fontSize: 18, color: C.text1, align: "left", valign: "top", margin: 0 }, text: "A few lines about you" } }] });
  pres.defineSlideMaster({ title: "Thank you", background: { path: IMG("bg-dark.png") }, objects: [logoDark,
    { image: { path: A("cat-wave.png"), x: 8.7, y: 1.6, w: 3.8, h: 3.8 } },
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 1.9, w: 7.6, h: 1.6, fontSize: 54, bold: true, color: C.background1, align: "left", valign: "bottom", margin: 0 }, text: "Thank you!" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.7, y: 3.75, w: 7.6, h: 2.2, fontSize: 20, color: C.background2, align: "left", valign: "top", margin: 0 }, text: "Questions? Let's connect." } }] });

  const bullets = (items) => items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } }));
  pres.addSection({ title: "Start" });
  let s = pres.addSlide({ masterName: "Session title", sectionTitle: "Start" });
  s.addText("Your session title", { placeholder: "title" });
  s.addText([{ text: "Your name", options: { bold: true, breakLine: true } }, { text: "Your role · Company" }], { placeholder: "body" });
  s.addNotes("Speaker template for Agentic AI Summit 2026. Replace the title and your name. Keep this slide on screen while the host introduces you. Slides are 16:9; use fonts of 18pt or more, as many people watch on phones.");
  s = pres.addSlide({ masterName: "About the speaker", sectionTitle: "Start" });
  s.addText("About me", { placeholder: "title" });
  s.addText(bullets(["What you do and where you work", "What you love building or teaching", "Where people can find you (LinkedIn, blog, GitHub)"]), { placeholder: "body", paraSpaceAfter: 10 });
  s.addNotes("Optional: the host already introduces you, so keep this to 30 seconds. To add your photo, click the photo placeholder icon.");
  s = pres.addSlide({ masterName: "Title only", sectionTitle: "Start" });
  s.addText("What we'll cover", { placeholder: "title" });
  ["The problem we're solving", "How it works: architecture and key ideas", "Live demo", "Lessons learned and what to try next"].forEach((t, i) => {
    const y = 1.75 + i * 1.2;
    s.addShape(pres.shapes.OVAL, { x: 0.6, y, w: 0.8, h: 0.8, fill: { color: [C.accent1, C.accent2, C.accent3, C.accent4][i] }, line: { type: "none" }, objectName: `Step ${i + 1} circle` });
    s.addText(String(i + 1), { x: 0.6, y, w: 0.8, h: 0.8, fontSize: 22, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(t, { x: 1.7, y, w: 10.5, h: 0.8, fontSize: 22, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
  });
  pres.addSection({ title: "Content" });
  s = pres.addSlide({ masterName: "Section divider", sectionTitle: "Content" });
  s.addText("01", { placeholder: "number" });
  s.addText("Section title", { placeholder: "title" });
  s = pres.addSlide({ masterName: "Text and picture", sectionTitle: "Content" });
  s.addText("Explain an idea with a picture", { placeholder: "title" });
  s.addText(bullets(["One idea per slide", "Show, don't tell: screenshots and diagrams beat long text", "Keep text short so viewers can listen to you"]), { placeholder: "body", paraSpaceAfter: 10 });
  s = pres.addSlide({ masterName: "Code or demo", sectionTitle: "Content" });
  s.addText("Code or demo", { placeholder: "title" });
  s.addText([{ text: "// Large fonts help viewers on phones", options: { breakLine: true } }, { text: "const agent = await client.agents.create({", options: { breakLine: true } },
    { text: "  name: \"summit-demo\",", options: { breakLine: true } }, { text: "  instructions: \"Help attendees find sessions\",", options: { breakLine: true } }, { text: "});" }], { placeholder: "code" });
  s.addNotes("Tip: zoom your editor to 150% or more during live demos, and keep a recorded backup of the demo in case the network misbehaves.");
  s = pres.addSlide({ masterName: "Title only", sectionTitle: "Content" });
  s.addText("Key takeaways", { placeholder: "title" });
  [["bulb", "Remember", "The one thing you want people to remember"], ["rocket", "Try it", "A practical step they can try this week"], ["globe", "Learn more", "Links, repos and docs to go further"]].forEach(([icon, head, copy], i) => {
    const x = 0.6 + i * 4.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.75, w: 3.85, h: 4.6, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Takeaway ${i + 1}` });
    s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: 2.1, w: 1.0, h: 1.0, fill: { color: [C.accent1, C.accent2, C.accent3][i] }, line: { type: "none" }, objectName: `Takeaway icon circle ${i + 1}` });
    s.addImage({ path: IMG(`ic-${icon}-w.png`), x: x + 0.6, y: 2.35, w: 0.5, h: 0.5, objectName: `Takeaway icon ${i + 1}` });
    s.addText(head, { x: x + 0.35, y: 3.4, w: 3.2, h: 0.6, fontSize: 24, bold: true, color: C.text2, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText(copy, { x: x + 0.35, y: 4.1, w: 3.2, h: 2.0, fontSize: 18, color: C.text1, valign: "top", margin: 0, isTextBox: true });
  });
  pres.addSection({ title: "End" });
  s = pres.addSlide({ masterName: "Thank you", sectionTitle: "End" });
  s.addText("Thank you!", { placeholder: "title" });
  s.addText([{ text: "Questions? Let's connect.", options: { bold: true, breakLine: true } }, { text: "linkedin.com/in/your-profile", options: { breakLine: true } }, { text: "#AgenticAISummit2026" }], { placeholder: "body" });
  s.addNotes("Leave a few minutes for questions from the chat. The host will read them out.");
  const out = path.join(__dirname, "..", "slides", "agentic-ai-summit-2026-speaker-template.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out);
  console.log("wrote", path.relative(path.join(__dirname, ".."), out));
})();
