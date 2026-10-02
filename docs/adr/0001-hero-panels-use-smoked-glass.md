# ADR-0001: Hero panels use smoked glass for contrast

- **Status:** Accepted
- **Date:** 2026-10-02
- **Issue / PR:** #12 / #16

## Context

The home page hero places a quote form and a "Explore our services" box over a full-width photo. The form originally used a translucent white glass panel (`rgba(255,255,255,0.15)` + blur) with white text. Over the sky in the photo, contrast fell as low as 1.2:1, far below the WCAG 2.2 AA minimum of 4.5:1 for text and 3:1 for input borders.

Because the panel is see-through, its contrast depends on whatever part of the photo is behind it, which changes with screen size and with any future photo change.

## Decision

Both hero panels use **smoked glass**: dark slate `rgba(15, 23, 42, 0.65)` with the existing blur, a soft white border, and white text. This was chosen by the site owner from four WCAG-compliant options reviewed on a deploy preview: smoked glass, navy glass, frosted white and solid navy.

The opacity was picked so white text still reaches 5.57:1 with **pure white** behind the panel. Measured on the current photo, the lowest values were 6.92:1 for text, 11.40:1 for placeholders and 3.66:1 for input borders.

The style is defined once (`smokedGlass` in `HeroSection.jsx`) and shared by both panels.

## Consequences

- The panels keep a glass look while passing contrast whatever photo is behind them.
- **Don't lower the panel opacity below 0.65** or switch back to a white tint without re-measuring contrast. Values below 0.65 fail in the worst case.
- Hover and focus colours on top of the panels must also meet contrast. That's why the service links stay white on hover instead of using the blue `accent`, which fell to 1.7:1 over bright sky.
