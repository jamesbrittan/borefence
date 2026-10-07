# ADR-0003: One type scale and role-based text styles

- **Status:** Accepted
- **Date:** 2026-10-07
- **Issue / PR:** #35

## Context

Font sizes were set per component: 20 different `font-size` declarations, 11 of them hard-coded, two borrowed from spacing tokens, and six different line heights. As a result:
- **Hierarchy inversions.** `h2`s at 20px rendered smaller than `h3`s at 24px.
- **Page titles varied** from 20px to 67px.
- **Body text came in five styles.**
- **The theme's scale was mostly unused.**

## Decision

- **A single scale in `theme.fonts.size`,** using `clamp()` so each step scales smoothly with the screen: about 1.25× between steps on phones and about 1.33× on desktop.

  | Step | Phone → desktop |
  |---|---|
  | `display` | 40 → 56px |
  | `h1` | 32 → 44px |
  | `h2` | 26 → 34px |
  | `h3` | 21 → 24px |
  | `lead` | 18 → 20px |
  | `body` | **17px** |
  | `nav` | 16px |
  | `small` | 14px |

- **Body text is 17px.** Barlow is compact, and 17px reads noticeably better than 16px. It's also above iOS's 16px minimum for form fields, so iOS doesn't zoom in when someone taps a field.
- **Text styles in `theme.typography`** (`display`, `h1`, `h2`, `h3`, `lead`, `body`, `small`, `label`, `nav`, `button`) set font, size, weight, line height and letter-spacing together. Components use these, not raw sizes.
- **Style by role, not by tag.** A component heading (the quote form's "Get a free quote", footer column titles) can be an `h2` for document structure and still use the `h3` style.
- **A test** (`src/styles/theme.test.js`) fails on any hard-coded `font-size` or `line-height` in a component.

## Consequences

- **No inversions:** no heading level renders larger than the level above it, checked on 5 pages at 390, 768, 1024 and 1280px.
- **To change a size or weight across the site,** change the scale or a text style, not a component.
- **New text uses a role.** If none fits, add one to the theme rather than a one-off value.
