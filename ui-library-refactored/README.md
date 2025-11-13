##Dawn UI Components - Refactored

# Dawn UI Components - React-like Web Components Library

A modern, self-contained UI component library with a React-like API, extracted and refactored from Shopify's Dawn theme. Each component contains its own markup, styles, and logic - no separate template files needed.

## 🚀 Key Features

- **Self-Contained Components**: All markup integrated directly into JavaScript
- **React-like Props API**: Pass data via HTML attributes like React props
- **Zero Dependencies**: Pure vanilla JavaScript, no frameworks required
- **Modern Web Components**: Built on native Custom Elements API
- **Type-Safe Props**: Automatic attribute parsing (strings, numbers, booleans, JSON)
- **Event-Driven**: Custom events for component communication
- **Accessible**: Built-in ARIA attributes and keyboard navigation
- **Lightweight**: ~50KB total for core + essential components

## 📦 Installation

### Option 1: Copy to Your Project

```bash
# Copy the entire library
cp -r ui-library-refactored /your-project/components
```

### Option 2: Use Individual Components

```bash
# Copy only what you need
cp ui-library-refactored/components/product-form.js /your-project/
cp ui-library-refactored/core/pubsub.js /your-project/
```

### Option 3: Import via CDN (if hosted)

```html
<script type="module">
  import ProductForm from './ui-library-refactored/components/product-form.js';
</script>
```

## 🎯 Quick Start

### 1. Include Core Files

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="ui-library-refactored/styles/base.css">
</head>
<body>
  <!-- Your content -->

  <!-- Core utilities (optional but recommended) -->
  <script src="ui-library-refactored/core/pubsub.js"></script>
  <script src="ui-library-refactored/core/constants.js"></script>
</body>
</html>
```

### 2. Use Components

```html
<!-- No separate template files needed! -->
<script type="module" src="ui-library-refactored/components/product-form.js"></script>

<product-form
  product-id="123456"
  variant-id="789012"
  button-text="Add to Cart"
  show-quantity="true">
</product-form>
```

That's it! The component renders itself with all markup included.

## 📚 Component Examples

### Share Button

```html
<script src="ui-library-refactored/components/share-button.js" type="module"></script>

<share-button
  url="https://example.com/product"
  title="Check out this product!"
  label="Share">
</share-button>
```

**Props:**
- `url` - URL to share (default: current page)
- `title` - Title for share (default: page title)
- `label` - Button text (default: "Share")
- `icon` - Custom SVG icon

**Events:**
- `share` - Fired when shared via native API
- `copy` - Fired when URL copied to clipboard

**Methods:**
```javascript
const shareBtn = document.querySelector('share-button');
shareBtn.updateUrl('https://new-url.com');
shareBtn.updateTitle('New Title');
```

---

### Quantity Input

```html
<script src="ui-library-refactored/components/quantity-input.js" type="module"></script>

<quantity-input
  value="1"
  min="1"
  max="10"
  step="1"
  name="quantity"
  label="Product quantity">
</quantity-input>
```

**Props:**
- `value` - Current quantity (default: 1)
- `min` - Minimum value (default: 1)
- `max` - Maximum value (default: null)
- `step` - Increment step (default: 1)
- `name` - Form input name
- `label` - Accessible label
- `disabled` - Disabled state

**Events:**
- `change` - Fired when value changes
- `input` - Fired during input

**Methods:**
```javascript
const qty = document.querySelector('quantity-input');
qty.setValue(5);
console.log(qty.getValue()); // 5
qty.increment();
qty.decrement();
qty.reset(); // Back to min value
```

---

### Modal Dialog

```html
<script src="ui-library-refactored/components/modal-dialog.js" type="module"></script>

<modal-dialog
  title="Confirm Action"
  size="small"
  closeable="true">
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <button onclick="this.closest('modal-dialog').close()">Cancel</button>
    <button class="button--primary">Confirm</button>
  </div>
