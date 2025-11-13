# Dawn UI Library

A portable, reusable UI component library extracted from Shopify's Dawn theme. This library contains 33+ web components built with vanilla JavaScript custom elements, Liquid templates, and modular CSS.

## Overview

This library provides a comprehensive set of production-ready UI components originally developed for Shopify's Dawn theme. Each component is self-contained with its JavaScript (web component), CSS styles, and Liquid markup templates.

## Architecture

### Technology Stack

- **Web Components**: Custom elements using native browser APIs (no framework dependencies)
- **Liquid Templates**: Shopify's templating language for server-side rendering
- **Modular CSS**: Component-scoped stylesheets following BEM-like conventions
- **Progressive Enhancement**: JavaScript enhances server-rendered HTML

### Directory Structure

```
ui-library/
├── components/           # Individual UI components (33 components)
│   ├── cart-drawer/
│   │   ├── cart-drawer.js
│   │   ├── component-cart-drawer.css
│   │   └── cart-drawer.liquid
│   ├── product-form/
│   │   └── product-form.js
│   └── ...
├── core/                 # Shared utilities and core functionality
│   ├── global.js        # Core utilities + 13 essential components
│   ├── constants.js     # Global constants
│   ├── pubsub.js        # Event pub/sub system
│   ├── animations.js    # Animation utilities
│   └── customer.js      # Customer account utilities
├── styles/              # Base styles
│   └── base.css        # Foundation styles
├── COMPONENTS.md        # Detailed component manifest
└── README.md           # This file
```

## Component Categories

### Cart & Checkout (7 components)
- **cart-drawer** - Slide-out cart drawer
- **cart-notification** - Cart update notifications
- **cart** - Main cart functionality (cart-items, cart-remove-button, cart-note)
- **quick-add** - Quick add to cart button
- **quick-add-bulk** - Bulk quantity add to cart
- **quick-order-list** - Fast ordering interface
- **quantity-popover** - Quantity selector popover

### Product Display (10 components)
- **product-form** - Product purchase form
- **product-info** - Product information display
- **product-modal** - Product quick view modal
- **product-model** - 3D product model viewer
- **media-gallery** - Product image/video gallery
- **variant-picker** - Product variant selector
- **price-per-item** - Unit price display
- **recipient-form** - Gift card recipient form
- **deferred-media** - Lazy-loaded media (images/videos)
- **show-more** - Content expansion control

### Search & Navigation (7 components)
- **main-search** - Main search functionality
- **predictive-search** - Auto-complete search
- **search-form** - Search input form
- **facets** - Product filtering (facet-filters-form, price-range, facet-remove)
- **menu-drawer** - Mobile navigation drawer
- **header-drawer** - Header drawer component
- **details-disclosure** - Collapsible content (details-disclosure, header-menu)

### UI Controls (6 components)
- **modal-dialog** - Generic modal dialog
- **details-modal** - Details modal overlay
- **slider** - Content slider/carousel
- **slideshow** - Image slideshow
- **quantity-input** - Quantity input control
- **share** - Social share button

### Other (3 components)
- **pickup-availability** - Store pickup info (pickup-availability, pickup-availability-drawer)
- **localization-form** - Language/currency selector
- **password-modal** - Password page modal

## Core Components (in global.js)

The `core/global.js` file contains 13 essential components that are loaded globally:

1. **quantity-input** - Quantity input with +/- controls
2. **menu-drawer** - Navigation drawer
3. **header-drawer** - Header drawer component
4. **modal-dialog** - Reusable modal dialog
5. **bulk-modal** - Bulk action modal
6. **modal-opener** - Modal trigger component
7. **deferred-media** - Lazy media loading
8. **slider-component** - Slider/carousel
9. **slideshow-component** - Slideshow functionality
10. **variant-selects** - Product variant selection
11. **product-recommendations** - Related products
12. **account-icon** - User account icon
13. **bulk-add** - Bulk add to cart

