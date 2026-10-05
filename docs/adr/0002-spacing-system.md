# ADR-0002: One page container and scaling spacing tokens

- **Status:** Accepted
- **Date:** 2026-10-03
- **Issue / PR:** #22

## Context

Each component set its own width, gutter and padding: `width: 80%` (90% on tablets), fixed `max-width`s of 600px, 1080px and 1200px, extra inner padding, and fixed `rem` paddings that didn't shrink on phones. Components also switched layout at different breakpoints. As a result:
- The page's left edge **doubled from 38px to 77px between 768 and 769px**.
- The features grid sat 24px further in than everything else.
- Stacked feature cards were ~120px apart on phones.
- Service pages centred long paragraphs between 769 and 1024px.

## Decision

- **One page container**, `theme.mixins.container`: content up to `theme.layout.maxWidth` (1080px), centred, with `theme.spacing.gutter` on each side. Every block that lines up with the page edge uses it.
- **Cards sit inside the container**; they are never the container. That way the card's background doesn't fill the gutter.
- **Spacing that scales with the screen**, using `clamp()` instead of breakpoint jumps:

  | Token | Use | Range |
  |---|---|---|
  | `spacing.gutter` | page side margin | 20px → 40px |
  | `spacing.section` | between page sections | 40px → 64px |
  | `spacing.card` | inside cards | 20px → 32px |
  | `spacing.cardLarge` | inside large cards | 24px → 48px |

  The fixed `xs`–`xl` scale stays for spacing inside a block.
- **One breakpoint per layout change.** Each layout switches at a single breakpoint (e.g. Service pages stack at `desktop`). Body text stays left-aligned at every width.

## Consequences

- Hero text, cards, features, About, Service cards and the footer share one left edge at every width (checked at 390, 768, 769, 1024 and 1280px).
- New sections should use `mixins.container` and the spacing tokens, not new percentage widths or fixed `rem` paddings.
- **The header is deliberately not on the container.** On phones it needs tighter padding than the gutter to fit the logo and links at 320px (see #21).