</modal-dialog>
```

**Props:**
- `title` - Modal title
- `open` - Open state
- `size` - Modal size: small, medium, large (default: medium)
- `closeable` - Show close button (default: true)
- `close-on-overlay` - Close on overlay click (default: true)
- `close-on-escape` - Close on Escape key (default: true)

**Slots:**
- Default: Modal content
- `header`: Custom header
- `footer`: Custom footer

**Events:**
- `open` - Fired when opened
- `close` - Fired when closed
- `before-close` - Fired before close (cancellable)

**Methods:**
```javascript
const modal = document.querySelector('modal-dialog');
modal.open();
modal.close();
modal.toggle();
console.log(modal.isOpen); // true/false
```

---

### Product Form

```html
<script src="ui-library-refactored/components/product-form.js" type="module"></script>
<script src="ui-library-refactored/components/quantity-input.js" type="module"></script>

<product-form
  product-id="123456"
  variant-id="789012"
  ajax="true"
  button-text="Add to Cart"
  button-loading-text="Adding..."
  show-quantity="true">
</product-form>
```

**Props:**
- `product-id` - Product ID (required)
- `variant-id` - Variant ID (default: product-id)
- `action` - Form action URL (default: /cart/add)
- `ajax` - Use AJAX submission (default: true)
- `button-text` - Submit button text
- `button-loading-text` - Loading state text
- `show-quantity` - Show quantity selector (default: true)

**Events:**
- `submit` - Fired on form submit (cancellable)
- `success` - Fired on successful add
- `error` - Fired on error

**Methods:**
```javascript
const form = document.querySelector('product-form');
form.setVariant('987654');
form.setQuantity(3);
form.reset();
```

**Listen to events:**
```javascript
form.addEventListener('success', (e) => {
  console.log('Added to cart:', e.detail);
  // Show notification, update cart count, etc.
});

form.addEventListener('error', (e) => {
  console.error('Error:', e.detail.error);
});
```

## 🎨 Styling Components

All components use CSS classes that can be easily styled:

```css
/* Override default styles */
.product-form__submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 16px 32px;
  font-weight: 600;
}

.modal-dialog__content {
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.quantity-input {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
}
```

Components also support CSS custom properties:

```css
modal-dialog {
  --modal-overlay-bg: rgba(0, 0, 0, 0.75);
  --modal-max-width: 600px;
  --modal-border-radius: 12px;
}
```

## 🔧 Component Communication

### Using PubSub

```javascript
// Component publishes event
PubSub.publish('cart:updated', { itemCount: 3, total: 99.99 });

// Another component listens
PubSub.subscribe('cart:updated', (data) => {
  console.log('Cart updated:', data);
  updateCartIcon(data.itemCount);
});
```

### Using Custom Events

```javascript
// Component emits event
const productForm = document.querySelector('product-form');
productForm.addEventListener('success', (e) => {
  // Open cart drawer
  document.querySelector('cart-drawer')?.open();

  // Show notification
  const notification = document.querySelector('cart-notification');
  notification?.show(e.detail.product);
});
```

### Direct Component Methods

```javascript
// Call methods directly on components
const modal = document.querySelector('modal-dialog');
const quantity = document.querySelector('quantity-input');

// Open modal with dynamic content
modal.open();
modal.addEventListener('close', () => {
  quantity.reset();
});
```

## 🏗️ Building Your Own Components

Extend the base component class or create from scratch:

```javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  static get observedAttributes() {
    return ['initial-count', 'label'];
  }

  connectedCallback() {
    this.state.count = parseInt(this.getAttribute('initial-count')) || 0;
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const label = this.getAttribute('label') || 'Count';

    this.innerHTML = `
      <div class="my-component">
        <h3>${label}</h3>
        <p>Count: ${this.state.count}</p>
        <button data-action="increment">+</button>
        <button data-action="decrement">-</button>
      </div>
    `;

    // Attach event listeners
    this.querySelector('[data-action="increment"]').addEventListener('click', () => {
      this.state.count++;
      this.render();
    });

    this.querySelector('[data-action="decrement"]').addEventListener('click', () => {
      this.state.count--;
      this.render();
    });
  }
}

