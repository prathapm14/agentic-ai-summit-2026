# Rebuilding the summit decks and docs

The host deck, README, schedule, calendar and run of show are generated from the event data on the website.

1. **Export the data** (from the website repo, with the production secrets; never commit the export):
   the export writes `.cache/data.json` (sessions in schedule order, speaker names, titles, bios and photo ids).
2. **Download banners and photos** from the website: `https://innovationtechcommunity.com/banner/<session-id>` into `../banners/`,
   and each speaker's photo into `.cache/photos/<speaker-name>.webp`. Put the poster, ITC logo and ITC Cat images in `.cache/assets/`.
3. **Add or update the speaker intro** in `speakers.js` (one entry per session, in schedule order). Only use facts from the speaker's own profile.
4. Build:
   ```bash
   npm install pptxgenjs@3.12.0 sharp@0.33.5 react-icons@5.3.0 react@18.3.1 react-dom@18.3.1
   node assets.js     # backgrounds, round photo frames, icons
   node host.js       # ../slides/agentic-ai-summit-2026-host-deck.pptx
   node template.js   # ../slides/agentic-ai-summit-2026-speaker-template.pptx
   python3 docs.py    # README, schedule.csv, .ics, run-of-show.md
   ```

`.cache/` and `node_modules/` are git-ignored: they hold downloaded photos and the data export.

## Scheduled mailings

`.github/workflows/send-scheduled-mailings.yml` runs every 10 minutes and asks the website to send any group mailings that are due
(Admin › Events › Group mailing › "Send later"). It needs the repository secret `ITC_CRON_SECRET`, which matches `CRON_SECRET` on the website.
The website sends at most about 90 emails an hour, inside Azure's sending limit. You can also start it by hand from the Actions tab.
