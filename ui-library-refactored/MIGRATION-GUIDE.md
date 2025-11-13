# Migration Guide: From Liquid Templates to React-like Components

This guide helps you migrate from the original Liquid-based Dawn components to the new React-like, self-contained components.

## Overview of Changes

### Before (Original)
- **3 separate files** per component: `.js`, `.css`, `.liquid`
- Markup in Liquid templates
- Props via Liquid `render` tags
- Shopify-specific

### After (Refactored)
- **1 file** per component: `.js` (includes markup)
- Markup in JavaScript template literals
- Props via HTML attributes
- Framework-agnostic

## Component Comparison

### Share Button

#### Before (Liquid + JS)

**snippets/share-button.liquid:**
```liquid
{% render 'share-button',
  block: block,
  share_link: product.url,
  share_label: 'Share Product'
%}
```

**assets/share.js:**
```javascript
class ShareButton extends DetailsDisclosure {
  constructor() {
    super();
    // Logic only, no markup
  }
}
```

#### After (Self-Contained)

**components/share-button.js:**
```javascript
<share-button
  url="https://example.com/product"
  label="Share Product">
</share-button>
```

**All markup included in the component!**

---

### Product Form

#### Before (Liquid + JS)

**sections/product-form.liquid:**
```liquid
<form method="post" action="/cart/add">
  <input type="hidden" name="id" value="{{ product.selected_variant.id }}">

  {% render 'quantity-input',
    value: 1,
    min: 1
  %}

  <button type="submit">
    {{ 'products.product.add_to_cart' | t }}
  </button>
</form>

<script src="{{ 'product-form.js' | asset_url }}" defer></script>
```

**assets/product-form.js:**
```javascript
class ProductForm extends HTMLElement {
  // Logic only
}
```

#### After (Self-Contained)

```javascript
<product-form
  product-id="123456"
  variant-id="789012"
  button-text="Add to Cart"
  show-quantity="true">
</product-form>
```

**Complete with form markup, quantity input, button - all in one component!**

---

### Modal Dialog

#### Before (Liquid + JS)

**snippets/modal.liquid:**
```liquid
<details>
  <summary>{{ title }}</summary>
  <div class="modal-content">
    {{ content }}
  </div>
</details>

<script src="{{ 'details-modal.js' | asset_url }}" defer></script>
```

#### After (Self-Contained)

```html
<modal-dialog title="Welcome" size="medium">
  <p>Your content here</p>
  <div slot="footer">
    <button>Close</button>
  </div>
</modal-dialog>
```

**No separate template files needed!**

---

## Migration Steps

### Step 1: Install Refactored Library

```bash
# Option A: Copy entire library
cp -r ui-library-refactored /your-project/

# Option B: Copy specific components
cp ui-library-refactored/components/product-form.js /your-project/
```

### Step 2: Update HTML

Replace Liquid `{% render %}` tags with HTML custom elements:

**Before:**
```liquid
{% render 'share-button',
  share_link: product.url,
  share_label: 'Share this product'
%}
```

**After:**
```html
<share-button
  url="{{ product.url }}"
  label="Share this product">
</share-button>
```

### Step 3: Include Components

**Before:**
```liquid
<script src="{{ 'share.js' | asset_url }}" defer></script>
```

**After:**
```html
<script type="module" src="components/share-button.js"></script>
```

### Step 4: Update Event Listeners

**Before:**
```javascript
// Events were component-specific
document.querySelector('.share-button__copy').addEventListener('click', ...);
```

**After:**
```javascript
// Use custom events
document.querySelector('share-button').addEventListener('copy', (e) => {
  console.log('URL copied:', e.detail.url);
});
```

### Step 5: Update CSS (Optional)

CSS class names remain similar, so most styles work without changes:

```css
/* Before */
.share-button__button { ... }

/* After - same classes! */
.share-button__button { ... }
```

---

## API Comparison

### Passing Props

#### Before (Liquid)
```liquid
{% render 'component',
  prop1: value1,
  prop2: value2
%}
```

#### After (HTML Attributes)
```html
<my-component
  prop1="value1"
  prop2="value2">
</my-component>
```

### Dynamic Props

#### Before (Liquid)
```liquid
{% render 'product-form',
  product: product,
  variant: product.selected_variant
%}
```

#### After (JavaScript)
```javascript
const form = document.createElement('product-form');
form.setAttribute('product-id', product.id);
form.setAttribute('variant-id', variant.id);
document.body.appendChild(form);
```

### Conditional Rendering

#### Before (Liquid)
```liquid
{% if cart.item_count > 0 %}
  {% render 'cart-drawer' %}
{% endif %}
```

#### After (JavaScript)
```javascript
if (cart.itemCount > 0) {
  const drawer = document.createElement('cart-drawer');
  drawer.setAttribute('item-count', cart.itemCount);
  document.body.appendChild(drawer);
}
```

### Loops

#### Before (Liquid)
```liquid
{% for item in cart.items %}
  {% render 'cart-item', item: item %}
{% endfor %}
```

#### After (JavaScript)
```javascript
cart.items.forEach(item => {
  const cartItem = document.createElement('cart-item');
  cartItem.setAttribute('item-id', item.id);
  cartItem.setAttribute('title', item.title);
  cartItem.setAttribute('price', item.price);
  cartContainer.appendChild(cartItem);
});
```

---

## Feature Parity

