"""Writes README.md, schedule.csv, the .ics calendar and run-of-show.md from .cache/data.json."""
import json, re, datetime, os
T = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(T)
d = json.load(open(os.path.join(T, ".cache", "data.json")))
IST = datetime.timezone(datetime.timedelta(hours=5, minutes=30))
t = lambda iso: datetime.datetime.fromisoformat(iso.replace("Z", "+00:00"))
fmt = lambda dt: dt.astimezone(IST).strftime("%-I:%M %p")
clean = lambda url: re.sub(r"\?.*$", "", url) if url else None
NAMES = {"PRATHAP REDDY": "Prathap Reddy", "lalit rawat": "Lalit Rawat"}
nice = lambda n: NAMES.get(n, n)
slug = lambda s: re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
SITE = "https://innovationtechcommunity.com"; EVENT = f"{SITE}/events/agentic-ai-summit-2026"; YT = "https://www.youtube.com/watch?v=bTTSVoPeRVc"
start, end = t(d["event"]["starts_at"]), t(d["event"]["ends_at"])
rows = []
for i, s in enumerate(d["sessions"], 1):
    a = t(s["start"]); rows.append(dict(i=i, start=a, end=a + datetime.timedelta(minutes=s["minutes"]), names=[nice(p["name"]) for p in s["speakers"]], s=s,
        banner=f"banners/{i:02d}-{'-and-'.join(slug(p['name']) for p in s['speakers'])}.png"))
kind = lambda s: "Live demo" if s["format"] == "Demo" else "Talk"
sched = "\n".join(f"| {fmt(r['start'])} – {fmt(r['end'])} | {' & '.join(r['names'])} | [{r['s']['title']}]({EVENT}#session-{r['s']['id']}) | {kind(r['s'])} · {r['s']['minutes']} min |" for r in rows)
speakers = []
for r in rows:
    for p in r["s"]["speakers"]:
        role = " · ".join(x for x in [p["headline"], p["jobTitle"] if p["jobTitle"] and p["jobTitle"] not in (p["headline"] or "") else None] if x)
        li = clean(p["linkedin"]); speakers.append(f"| {nice(p['name'])} | {role} | {fmt(r['start'])} | {f'[LinkedIn]({li})' if li else '–'} |")
gallery = "\n".join(f"| ![{' & '.join(r['names'])}]({r['banner']}) | **{' & '.join(r['names'])}**<br>{fmt(r['start'])} IST<br>{r['s']['title']} |" for r in rows)
people = sum(len(r["s"]["speakers"]) for r in rows)

open(os.path.join(R, "README.md"), "w").write(f"""# Agentic AI Summit 2026

<img src="assets/agentic-ai-summit-2026-poster.png" alt="Agentic AI Summit 2026 poster" width="720">

**A free, virtual summit on Agentic AI by [Innovation Tech Community]({SITE}).**
From AI copilots to autonomous agents: expert-led sessions, live demos and real-world use cases across the Microsoft AI ecosystem.

| | |
|---|---|
| 📅 **Date** | Saturday, 24 October 2026 |
| ⏰ **Time** | {fmt(start)} – {fmt(end)} IST (UTC+5:30) |
| 🎤 **Lineup** | {len(rows)} sessions · {people} speakers, all confirmed |
| 💻 **Where** | Virtual · live on YouTube, LinkedIn and Instagram |
| 🎟️ **Register (free)** | {SITE}/register/agentic-ai-summit-2026 |
| 🌐 **Event page** | {EVENT} |
| ▶️ **YouTube live** | {YT} |
| 💼 **LinkedIn live** | _Add the LinkedIn event link here_ |
| 📸 **Instagram live** | _Add the Instagram handle here_ |
| 🎙️ **StreamYard studio** | One guest link for all speakers, valid all day. Shared privately by email. **Never commit studio or guest links here.** |
| 💬 **Speakers' WhatsApp group** | Shared privately with speakers by email |
| 🛂 **Passport stamp** | Registered attendees can claim the Agentic AI Summit 2026 stamp in their ITC Learning Passport |

## Schedule

All times IST. Each slot is **35 minutes: a 30-minute session + 5 minutes of Q&A** (the opening session is 45 minutes).

| Time (IST) | Speaker | Session | Format |
|---|---|---|---|
{sched}

Also available as [`schedule.csv`](schedule.csv) and a calendar file, [`agentic-ai-summit-2026.ics`](agentic-ai-summit-2026.ics).

## Speakers

| Speaker | Role | Slot | Profile |
|---|---|---|---|
{chr(10).join(speakers)}

## Speaker banners

Ready to share on LinkedIn, Instagram and WhatsApp. The website generates them, so the live version is always at `{SITE}/banner/<session-id>`.

| Banner | Session |
|---|---|
{gallery}

## Slides

| File | What it is |
|---|---|
| [`slides/agentic-ai-summit-2026-speaker-template.pptx`](slides/agentic-ai-summit-2026-speaker-template.pptx) | Branded slide template for speakers: title, about me, agenda, section divider, text and picture, code or demo, key takeaways and thank-you layouts |
| [`slides/agentic-ai-summit-2026-host-deck.pptx`](slides/agentic-ai-summit-2026-host-deck.pptx) | Host deck: welcome, housekeeping, about ITC, the day at a glance, agenda, one intro slide per session (with a ~2-minute intro script in the speaker notes) and the closing slide |

To rebuild the decks after a schedule change, see [`tools/README.md`](tools/README.md).

## Run of show

See [`run-of-show.md`](run-of-show.md) for the host checklist and the timing of each slot.

## Registrations

Registrations are managed on the website (Admin › Events & speakers › Agentic AI Summit 2026 › Registrations, with CSV export).
**Attendee details are personal data and are never stored in this repository.**

---

Innovation Tech Community · Learn together. Build together. Grow together. · #AgenticAISummit2026
""")

