# UI Library Statistics

## Overview

This portable UI library was extracted from Shopify's Dawn theme on 2025-11-13.

## Component Statistics

### Total Counts

- **33** Component Directories
- **40+** Custom HTML Elements (Web Components)
- **25** JavaScript Files (with custom elements)
- **38** CSS Files
- **20** Liquid Template Files
- **5** Core Utility Files

### File Breakdown

#### JavaScript Files (30 total)

**Component Files (25):**
1. cart-drawer.js
2. cart-notification.js
3. cart.js
4. details-disclosure.js
5. details-modal.js
6. facets.js
7. localization-form.js
8. main-search.js
9. media-gallery.js
10. password-modal.js
11. pickup-availability.js
12. predictive-search.js
13. price-per-item.js
14. product-form.js
15. product-info.js
16. product-modal.js
17. product-model.js
18. quantity-popover.js
19. quick-add.js
20. quick-add-bulk.js
21. quick-order-list.js
22. recipient-form.js
23. search-form.js
24. share.js
25. show-more.js

**Core Files (5):**
1. global.js (contains 13 custom elements)
2. constants.js
3. pubsub.js
4. animations.js
5. customer.js

#### CSS Files (38 total)

Base:
- base.css

Component Styles:
- component-cart-drawer.css
- component-cart-items.css
- component-cart-notification.css
- component-cart.css
- component-deferred-media.css
- component-facets.css
- component-localization-form.css
- component-menu-drawer.css
- component-modal-video.css
- component-pickup-availability.css
- component-predictive-search.css
- component-price.css
- component-product-model.css
- component-product-variant-picker.css
- component-search.css
- component-show-more.css
- component-slider.css
- component-slideshow.css
- quick-add.css
- quick-order-list.css
- quantity-popover.css

#### Liquid Templates (20 total)

1. cart-drawer.liquid
2. cart-notification.liquid
3. facets.liquid
4. gift-card-recipient-form.liquid
5. header-drawer.liquid
6. product-media-gallery.liquid
7. product-media-modal.liquid
8. product-variant-picker.liquid
9. quantity-input.liquid
10. share-button.liquid
[and 10 more...]

## Component Categories

### Cart & Checkout (10 components)
- cart-drawer (2 elements)
- cart-notification
- cart (3 elements)
- quick-add
- quick-add-bulk
- quick-order-list (2 elements)
- quantity-popover

### Product Display (11 components)
- product-form
- product-info
- product-modal
- product-model
- media-gallery
- variant-picker
- price-per-item
- recipient-form
- deferred-media
- show-more
- product-recommendations

### Search & Navigation (8 components)
- main-search
- predictive-search
- search-form
- facets (3 elements)
- menu-drawer
- header-drawer
- details-disclosure (2 elements)
- header-menu

### UI Controls (7 components)
- modal-dialog
- bulk-modal
- modal-opener
- details-modal
- slider
- slideshow
- quantity-input

### Other (4 components)
- pickup-availability (2 elements)
- localization-form
- password-modal
- share
- account-icon
- bulk-add

## Custom Elements by File

### Files with Multiple Elements

1. **global.js** (13 elements):
   - quantity-input
   - menu-drawer
   - header-drawer
   - modal-dialog
   - bulk-modal
   - modal-opener
   - deferred-media
   - slider-component
   - slideshow-component
   - variant-selects
   - product-recommendations
   - account-icon
   - bulk-add

2. **cart-drawer.js** (2 elements):
   - cart-drawer
   - cart-drawer-items

3. **cart.js** (3 elements):
   - cart-remove-button
   - cart-items
   - cart-note

4. **details-disclosure.js** (2 elements):
   - details-disclosure
   - header-menu

5. **facets.js** (3 elements):
   - facet-filters-form
   - price-range
   - facet-remove

6. **pickup-availability.js** (2 elements):
   - pickup-availability
   - pickup-availability-drawer

7. **quick-order-list.js** (2 elements):
   - quick-order-list
   - quick-order-list-remove-all-button

### Files with Single Element (18 files)

Each defines one custom element matching the filename.

## Code Statistics

### Lines of Code (Approximate)

- **JavaScript**: ~15,000 lines
- **CSS**: ~12,000 lines
- **Liquid**: ~3,000 lines
- **Total**: ~30,000 lines of code

### Largest Components

1. **global.js**: 1,332 lines (13 components)
2. **quick-order-list.js**: 444 lines
3. **facets.js**: 365 lines
4. **slider-component**: 300+ lines (in global.js)
5. **predictive-search.js**: 277 lines

## Browser Compatibility

### Required Features

- Custom Elements v1
- ES6+ (classes, arrow functions, template literals)
- CSS Flexbox
- CSS Grid
- CSS Custom Properties
- Fetch API
- Intersection Observer (for some components)

### Supported Browsers

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Dependencies

### External Dependencies

- **None** - Fully vanilla JavaScript
- No React, Vue, Angular, or other frameworks
- No jQuery or utility libraries

### Internal Dependencies

- PubSub system (pubsub.js)
- Global constants (constants.js)
- Animation utilities (animations.js)
- Base styles (base.css)

## Usage Patterns

### Most Common Element Types

1. Forms (10 components)
2. Modals/Overlays (6 components)
3. Carousels/Sliders (4 components)
4. Drawers (3 components)

### Event System

Components communicate via:
- Native DOM events
- PubSub publish/subscribe pattern
- Custom events
- Form submissions

## Performance Characteristics

### Loading Strategy

- **Deferred**: Most scripts use `defer` attribute
- **Lazy**: Media uses intersection observer
- **Progressive**: HTML renders first, JS enhances

### Bundle Size (Approximate)

- **Minimal**: ~15 KB (global.js + pubsub.js + constants.js)
- **Typical**: ~50-100 KB (with 3-5 components)
- **Complete**: ~300 KB (all components)

*All sizes are minified + gzipped estimates*

## Integration Scenarios

### Use Cases

1. **Shopify Themes**: Drop-in replacement/enhancement
2. **E-commerce Sites**: Reusable cart/product components
3. **Component Libraries**: Reference implementation
4. **Learning**: Web Components best practices

### Framework Compatibility

- ✓ Vanilla JS/HTML
- ✓ React (via web components)
- ✓ Vue (via web components)
- ✓ Angular (CUSTOM_ELEMENTS_SCHEMA)
- ✓ Svelte (via web components)

## Documentation Files

1. **README.md** - Main documentation (500+ lines)
2. **QUICKSTART.md** - Quick start guide (400+ lines)
3. **COMPONENTS.md** - Component manifest (200+ lines)
4. **CUSTOM-ELEMENTS.md** - Element reference (400+ lines)
5. **LIBRARY-STATS.md** - This file

Total documentation: ~1,500+ lines

## Quality Metrics

### Code Quality

- ✓ JSDoc comments
- ✓ Accessibility (ARIA)
- ✓ Internationalization support
- ✓ Progressive enhancement
- ✓ Mobile-first responsive design

### Testing

Original Dawn theme includes:
- Theme Check (Shopify's linter)
- Accessibility testing
- Cross-browser testing
- Performance monitoring

## License

Extracted from Shopify Dawn theme - refer to original license.

## Last Updated

2025-11-13

## Extraction Source

- **Repository**: Shopify Dawn
- **Branch**: main
- **Commit**: 28c420b (Update translations)

---

**Total Library Size**: ~30,000 lines across 63 files in 33 component directories