## Usage

### Basic Component Usage

Each component follows this pattern:

1. **Include the CSS** (in your template or layout):
```liquid
{{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}
```

2. **Include the JavaScript** (defer loading recommended):
```liquid
<script src="{{ 'cart-drawer.js' | asset_url }}" defer="defer"></script>
```

3. **Use the custom element** in your HTML/Liquid:
```liquid
<cart-drawer>
  <!-- Component content from cart-drawer.liquid -->
</cart-drawer>
```

### Custom Element Registration

Components are registered as custom elements:

```javascript
class CartDrawer extends HTMLElement {
  constructor() {
    super();
    // Component initialization
  }

  connectedCallback() {
    // Called when element is added to DOM
  }
}

customElements.define('cart-drawer', CartDrawer);
```

### Integration Patterns

#### Pattern 1: Section → Snippet → Component

```liquid
{%- # sections/cart-drawer.liquid -%}
{% render 'cart-drawer' %}

{%- # snippets/cart-drawer.liquid -%}
{{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}
<script src="{{ 'cart-drawer.js' | asset_url }}" defer="defer"></script>

<cart-drawer>
  <!-- Markup -->
</cart-drawer>
```

#### Pattern 2: Direct Component Usage

```liquid
<product-form data-product-id="{{ product.id }}">
  <!-- Product form fields -->
</product-form>
```

#### Pattern 3: Progressive Enhancement

```liquid
<!-- Server-rendered content -->
<div class="cart-items">
  {% for item in cart.items %}
    <!-- Rendered cart items -->
  {% endfor %}
</div>

<!-- Enhanced with JavaScript -->
<cart-items>
  <!-- Same markup, enhanced with JS functionality -->
</cart-items>
```

## Core Utilities

### PubSub Event System (`pubsub.js`)

Global event communication between components:

```javascript
PubSub.subscribe('cart:update', (data) => {
  // Handle cart update
});

PubSub.publish('cart:update', { items: [...] });
```

### Constants (`constants.js`)

Shared configuration values:

```javascript
const ON_CHANGE_DEBOUNCE_TIMER = 300;
const CART_UPDATE_DEBOUNCE_TIMER = 500;
```

### Animations (`animations.js`)

Smooth animations and transitions:

```javascript
import { animate } from './animations.js';
```

## Component Dependencies

Some components depend on core utilities:

- **All components** → May use `pubsub.js` for events
- **Cart components** → Use `constants.js` for timing
- **Interactive components** → May use `animations.js`
- **Product components** → Often integrate with `variant-selects`

## Browser Compatibility

- Modern browsers with Custom Elements v1 support
- ES6+ JavaScript features
- CSS custom properties (CSS variables)

Recommended polyfills for older browsers:
- `@webcomponents/custom-elements`
- Babel for ES6+ transpilation

## File Organization by Type

### JavaScript Files (33 custom element files + 5 utilities)

**Individual Component Files:**
- cart-drawer.js, cart-notification.js, cart.js
- details-disclosure.js, details-modal.js
- facets.js, localization-form.js
- main-search.js, media-gallery.js
- password-modal.js, pickup-availability.js
- predictive-search.js, price-per-item.js
- product-form.js, product-info.js
- product-modal.js, product-model.js
- quantity-popover.js, quick-add.js
- quick-add-bulk.js, quick-order-list.js
- recipient-form.js, search-form.js
- share.js, show-more.js

**Utility Files:**
- global.js (contains 13 components)
- constants.js, pubsub.js
- animations.js, customer.js

### CSS Files (38 component stylesheets)

Component-specific styles following the pattern `component-*.css`:
- component-cart-drawer.css
- component-facets.css
- component-menu-drawer.css
- component-predictive-search.css
- component-slider.css
- component-slideshow.css
- [and 32 more...]

### Liquid Templates (20 template files)