customElements.define('my-component', MyComponent);
```

**Usage:**
```html
<my-component initial-count="5" label="Click Counter"></my-component>
```

## 🎯 Advanced Patterns

### Dynamic Component Creation

```javascript
// Create components dynamically
const productForm = document.createElement('product-form');
productForm.setAttribute('product-id', '123456');
productForm.setAttribute('button-text', 'Buy Now');
document.body.appendChild(productForm);
```

### Conditional Rendering

```javascript
class ConditionalComponent extends HTMLElement {
  connectedCallback() {
    const isLoggedIn = this.getAttribute('logged-in') === 'true';

    this.innerHTML = isLoggedIn
      ? '<p>Welcome back!</p>'
      : '<a href="/login">Please log in</a>';
  }
}
```

### Component Composition

```html
<!-- Nest components -->
<modal-dialog title="Select Quantity">
  <product-form product-id="123">
    <quantity-input value="1" min="1" max="10"></quantity-input>
  </product-form>
</modal-dialog>
```

### Reactive Updates

```javascript
class ReactiveComponent extends HTMLElement {
  connectedCallback() {
    this.render();

    // Re-render when attributes change
    this.observer = new MutationObserver(() => this.render());
    this.observer.observe(this, { attributes: true });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  render() {
    // Render based on current attributes
  }
}
```

## 🌐 Framework Integration

### React

```jsx
import { useRef, useEffect } from 'react';

function ProductFormWrapper({ productId, onSuccess }) {
  const formRef = useRef();

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSuccess = (e) => onSuccess(e.detail);
    form.addEventListener('success', handleSuccess);

    return () => form.removeEventListener('success', handleSuccess);
  }, [onSuccess]);

  return (
    <product-form
      ref={formRef}
      product-id={productId}
      button-text="Add to Cart"
    />
  );
}
```

### Vue

```vue
<template>
  <product-form
    :product-id="productId"
    @success="handleSuccess"
  />
</template>

<script>
export default {
  props: ['productId'],
  methods: {
    handleSuccess(event) {
      console.log('Success:', event.detail);
    }
  }
}
</script>
```

### Svelte

```svelte
<script>
  let productId = '123456';

  function handleSuccess(event) {
    console.log('Success:', event.detail);
  }
</script>

<product-form
  product-id={productId}
  on:success={handleSuccess}
/>
```

## 📊 Component API Comparison

### Before (Liquid Templates)

```liquid
{% render 'share-button',
  block: block,
  share_link: share_url
%}
```

### After (React-like)

```html
<share-button
  url="{{ share_url }}"
  label="Share">
</share-button>
```

**Benefits:**
- ✅ No separate template files
- ✅ Works without Shopify/Liquid
- ✅ Props-like API
- ✅ Self-documenting
- ✅ Framework agnostic
- ✅ Better IDE support

## 🔍 Component Reference

| Component | Description | Status |
|-----------|-------------|--------|
| `share-button` | Social share with Web Share API | ✅ Refactored |
| `modal-dialog` | Accessible modal with slots | ✅ Refactored |
| `quantity-input` | Quantity selector with controls | ✅ Refactored |
| `product-form` | Add to cart with AJAX | ✅ Refactored |
| `cart-drawer` | Slide-out cart | 🔄 Coming soon |
| `predictive-search` | Auto-complete search | 🔄 Coming soon |
| `variant-selects` | Product variant picker | 🔄 Coming soon |

## 🚦 Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

**Required APIs:**
- Custom Elements v1
- ES6 Classes
- Template Literals
- Async/Await
- Fetch API

## 📝 License

Extracted from Shopify's Dawn theme. See original Dawn theme for license details.

## 🤝 Contributing

This is a refactored extraction. To contribute:
1. Follow the established component pattern
2. Include full markup in JavaScript
3. Use attribute-based props
4. Emit custom events for communication
5. Document props, events, and methods

## 📚 Additional Resources

- [Web Components Docs](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements v1](https://html.spec.whatwg.org/multipage/custom-elements.html)
- [Shopify Dawn Theme](https://github.com/Shopify/dawn)

---

**Built with ❤️ using Web Components**
