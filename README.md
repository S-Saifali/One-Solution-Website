# One Solution — website

Static site (plain HTML/CSS/JS, no build step). Upload the whole folder to any host and it works.

```
index.html          all sections
css/styles.css      all styling (design tokens at the top)
js/main.js          mobile menu + service tabs + booking form -> WhatsApp
assets/logo.jpg     the real ONE mark — header, footer, favicon, og:image
assets/team/*.jpg   the five service graphics, cropped by CSS to the technician
.claude/launch.json local preview config (not needed on the server)
```

## Run locally

Double-click `index.html`, or:

```bash
npx -y serve -l 4173 .
```

## What the booking form does

There is no backend. On submit it validates the phone number, builds a pre-filled
WhatsApp message (service, city, area, preferred time, phone, problem) and opens
`wa.me/923218111108`. Change the number in one place: `WHATSAPP_NUMBER` at the top of
`js/main.js` — and in the `href`s in `index.html` if the number ever changes.

## Service content

`#services` is the wide grid — 12 services, one line each, all in the HTML for SEO.

`#included` is the tabbed explorer. Each tab holds the sub-service list from the matching
social graphic (Painting, Carpentry, Tile work, Fridge repair, Water heater) plus its own
pre-filled WhatsApp button. All five panels are in the HTML — tabs only toggle `hidden`,
so search engines read every service. Tabs are keyboard-driven (arrows / Home / End) with
proper `role="tablist"` wiring. To add a sixth: copy a `.etab` button and its `.epanel`,
and match the `id` / `aria-controls` / `aria-labelledby` pair.

## Technician photos

`assets/team/` holds the five square social graphics unmodified. The headline, bullets and
CALL NOW bar are cropped out **in CSS**, not in an image editor — each photo element carries
its own `background-size` (zoom) and `background-position` (focal point) inline:

- large crops in the service panels: `background-size:320%`
- round face crops in the crew band: `background-size:400%` (geyser `460%`)

To re-frame one, nudge that element's `background-position` percentages: a **higher** first
number moves the view right, a **higher** second number moves it down. Replacing a photo with
a proper portrait means swapping the file and resetting size to `cover` with no position.

## Content taken from the Facebook page

Phone 0321 8111108 · WhatsApp +92 321 8111108 · info@onesolution.com.pk ·
Karachi, Lahore, Islamabad, Rawalpindi · 8K followers · 8+ years ·
FoamJet AC servicing · no hidden charges · 30-day warranty · pay after you're satisfied ·
free design consultation.

## Before going live — things only you can fill in

1. **Reviews** (`#reviews`) — placeholder text, flagged as such on the page. Replace with
   real Google/Facebook reviews and delete the `sechead__flag` line.
2. **Prices** — the Facebook page listed none, so no prices were invented. If you want
   "From Rs X" under each service, add it to the `svc__tag` span in each card.
3. **City areas** (`#cities`) — currently generic. Add the real areas each team covers.
4. **Opening hours** — "7 days, 9am – 11pm" appears in the top bar and footer. Correct it
   if that's wrong.
5. **Photos** — the technicians shown are cropped from the social graphics, and several of
   those posts are flagged by Facebook as AI content, so these faces are probably not real
   staff. They're presented as service imagery with no names or bios attached. If you want a
   genuine "our team" section, shoot the real crew and swap the files in `assets/team/`.
   The FoamJet and Renovation sections still have no photography.
6. **Brand colours** — the social graphics run black + cyan + hot pink. This site follows
   the approved template: navy `--navy` + yellow `--yellow`. Worth deciding which is the
   real brand palette before launch; it's a one-line change either way.
7. **Domain** — update the `og:url`, `canonical` and `og:image` tags in `<head>` if it
   isn't `onesolution.com.pk`.
8. **Logo source file** — `assets/logo.jpg` is the Facebook profile image (1500×1500 JPEG,
   black circle on white). If you have the original vector, drop in an SVG/transparent PNG
   and change the two `<img class="logo__mark">` tags. Because the mark is black on white,
   it sits on a white circular chip over the navy header — that's the `.logo__mark` rule
   in `css/styles.css`.

## Colors

Edit the variables at the top of `css/styles.css`:
`--navy #0d3c4e`, `--yellow #f2c014`, `--green #1fa855`.
