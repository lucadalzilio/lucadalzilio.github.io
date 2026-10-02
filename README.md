# Luca Dal Zilio, personal website

Source of [www.lucadalzilio.net](https://www.lucadalzilio.net), the personal website of Luca Dal Zilio, scientist and international speaker, author of *Le forze invisibili* (Mondadori).

The site is static: plain HTML, CSS and JavaScript, no build step and no framework. It is bilingual (English and Italian) with a language switch in the navigation.

## Structure

```
index.html                 home page (English text lives here)
publications.html          full publication list
favicon.ico
assets/
  css/styles.css           all styles
  js/script.js             navigation, language switch, carousel, lightbox, contact form
  js/translations.js       Italian text, keyed by the data-i18n attributes in the HTML
  img/                     images used by the site
publications/
  publications.md          publication list in Markdown (source of truth)
  *.pdf                    the papers linked from the list
tools/
  build_publications.py    regenerates the list in publications.html from publications.md
```

The folder `source/` (ignored by git) holds the original photos and book cover files from which the site images were made.

## Editing

**Text.** English is written directly in `index.html` and `publications.html`. Every translatable element carries a `data-i18n="key"` attribute; the Italian for that key is in `assets/js/translations.js`. Values there are HTML, so `<strong>`, `<em>` and `<br>` are allowed. An element without a key stays in English in both languages (for example the label "Scientist & International Speaker").

**Language behaviour.** The choice is remembered in the browser. `index.html?lang=it` opens the Italian version directly. On a first visit the page follows the browser language.

**Adding a paper.** Add one line to `publications/publications.md` following the existing format, copy the PDF into `publications/`, then run

```
python3 tools/build_publications.py
```

This rewrites the list and the year navigation in `publications.html` and updates the paper count on both pages and in the Italian translations. The homepage block "Selected research" is edited by hand in `index.html`.

**Images.** Site images are in `assets/img/`. The hero uses two files: `hero-cover.jpg` (2400 x 1500, desktop) and `hero-cover-mobile.jpg` (portrait crop, screens up to 900 px wide). The book section shows `book-cover-1.jpg` to `book-cover-3.jpg` in a carousel.

## Running locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

and open http://localhost:8000.

## Deployment

The repository is laid out to be served as is by GitHub Pages: in the repository settings, under Pages, choose "Deploy from a branch", branch `main`, folder `/ (root)`. The empty `.nojekyll` file tells GitHub to publish the files without processing them. The `CNAME` file binds the site to www.lucadalzilio.net; the DNS records for the domain (A records of the apex to GitHub Pages, `www` as a CNAME to `lucadalzilio.github.io`) are managed at the registrar.

## Credits and rights

Design and code by Luca Dal Zilio. Fonts: Fraunces and Inter, loaded from Google Fonts.

Texts, photographs and the book material are copyright Luca Dal Zilio and may not be reused without permission. The PDFs in `publications/` are provided for personal, non-commercial use; copyright remains with the respective publishers. The HTML, CSS and JavaScript may be reused freely.
