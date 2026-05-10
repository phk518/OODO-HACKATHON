---
name: Modern Explorer
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#564334'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#897362'
  outline-variant: '#ddc1ae'
  surface-tint: '#875200'
  primary: '#875200'
  on-primary: '#ffffff'
  primary-container: '#ef9500'
  on-primary-container: '#5b3600'
  inverse-primary: '#ffb865'
  secondary: '#4f6073'
  on-secondary: '#ffffff'
  secondary-container: '#d2e4fb'
  on-secondary-container: '#556679'
  tertiary: '#5a5f62'
  on-tertiary: '#ffffff'
  tertiary-container: '#a6aaae'
  on-tertiary-container: '#3a3f42'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddba'
  primary-fixed-dim: '#ffb865'
  on-primary-fixed: '#2b1700'
  on-primary-fixed-variant: '#673d00'
  secondary-fixed: '#d2e4fb'
  secondary-fixed-dim: '#b7c8de'
  on-secondary-fixed: '#0b1d2d'
  on-secondary-fixed-variant: '#38485a'
  tertiary-fixed: '#dfe3e7'
  tertiary-fixed-dim: '#c3c7cb'
  on-tertiary-fixed: '#171c1f'
  on-tertiary-fixed-variant: '#43474b'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter-mobile: 16px
  gutter-desktop: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 48px
---

## Brand & Style

The design system is anchored in the "Modern Explorer" aesthetic—a visual language that balances the rugged spirit of adventure with the polished precision of a premium digital tool. It is designed for the high-end traveler who values both spontaneity and sophisticated planning.

The style is primarily **Minimalist**, utilizing generous whitespace to allow high-quality travel photography to serve as the primary emotional driver. However, it incorporates elements of **Glassmorphism** for navigational overlays to maintain a sense of depth and lightness. The interface should feel expansive, clean, and highly intuitive, evoking the clarity one feels when looking at a wide-open horizon.

## Colors

The palette is inspired by the transition of a coastal sunset into twilight. 

- **Primary Accent:** "Amber Sunset" (#FD9F07) is used sparingly for primary actions, progress indicators, and key highlights to draw the eye and inject energy.
- **Secondary / Typography:** "Deep Navy" (#1A2B3C) provides the structural weight. It is used for all primary headings, icons, and navigation elements to ensure high contrast and a premium feel.
- **Backgrounds:** A "Crisp Off-White" (#FAFAFA) serves as the primary canvas, reducing eye strain and providing a sophisticated alternative to pure white. 
- **Surface:** Pure White (#FFFFFF) is reserved for cards and elevated components to create a subtle layered effect against the off-white background.

## Typography

Typography in this design system prioritizes legibility and character. 

**Montserrat** is used for headings to convey confidence and a geometric, modern vibe. Use heavier weights (600-700) for section titles to establish a clear hierarchy.

**Inter** is the workhorse for all body copy, inputs, and UI labels. Its high x-height and neutral design ensure that dense travel itineraries remain readable across all device sizes. For smaller labels, use a slightly increased letter spacing and semi-bold weight to maintain clarity against the Deep Navy color.

## Layout & Spacing

The design system utilizes a **Fluid Grid** model with a focus on generous internal padding to create a "premium" sense of space.

- **Desktop:** 12-column grid with 24px gutters and wide 64px margins. Content should generally be capped at a max-width of 1440px to prevent excessive line lengths.
- **Mobile:** 4-column grid with 16px gutters and 20px margins.
- **Rhythm:** All spacing (margins, padding, gaps) must follow a 4px (0.25rem) base scale. Use larger gaps (48px+) between distinct sections to reinforce the minimalist aesthetic.

## Elevation & Depth

This design system uses **Ambient Shadows** to create a sense of physical layering. Shadows should be soft, diffused, and slightly tinted with the Secondary Deep Navy color (e.g., `#1A2B3C` at 8-12% opacity) to avoid a "dirty" grey look.

- **Level 1 (Cards):** Very soft blur (10px) with low offset (4px) to separate items from the off-white background.
- **Level 2 (Modals/Dropdowns):** More pronounced shadow (25px blur) to indicate high-priority interaction.
- **Backdrop Blur:** Use a 12px blur on navigation bars and floating buttons to create a glass-like effect that allows the travel photography underneath to shimmer through without distracting the user.

## Shapes

The shape language is defined by **Compact Soft Corners**. Reflecting a refined precision, the base radius for standard components (Buttons, Inputs, Cards) is `0.25rem`.

- **Standard (4px):** Used for primary buttons, input fields, and small UI cards.
- **Large (8px-12px):** Used for hero sections, main itinerary cards, and modal containers.
- **Circular:** Reserved exclusively for user avatars and icon buttons to provide a distinct contrast against the predominantly rectangular grid.

## Components

### Buttons
Primary buttons use the Amber Sunset background with White text. They should include a subtle hover state where the amber deepens slightly. Secondary buttons use a Deep Navy outline with Navy text.

### Cards
Cards are the primary container for travel content. They must use a White (#FFFFFF) background with the Level 1 shadow. When photography is included, the image should occupy the top half of the card or the full background with a Navy gradient overlay at the bottom for text legibility.

### Chips & Tags
Use Deep Navy for category tags with low-opacity Navy backgrounds (approx. 10%) or white text. These help categorize destinations (e.g., "Adventure," "Relaxation") without competing with the primary amber call-to-action.

### Input Fields
Inputs feature a subtle 1px border in a light grey-navy blend. On focus, the border should transition to Amber Sunset. The 4px corner radius should be consistent across all form elements.

### Specialized Components
- **Map Pins:** Custom pins using the Amber Sunset hex with a white icon center.
- **Itinerary Timeline:** A vertical Deep Navy line with Amber Sunset nodes to indicate chronological travel steps.
- **Photography Overlays:** Always use a subtle 20-30% Deep Navy vignette on the bottom of images where white typography is placed.