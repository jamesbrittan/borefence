# BoreFence domain glossary

Terms used across the code, issues and PRs. Keep entries short; add a term when a new concept gets a name.

**BoreFence**: The business. An accredited fitter of ColourFence products, based in Newport and covering the NP and CF postcodes and South East Wales.

**Service**: A product line BoreFence sells, with its own page at `/services/<slug>`: Fencing, Railings, Gates, Sheds, and Tree Felling & Stump Grinding. In this codebase "Service" always means this, never a software service.

**Service catalogue**: The list of Services the site offers, kept in one place (`src/catalogue/services.jsx`). Each entry has the Service's slug, name, description, gallery photos (with alt text) and any extra sections. The menu, hero links, routes and Service pages all read from it.

**ColourFence / ColourRail / ColourShed**: The manufacturer's powder-coated steel product ranges that BoreFence fits. They're described on the Fencing, Railings and Sheds pages.

**Colour palette**: The standard finish colours offered: Cream, Green, Blue, Brown, Anthracite Grey, and Matt or Gloss Black.

**Railing top**: The finial style on a railing: Ball Top, Bow Top, Fleur de Lys, Loop & Fleur de Lys, Loop & Ball, or Flat Top.

**Quote request**: A submission of the "Get a free quote" form. It's sent to Netlify Forms (form name `contact`) and appears in the home page hero, on the Contact page, and at the bottom of every Service page.

**Smoked glass**: The dark tinted, blurred panel style used for the hero's quote form and service links. It was chosen so white text stays readable over any part of the hero photo (see ADR-0001).