Markup templates in `.liquid` format:
- cart-drawer.liquid
- facets.liquid
- product-variant-picker.liquid
- quantity-input.liquid
- [and 16 more...]

## Component Feature Matrix

| Component | JavaScript | CSS | Liquid | Custom Element |
|-----------|------------|-----|--------|----------------|
| cart-drawer | ✓ | ✓ | ✓ | cart-drawer, cart-drawer-items |
| cart-notification | ✓ | ✓ | ✓ | cart-notification |
| cart | ✓ | ✓ | - | cart-items, cart-remove-button |
| facets | ✓ | ✓ | ✓ | facet-filters-form, price-range, facet-remove |
| product-form | ✓ | - | - | product-form |
| quick-add | ✓ | ✓ | - | quick-add |
| slider | - | ✓ | - | slider-component (in global.js) |
| variant-picker | - | ✓ | ✓ | variant-selects (in global.js) |

*See COMPONENTS.md for complete listing*

## Best Practices

### 1. Lazy Loading

Load components only when needed:

```liquid
{% if section.settings.enable_cart_drawer %}
  {{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}
  <script src="{{ 'cart-drawer.js' | asset_url }}" defer="defer"></script>
{% endif %}
```

### 2. Event Communication

Use PubSub for cross-component communication:

```javascript
// Publisher
PubSub.publish('variant:change', {
  variantId: this.currentVariant.id
});

// Subscriber
PubSub.subscribe('variant:change', (data) => {
  this.updatePrice(data.variantId);
});
```

### 3. Progressive Enhancement

Ensure components work with and without JavaScript:

```liquid
<form method="post" action="/cart/add">
  <!-- Works without JS -->
  <button type="submit">Add to Cart</button>
</form>

<product-form>
  <!-- Enhanced with JS for AJAX submission -->
</product-form>
```

### 4. Accessibility

Components include ARIA attributes and keyboard navigation:

```liquid
<modal-dialog
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title">
  <!-- Modal content -->
</modal-dialog>
```

## Customization

### Styling

Override component styles using CSS specificity:

```css
/* Override cart drawer background */
cart-drawer {
  --drawer-background: #f5f5f5;
}
```

### Extending Components

Extend existing components:

```javascript
class CustomCartDrawer extends CartDrawer {
  constructor() {
    super();
    // Custom initialization
  }
}

customElements.define('custom-cart-drawer', CustomCartDrawer);
```

## Migration Guide

### From Shopify Dawn Theme

If you're using this library outside of Dawn:

1. **Copy core files** to your project
2. **Update asset paths** in Liquid templates
3. **Load base.css** in your layout
4. **Initialize pubsub.js** and **constants.js** globally
5. **Load global.js** for essential components

### To Other Frameworks

To use with React, Vue, or other frameworks:

1. **Web Components** work natively in most frameworks
2. **Convert Liquid** templates to your framework's template syntax
3. **Import CSS** using your build system
4. **Adapt event system** to framework patterns

## Performance Considerations

- **Deferred Loading**: Use `defer` for non-critical scripts
- **Code Splitting**: Load components on demand
- **CSS**: Use component-scoped styles to avoid bloat
- **Lazy Media**: Use `deferred-media` for images/videos

## License

This library is extracted from Shopify's Dawn theme. Please refer to the original Dawn theme license for usage terms.

## Credits

Components extracted from **Shopify Dawn Theme** - Shopify's official headless commerce theme built with Online Store 2.0 features.

## Further Documentation

- See `COMPONENTS.md` for detailed component listing
- Check individual component files for inline documentation
- Review original Dawn theme documentation at [shopify.dev](https://shopify.dev/themes)

## Support

For issues related to:
- **Original components**: Refer to [Shopify Dawn GitHub](https://github.com/Shopify/dawn)
- **This extraction**: Document in your project's issue tracker

---

**Version**: Extracted from Dawn theme (current as of extraction date)
**Total Components**: 33 components + 5 core utilities
**Custom Elements**: 40+ registered custom elements
