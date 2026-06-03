# Abrar Amin — Portfolio

A colorful, single-page portfolio site. Pure HTML/CSS/JS — no build step — ready for **GitHub Pages**.

## Structure
```
index.html      # markup & sections
styles.css      # all styling (colorful/playful theme)
data.js         # ← your content: PORTFOLIO_MEDIA, EXPERIENCE, SKILLS
script.js       # rendering, gallery, lightbox, animations
assets/         # headshot + any local images
```

## Adding portfolio media (Google Drive)
The gallery is driven by the `PORTFOLIO_MEDIA` array in **`data.js`**. Each entry:
```js
{ type: "video", id: "<DRIVE_FILE_ID>", title: "AR City Explorer", desc: "…", tags: ["AR","Mobile"] }
```
- `id` is the file id from a Drive link: `https://drive.google.com/file/d/`**`<ID>`**`/view`
- **Every file must be shared as “Anyone with the link”** or visitors see a private/blocked frame.
- `type: "image"` shows the picture; `type: "video"` shows a thumbnail with a ▶ play button that opens the Drive player in a lightbox.
- `tags` populate the filter bar automatically.

## Deploy to GitHub Pages
```bash
git add -A && git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / root**.
Site goes live at `https://<you>.github.io/<repo>/`.

> Tip: name the repo `<your-username>.github.io` to serve it at the root domain.

## Local preview
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
