# CLAUDE.md — EJM Tech Website

## What This Project Is

EJM Tech (ejmtech.net) is a technology consulting website for mission-driven nonprofits. Single-page static site with anchor navigation. Hosted on GitHub Pages with a custom domain.

Sentinel Chicago (sentinelchicago.org) is EJM Tech's flagship project — referenced in the site but lives in its own repo at `../app/`.

## Tech Stack

- **CSS framework:** [Canonical Vanilla Framework](https://vanillaframework.io/docs) — loaded from `css/vanilla-framework.min.css`
- **Custom overrides:** `css/custom.css` — EJM brand colors and layout tweaks on top of Vanilla
- **JavaScript:** Vanilla JS, no frameworks — `js/main.js`
- **Hosting:** GitHub Pages, custom domain via CNAME
- **Contact form:** Basin (usebasin.com) — form action points to Basin endpoint, includes honeypot spam field

## File Structure

```
ejmtech.net/
├── index.html              # Single-page site (all sections)
├── css/
│   ├── vanilla-framework.min.css   # Canonical Vanilla Framework (DO NOT EDIT)
│   └── custom.css                  # EJM brand overrides
├── js/
│   └── main.js             # Nav toggle, scroll effects, fade-in animations
├── favicon.svg
├── CNAME                   # GitHub Pages custom domain
├── EJM-Tech-Handoff.md     # Original design/content handoff doc
└── ejmtech-site.html       # Original approved design prototype (reference only)
```

## Vanilla Framework — How It Works

Vanilla Framework is Canonical's (Ubuntu) open-source CSS framework. It provides a complete design system with components, utilities, and a grid. All styling comes through class names — no build step, no SASS compilation needed when using the pre-built CSS.

**Key design principle: Vanilla is square.** No rounded corners on components. Cards, buttons, inputs, navigation — everything uses sharp edges. Do not add `border-radius` to Vanilla components.

Documentation: https://vanillaframework.io/docs

## Component Reference — What We Use

### Grid (`row`, `col-*`)

Vanilla uses a 12-column grid. Always wrap content in `u-fixed-width` or a `row`.

```html
<div class="u-fixed-width">
  <div class="row">
    <div class="col-6 col-medium-3">Left half</div>
    <div class="col-6 col-medium-3">Right half</div>
  </div>
</div>
```

- `col-{1-12}` — large screens
- `col-medium-{1-6}` — medium screens
- Small screens stack automatically

### Navigation (`p-navigation`)

Top nav bar with mobile hamburger toggle. JS for toggle is in `main.js`.

```html
<header class="p-navigation">
  <div class="p-navigation__row">
    <div class="p-navigation__banner">
      <div class="p-navigation__logo">...</div>
      <a class="p-navigation__toggle--open">Menu</a>
      <a class="p-navigation__toggle--close">Close menu</a>
    </div>
    <nav class="p-navigation__nav">
      <ul class="p-navigation__items">
        <li class="p-navigation__item">
          <a class="p-navigation__link" href="#section">Link</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

- `has-menu-open` — toggled by JS on mobile
- `has-shadow` — added by JS on scroll

### Cards (`p-card`)

Used for service cards and the about sidebar. **No border-radius — cards are square.**

```html
<!-- Default card -->
<div class="p-card">
  <h3 class="p-card__title p-heading--4">Title</h3>
  <p class="p-card__content">Content here.</p>
</div>

<!-- Highlighted card (interactive feel) -->
<div class="p-card--highlighted">
  <h3 class="p-card__title">Title</h3>
  <p class="p-card__content">Content here.</p>
</div>
```

Variants:
- `p-card` — default, subtle border
- `p-card--highlighted` — for interactive/clickable content
- `p-card__thumbnail` — image at top of card
- `p-card__content` — body text

### Lists (`p-list`)

Several variants available. We currently use `p-list--divided` with optional tick marks.

```html
<!-- Divided list (lines between items) -->
<ul class="p-list--divided">
  <li class="p-list__item">Item one</li>
  <li class="p-list__item">Item two</li>
</ul>

<!-- Divided + ticked (checkmark icons) -->
<ul class="p-list--divided">
  <li class="p-list__item is-ticked">Completed item</li>
  <li class="p-list__item is-ticked">Another item</li>
</ul>

<!-- Divided + bulleted -->
<ul class="p-list--divided">
  <li class="p-list__item has-bullet">Bulleted item</li>
</ul>

<!-- Status list (ticked and crossed) -->
<ul class="p-list">
  <li class="p-list__item is-ticked">Included</li>
  <li class="p-list__item is-crossed">Not included</li>
</ul>

<!-- Split into two columns -->
<ul class="p-list--divided is-split">
  <li class="p-list__item">Spreads across two columns</li>
</ul>
```

### Sections & Strips (`p-section`, `p-strip`)

- `p-section` — standard section with vertical padding
- `p-strip` — alternate section wrapper
- `p-strip--image` — section with background image
- `is-shallow` — reduced padding variant

### Buttons (`p-button`)

```html
<a class="p-button--positive">Primary action</a>
<a class="p-button">Secondary action</a>
<a class="p-button--link">Link style</a>
```

Custom overrides in `custom.css` set button colors to EJM green.

### Headings (`p-heading--*`)

Use these to decouple visual size from semantic level:

```html
<h3 class="p-heading--4">Looks like h4, semantically h3</h3>
<h3 class="p-heading--5">Smaller heading</h3>
```

### Icons (`p-icon--*`)

Vanilla includes built-in SVG icons via classes:

```html
<i class="p-icon--information"></i>
<i class="p-icon--warning"></i>
<i class="p-icon--code"></i>
<i class="p-icon--search"></i>
<i class="p-icon--user"></i>
<i class="p-icon--plus"></i>
<i class="p-icon--copy"></i>
<i class="p-icon--anchor"></i>
<i class="p-icon--error"></i>
```

Add `p-icon--large` for larger size. Full list: https://vanillaframework.io/docs/patterns/icons

### Forms (`p-form`)

```html
<form class="p-form--stacked">
  <div class="p-form__group">
    <label class="p-form__label" for="name">Name</label>
    <input class="p-form__control" type="text" id="name">
  </div>
</form>
```

- `p-form--stacked` — labels above inputs (what we use)
- `p-form--inline` — labels beside inputs

### Utilities

- `u-fixed-width` — constrains content to max-width with centered margins
- `u-no-margin--bottom` — removes bottom margin
- `u-sv1` — small vertical spacer (used as `<hr class="u-sv1">`)
- `u-hide--small` / `u-hide--medium` — responsive visibility

## EJM Brand Colors (CSS Custom Properties)

Defined in `custom.css :root`:

```
--ejm-green: #2D6A4F        (primary brand green)
--ejm-green-light: #40916C   (lighter green for accents)
--ejm-warm: #B5651D          (warm accent — used for hover highlights)
--ejm-bg: #FAFAF7            (main background)
--ejm-bg-alt: #F0EFEB        (alternate section background)
--ejm-bg-dark: #1A2B1E       (dark sections like Flagship)
--ejm-text: #2C2C2C          (primary text)
--ejm-text-secondary: #5A5A5A (secondary/muted text)
--ejm-text-on-dark: #E8E6E1  (text on dark backgrounds)
--ejm-border: #D4D1CA        (border color)
```

## What NOT To Do

- **No `border-radius` on Vanilla components.** The framework uses square corners everywhere. Don't round cards, buttons, inputs, or containers.
- **Don't edit `vanilla-framework.min.css`.** All customization goes in `custom.css`.
- **Don't add CSS frameworks or JS libraries.** No Bootstrap, Tailwind, jQuery, etc.
- **Don't add a build step.** No SASS, no bundlers, no npm. This is a static site.
- **Don't break the single-page structure.** All content is in `index.html` with anchor navigation.
- **Don't use inline styles** for anything that could go in `custom.css` — exceptions only for one-off spacing tweaks.
- **Prefer Vanilla components over custom markup.** Before writing custom HTML/CSS for a UI pattern, check if Vanilla has a component for it: https://vanillaframework.io/docs

## Section Layout

The page follows this order — maintain it:

1. **Navigation** (`#navigation`) — sticky top nav
2. **Hero** (`.ejm-hero`) — tagline, CTAs, decorative SVG
3. **Services** (`#services`, `.ejm-services`) — 8 cards in 4x2 grid, alt background
4. **Flagship** (`#flagship`, `.ejm-flagship`) — dark background, Sentinel Chicago feature
5. **About** (`#about`) — bio text (col-8) + sidebar card (col-4)
6. **Contact** (`#contact`, `.ejm-contact`) — description + form, alt background
7. **Footer** (`.ejm-footer`) — logo, tagline, copyright

## JavaScript Conventions

`main.js` is vanilla JS in an IIFE. It handles:
- Mobile nav toggle (`.p-navigation__toggle--open/--close`)
- Nav shadow on scroll (`.has-shadow`)
- Fade-in on scroll via IntersectionObserver (`.fade-in` → `.is-visible`)
- Smooth scroll for anchor links

Add `.fade-in` to any `u-fixed-width` wrapper to get scroll-triggered fade-in animation.
