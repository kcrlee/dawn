# Quick Start Guide

Get started with the Dawn UI Library in 5 minutes.

## Installation

### Option 1: Copy to Your Project

```bash
# Copy the entire ui-library directory to your project
cp -r ui-library /path/to/your/project/
```

### Option 2: Link Individual Components

Copy only the components you need:

```bash
# Example: Copy cart-drawer component
cp -r ui-library/components/cart-drawer /your-project/components/
cp ui-library/core/global.js /your-project/js/
cp ui-library/core/pubsub.js /your-project/js/
```

## Basic Setup

### 1. Include Core Files

In your main layout/HTML:

```html
<!-- Core utilities -->
<script src="ui-library/core/constants.js"></script>
<script src="ui-library/core/pubsub.js"></script>
<script src="ui-library/core/global.js" defer></script>

<!-- Base styles -->
<link rel="stylesheet" href="ui-library/styles/base.css">
```

### 2. Use a Component

#### Example: Cart Drawer

**In your Liquid/HTML template:**

```liquid
<!-- Include component CSS -->
{{ 'ui-library/components/cart-drawer/component-cart-drawer.css' | asset_url | stylesheet_tag }}

<!-- Include component JS -->
<script src="{{ 'ui-library/components/cart-drawer/cart-drawer.js' | asset_url }}" defer></script>

<!-- Use the custom element -->
<cart-drawer class="drawer drawer--right">
  <div class="drawer__inner">
    <div class="drawer__header">
      <h2>Your Cart</h2>
      <button type="button" class="drawer__close">Close</button>
    </div>

    <div class="drawer__content">
      <!-- Cart items go here -->
    </div>

    <div class="drawer__footer">
      <button type="button" class="button button--primary">Checkout</button>
    </div>
  </div>
</cart-drawer>

<!-- Trigger to open drawer -->
<button type="button" onclick="document.querySelector('cart-drawer').open()">
  Open Cart
</button>
```

#### Example: Product Form (Vanilla HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="ui-library/styles/base.css">
  <script src="ui-library/core/constants.js"></script>
  <script src="ui-library/core/pubsub.js"></script>
</head>
<body>
  <!-- Product Form Component -->
  <script src="ui-library/components/product-form/product-form.js" defer></script>

  <product-form>
    <form method="post" action="/cart/add">
      <input type="hidden" name="id" value="123456">

      <label>
        Quantity:
        <input type="number" name="quantity" value="1" min="1">
      </label>

      <button type="submit">Add to Cart</button>
    </form>
  </product-form>
</body>
</html>
```

## Common Patterns

### Pattern 1: Modal Dialog

```html
<!-- Include modal JS and CSS -->
<link rel="stylesheet" href="ui-library/components/details-modal/component-modal-video.css">
<script src="ui-library/components/details-modal/details-modal.js" defer></script>

<!-- Modal Component -->
<details-modal>
  <details>
    <summary>Open Modal</summary>
    <div class="modal__content">
      <h2>Modal Title</h2>
      <p>Modal content goes here...</p>
      <button type="button" class="modal__close">Close</button>
    </div>
  </details>
</details-modal>
```

### Pattern 2: Quantity Input

```html
<!-- From ui-library/components/quantity-input/quantity-input.liquid -->
<quantity-input class="quantity">
  <button class="quantity__button" name="minus" type="button">
    <span class="visually-hidden">Decrease quantity</span>
    -
  </button>
  <input
    class="quantity__input"
    type="number"
    name="quantity"
    value="1"
    min="1"
    aria-label="Quantity"
  >
  <button class="quantity__button" name="plus" type="button">
    <span class="visually-hidden">Increase quantity</span>
    +
  </button>
</quantity-input>
```

### Pattern 3: Predictive Search

```html
<!-- Search with auto-complete -->
<link rel="stylesheet" href="ui-library/components/predictive-search/component-predictive-search.css">
<script src="ui-library/components/search-form/search-form.js" defer></script>
<script src="ui-library/components/predictive-search/predictive-search.js" defer></script>

<search-form>
  <form action="/search" method="get">
    <input
      type="search"
      name="q"
      placeholder="Search products..."
      autocomplete="off"
    >
    <button type="submit">Search</button>
  </form>

  <predictive-search>
    <!-- Search results appear here dynamically -->
  </predictive-search>
</search-form>
```

### Pattern 4: Image Slider

```html
<!-- Slider is in global.js, so just use the element -->
<link rel="stylesheet" href="ui-library/components/slider/component-slider.css">

<slider-component class="slider">
  <ul class="slider__slides">
    <li class="slider__slide">
      <img src="image1.jpg" alt="Slide 1">
    </li>
    <li class="slider__slide">
      <img src="image2.jpg" alt="Slide 2">
    </li>
    <li class="slider__slide">
      <img src="image3.jpg" alt="Slide 3">
    </li>
  </ul>

  <button class="slider__button slider__button--prev">Previous</button>
  <button class="slider__button slider__button--next">Next</button>
