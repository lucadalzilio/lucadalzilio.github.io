#!/usr/bin/env python3
"""Rebuild the publication list from publications/publications.md.

Usage, from the repository root:

    python3 tools/build_publications.py

What it does
  - reads every entry of the form  [**N**] Authors (YEAR). Title. _Journal_ ... [PDF](file.pdf)
  - rewrites the list and the year navigation in publications.html between the
    <!-- publications:start --> / <!-- publications:end --> and
    <!-- years:start --> / <!-- years:end --> markers
  - updates the paper count in publications.html, index.html and assets/js/translations.js

Markdown conventions in publications.md
  **text**   bold (used for Dal Zilio, L.)
  _text_     italic (journal name)
  ∗          after an author's initials marks a student or postdoc (co-)advised by Luca
  [PDF](x)   link; a bare file name points to publications/x, a full URL is kept as an external link
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MD = ROOT / "publications" / "publications.md"
HTML = ROOT / "publications.html"
INDEX = ROOT / "index.html"
TRANSLATIONS = ROOT / "assets" / "js" / "translations.js"

ENTRY = re.compile(r"^\[\*\*(\d+)\*\*\]\s*(.*?)\s*\[PDF\]\(([^)]+)\)\s*$")


def md_to_html(text):
    text = text.replace("&", "&amp;")
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![A-Za-z0-9])_(.+?)_(?![A-Za-z0-9])", r"<i>\1</i>", text)
    text = text.replace("∗", '<span class="adv" title="MSc / PhD / postdoc (co-)advised by Luca">&#8727;</span>')
    return text


def parse():
    entries = []
    for line in MD.read_text(encoding="utf-8").splitlines():
        m = ENTRY.match(line.strip())
        if not m:
            continue
        num, body, link = m.groups()
        year = re.search(r"\((\d{4})\)", body)
        if not year:
            sys.exit(f"entry {num}: no (year) found")
        entries.append((int(num), year.group(1), md_to_html(body), link))
    entries.sort(key=lambda e: -e[0])
    return entries


def render(entries):
    years = []
    for _, year, _, _ in entries:
        if year not in years:
            years.append(year)
    blocks = []
    for year in years:
        items = []
        for num, y, body, link in entries:
            if y != year:
                continue
            if link.startswith("http"):
                href, label = link, "Article"
            else:
                href, label = "publications/" + link, "PDF"
            items.append(
                "      <li class=\"pub\">\n"
                f"        <span class=\"pub-num\">{num}</span>\n"
                f"        <div class=\"pub-body\">{body}</div>\n"
                f"        <a class=\"pub-link\" href=\"{href}\" target=\"_blank\" rel=\"noopener\">{label}</a>\n"
                "      </li>"
            )
        blocks.append(
            f"    <div class=\"pub-year reveal\" id=\"y{year}\">\n"
            f"      <h2>{year}</h2>\n"
            "      <ul class=\"pub-list\">\n" + "\n".join(items) + "\n"
            "      </ul>\n"
            "    </div>"
        )
    nav = " ".join(f'<a href="#y{y}">{y}</a>' for y in years)
    return "\n".join(blocks), nav


def replace_between(text, start, end, new):
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
    if not pattern.search(text):
        sys.exit(f"marker {start} not found")
    return pattern.sub(lambda _: f"{start}\n{new}\n{end}", text, count=1)


def main():
    entries = parse()
    n = len(entries)
    body, nav = render(entries)

    html = HTML.read_text(encoding="utf-8")
    html = replace_between(html, "<!-- publications:start -->", "<!-- publications:end -->", body)
    html = replace_between(html, "<!-- years:start -->", "<!-- years:end -->", nav)
    html = re.sub(r'<b>\d+</b> <span data-i18n="pubs.count">', f'<b>{n}</b> <span data-i18n="pubs.count">', html)
    HTML.write_text(html, encoding="utf-8")

    index = INDEX.read_text(encoding="utf-8")
    index = re.sub(r"\d+ peer-reviewed papers", f"{n} peer-reviewed papers", index)
    index = re.sub(r"All \d+ publications", f"All {n} publications", index)
    INDEX.write_text(index, encoding="utf-8")

    tr = TRANSLATIONS.read_text(encoding="utf-8")
    tr = re.sub(r"\d+ articoli peer-reviewed", f"{n} articoli peer-reviewed", tr)
    tr = re.sub(r"Tutte le \d+ pubblicazioni", f"Tutte le {n} pubblicazioni", tr)
    TRANSLATIONS.write_text(tr, encoding="utf-8")

    print(f"{n} publications, {len(set(e[1] for e in entries))} years")


if __name__ == "__main__":
    main()