with open(os.path.join(R, "schedule.csv"), "w") as f:
    q = lambda v: '"' + str(v).replace('"', '""') + '"'
    f.write("start_ist,end_ist,speakers,session,format,minutes,session_url\n")
    for r in rows: f.write(",".join([fmt(r["start"]), fmt(r["end"]), q(" & ".join(r["names"])), q(r["s"]["title"]), kind(r["s"]), str(r["s"]["minutes"]), f"{EVENT}#session-{r['s']['id']}"]) + "\n")

esc = lambda v: v.replace("\\", "\\\\").replace(";", r"\;").replace(",", "\\,").replace("\n", "\\n")
utc = lambda dt: dt.astimezone(datetime.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
stamp = utc(datetime.datetime.now(datetime.timezone.utc))
ev = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Innovation Tech Community//Agentic AI Summit 2026//EN", "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT", "UID:agentic-ai-summit-2026@innovationtechcommunity.com", f"DTSTAMP:{stamp}", f"DTSTART:{utc(start)}", f"DTEND:{utc(end)}", "SUMMARY:Agentic AI Summit 2026",
      f"DESCRIPTION:{esc('Free virtual summit on Agentic AI by Innovation Tech Community. Watch live: ' + YT + ' · Event page: ' + EVENT)}", f"LOCATION:{esc('Online · ' + YT)}", f"URL:{EVENT}", "END:VEVENT"]
for r in rows:
    ev += ["BEGIN:VEVENT", f"UID:session-{r['s']['id']}@innovationtechcommunity.com", f"DTSTAMP:{stamp}", f"DTSTART:{utc(r['start'])}", f"DTEND:{utc(r['end'])}",
           f"SUMMARY:{esc(r['s']['title'] + ' — ' + ' & '.join(r['names']))}", f"DESCRIPTION:{esc('Agentic AI Summit 2026 · ' + EVENT + '#session-' + r['s']['id'])}", f"LOCATION:{esc(YT)}", "END:VEVENT"]
ev.append("END:VCALENDAR")
open(os.path.join(R, "agentic-ai-summit-2026.ics"), "w").write("\r\n".join(ev) + "\r\n")

ros = ["# Run of show · Agentic AI Summit 2026", "", f"Saturday, 24 October 2026 · {fmt(start)} – {fmt(end)} IST. Each 35-minute slot: **30-minute session + 5 minutes of Q&A** from the chat; the host introduces each speaker (about 1–2 minutes) at the start of the slot.", "",
       f"All {people} speakers have confirmed.", "", "## Before the day", "",
       "- [ ] Send every speaker the StreamYard guest link and their slot time **by email** (never post it publicly)", "- [ ] Tech check with each speaker: camera, mic, screen share, slide font size",
       "- [ ] Ask speakers for a recorded backup of any live demo", "- [ ] Schedule the stream in StreamYard for YouTube, LinkedIn and Instagram; paste the LinkedIn and Instagram links into the README",
       f"- [ ] Remind registrants: the summit runs **{fmt(start)} – {fmt(end)} IST** (earlier calendar invites said 10:00 AM – 5:00 PM)", "- [ ] Load the host deck and check every speaker's name pronunciation", "",
       "## On the day", "", "- [ ] 8:30 AM: host and the first two sessions' speakers join the StreamYard backstage", "- [ ] 8:55 AM: go live with the countdown / poster", "",
       "| Time (IST) | Who | Host notes |", "|---|---|---|", f"| {fmt(start)} | Host | Welcome, housekeeping, about ITC, agenda (host deck slides 1–5, ~4 min from the first slot) |"]
ros += [f"| {fmt(r['start'])} – {fmt(r['end'])} | {' & '.join(r['names'])} | Intro slide {r['i'] + 5} · \"{r['s']['title']}\" |" for r in rows]
ros += [f"| {fmt(end)} | Host | Close: thank speakers and volunteers, passport stamp, YouTube recordings, Agent Universe 2026 (14 Nov) |", "",
        "## Notes", "", "- Frank Falvey joins from Cork, Ireland: his 3:35 PM IST slot is **11:05 AM** in Ireland.", "- Speaker intro scripts are in the speaker notes of the host deck (about 2 minutes each)."]
open(os.path.join(R, "run-of-show.md"), "w").write("\n".join(ros) + "\n")
print(f"docs: {len(rows)} sessions, {people} speakers, {fmt(start)}–{fmt(end)}")