</slider-component>
```

## Using PubSub Events

Components communicate via the PubSub system:

```javascript
// Subscribe to cart updates
PubSub.subscribe('cart:update', (data) => {
  console.log('Cart updated:', data);
  // Update cart count, total, etc.
});

// Publish a cart update event
PubSub.publish('cart:update', {
  itemCount: 3,
  total: 99.99
});

// Unsubscribe when done
const subscription = PubSub.subscribe('cart:update', handler);
PubSub.unsubscribe(subscription);
```

## Component Combinations

### Complete Product Page

```html
<!-- Product page with multiple components -->
<link rel="stylesheet" href="ui-library/styles/base.css">
<script src="ui-library/core/global.js" defer></script>

<!-- Component styles -->
<link rel="stylesheet" href="ui-library/components/media-gallery/component-media-gallery.css">
<link rel="stylesheet" href="ui-library/components/variant-picker/component-product-variant-picker.css">

<!-- Component scripts -->
<script src="ui-library/components/media-gallery/media-gallery.js" defer></script>
<script src="ui-library/components/product-form/product-form.js" defer></script>
<script src="ui-library/components/product-info/product-info.js" defer></script>

<!-- Product Gallery -->
<media-gallery>
  <!-- Product images -->
</media-gallery>

<!-- Product Info -->
<product-info>
  <variant-selects>
    <!-- Size, color selectors -->
  </variant-selects>

  <product-form>
    <!-- Add to cart form -->
  </product-form>
</product-info>
```

### Shopping Cart with Drawer

```html
<!-- Cart drawer + notification -->
<link rel="stylesheet" href="ui-library/components/cart-drawer/component-cart-drawer.css">
<link rel="stylesheet" href="ui-library/components/cart-notification/component-cart-notification.css">

<script src="ui-library/core/global.js" defer></script>
<script src="ui-library/components/cart-drawer/cart-drawer.js" defer></script>
<script src="ui-library/components/cart-notification/cart-notification.js" defer></script>

<!-- Cart drawer -->
<cart-drawer>
  <cart-drawer-items>
    <!-- Cart items list -->
  </cart-drawer-items>
</cart-drawer>

<!-- Success notification -->
<cart-notification>
  <div class="notification">
    Item added to cart!
  </div>
</cart-notification>
```

## Styling Components

### CSS Custom Properties

Many components support CSS variables:

```css
/* Customize cart drawer */
cart-drawer {
  --drawer-width: 400px;
  --drawer-background: #ffffff;
  --drawer-padding: 1rem;
}

/* Customize buttons */
.button {
  --button-background: #000;
  --button-color: #fff;
  --button-padding: 12px 24px;
}
```

### Override Styles

```css
/* Target component directly */
cart-drawer .drawer__header {
  background-color: #f5f5f5;
  border-bottom: 2px solid #000;
}

/* Use more specific selectors */
product-form .product-form__submit {
  background: linear-gradient(to right, #667eea, #764ba2);
}
```

## Adapting Liquid Templates

If not using Shopify/Liquid:

### Convert Asset URLs

**Liquid:**
```liquid
{{ 'cart-drawer.js' | asset_url | stylesheet_tag }}
```

**HTML:**
```html
<script src="/assets/cart-drawer.js" defer></script>
```

### Convert Logic

**Liquid:**
```liquid
{% for item in cart.items %}
  <div>{{ item.title }}</div>
{% endfor %}
```

**JavaScript:**
```javascript
cart.items.forEach(item => {
  element.innerHTML += `<div>${item.title}</div>`;
});
```

### Convert Filters

**Liquid:**
```liquid
{{ product.price | money }}
```

**JavaScript:**
```javascript
function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
```

## Troubleshooting

### Component Not Rendering

1. **Check console** for JavaScript errors
2. **Verify custom element** is registered:
   ```javascript
   console.log(customElements.get('cart-drawer'));
   ```
3. **Ensure scripts load** before element usage

### Styles Not Applied

1. **Check CSS path** is correct
2. **Verify CSS loads** before page render
3. **Check for CSS conflicts** with existing styles

### Events Not Firing

1. **Verify PubSub** is loaded:
   ```javascript
   console.log(typeof PubSub);
   ```
2. **Check event names** match exactly
3. **Subscribe before** publishing events

## Next Steps

1. **Browse COMPONENTS.md** for full component list
2. **Read README.md** for architecture details
3. **Explore component source** for advanced usage
4. **Check original Dawn theme** for examples

## Resources

- **Component Reference**: See `COMPONENTS.md`
- **Full Documentation**: See `README.md`
- **Shopify Dawn**: https://github.com/Shopify/dawn
- **Web Components**: https://developer.mozilla.org/en-US/docs/Web/Web_Components

---

Happy coding! 🚀