| Feature | Liquid Version | React-like Version |
|---------|---------------|-------------------|
| **File Count** | 3 files (JS, CSS, Liquid) | 1 file (JS with markup) |
| **Props** | Liquid variables | HTML attributes |
| **Events** | DOM events | Custom events |
| **State** | Manual DOM manipulation | Render on change |
| **Nesting** | Liquid includes | HTML composition |
| **Dynamic Content** | Server-side | Client-side |
| **Type Safety** | None | Attribute parsing |
| **IDE Support** | Limited | Full autocomplete |
| **Shopify Required** | Yes | No |
| **Bundle Size** | ~Same | ~Same |

---

## Common Patterns

### Pattern 1: Form with Validation

**Before:**
```liquid
<!-- snippets/product-form.liquid -->
<form>
  <!-- Complex markup -->
</form>

<script src="{{ 'product-form.js' | asset_url }}"></script>
```

**After:**
```html
<product-form
  product-id="123"
  variant-id="456"
  ajax="true">
</product-form>

<script>
  document.querySelector('product-form')
    .addEventListener('success', handleSuccess);
</script>
```

### Pattern 2: Modal with Dynamic Content

**Before:**
```liquid
{% capture modal_content %}
  {{ product.description }}
{% endcapture %}

{% render 'modal', content: modal_content %}
```

**After:**
```html
<modal-dialog id="product-modal" title="Product Details">
  {{ product.description }}
</modal-dialog>

<button onclick="document.getElementById('product-modal').open()">
  View Details
</button>
```

### Pattern 3: Quantity Input

**Before:**
```liquid
{% render 'quantity-input',
  id: 'quantity',
  value: item.quantity,
  min: 1,
  max: 10
%}
```

**After:**
```html
<quantity-input
  id="quantity"
  value="1"
  min="1"
  max="10"
  name="quantity">
</quantity-input>
```

---

## Data Type Handling

### Strings
```html
<!-- Simple -->
<my-component title="Hello World"></my-component>

<!-- With variables -->
<my-component title="${product.title}"></my-component>
```

### Numbers
```html
<!-- Automatic parsing -->
<quantity-input value="5" min="1" max="10"></quantity-input>
```

### Booleans
```html
<!-- true -->
<modal-dialog closeable="true"></modal-dialog>

<!-- false -->
<modal-dialog closeable="false"></modal-dialog>

<!-- Presence = true -->
<modal-dialog open></modal-dialog>
```

### Arrays/Objects
```html
<!-- JSON parsing -->
<my-component data='{"key": "value", "items": [1, 2, 3]}'></my-component>
```

---

## JavaScript API

### Before: Direct DOM Manipulation
```javascript
class CartDrawer extends HTMLElement {
  open() {
    this.classList.add('active');
    document.body.classList.add('overflow-hidden');
  }
}
```

### After: Props + Render
```javascript
class CartDrawer extends HTMLElement {
  open() {
    this.setAttribute('open', ''); // Triggers re-render
    this.dispatchEvent(new CustomEvent('open'));
  }
}
```

---

## Breaking Changes

### 1. No More Liquid Filters
```liquid
<!-- Before -->
{{ product.price | money }}

<!-- After: Use JavaScript -->
<script>
  function formatMoney(cents) {
    return `$${(cents / 100).toFixed(2)}`;
  }
</script>
```

### 2. Server Data Must Be Passed as Props
```liquid
<!-- Before: Direct access -->
{{ product.title }}

<!-- After: Pass as prop -->
<product-card title="{{ product.title }}"></product-card>
```

### 3. No Translation Filters
```liquid
<!-- Before -->
{{ 'products.add_to_cart' | t }}

<!-- After: Pass translations as props -->
<product-form button-text="{{ 'products.add_to_cart' | t }}">
</product-form>
```

---

## Benefits of Refactored Version

### ✅ Pros
- **Self-contained**: One file per component
- **Portable**: Works anywhere, not just Shopify
- **Type-safe**: Attributes are parsed correctly
- **Developer-friendly**: Better IDE support
- **Testable**: Easier to unit test
- **Modern**: Uses latest web standards
- **React-like**: Familiar API for React developers

### ⚠️ Considerations
- No server-side rendering (client-side only)
- Initial render happens in JavaScript
- Need to pass data as attributes
- More JavaScript in bundle

---

## Gradual Migration Strategy

You can migrate incrementally:

### Phase 1: Side by Side
Keep both versions:
```liquid
<!-- Old version -->
{% render 'old-component' %}

<!-- New version -->
<new-component></new-component>
```

### Phase 2: Feature Flag
```liquid
{% if settings.use_new_components %}
  <new-component></new-component>
{% else %}
  {% render 'old-component' %}
{% endif %}
```

### Phase 3: Full Migration
Replace all instances with new components.

---

## Troubleshooting

### Issue: Component not rendering
**Solution:** Check that script is loaded:
```html
<script type="module" src="path/to/component.js"></script>
```

### Issue: Props not working
**Solution:** Use kebab-case attributes:
```html
<!-- Wrong -->
<my-component productId="123"></my-component>

<!-- Correct -->
<my-component product-id="123"></my-component>
```

### Issue: Events not firing
**Solution:** Use custom events:
```javascript
// Wrong
element.onclick = ...

// Correct
element.addEventListener('click', ...)
```

---

## Need Help?

- Check the [README.md](README.md) for full documentation
- See [examples/](examples/) for working demos
- Review individual component files for JSDoc comments

---

**Ready to migrate? Start with simple components like `share-button` or `quantity-input`, then move to more complex ones!**
