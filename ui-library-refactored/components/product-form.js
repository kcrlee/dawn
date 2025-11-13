/**
 * ProductForm Component
 *
 * Handles product add-to-cart with AJAX submission, loading states, and error handling.
 *
 * Props:
 * @prop {string} product-id - Product ID
 * @prop {string} variant-id - Selected variant ID
 * @prop {string} action - Form action URL (default: '/cart/add')
 * @prop {boolean} ajax - Use AJAX submission (default: true)
 * @prop {string} button-text - Submit button text (default: 'Add to Cart')
 * @prop {string} button-loading-text - Loading state text (default: 'Adding...')
 * @prop {boolean} show-quantity - Show quantity selector (default: true)
 *
 * Events:
 * @event submit - Fired when form is submitted
 * @event success - Fired on successful add to cart
 * @event error - Fired on error
 *
 * Usage:
 * <product-form
 *   product-id="123456"
 *   variant-id="789012"
 *   button-text="Add to Cart">
 * </product-form>
 */

class ProductForm extends HTMLElement {
  constructor() {
    super();

    this.state = {
      loading: false,
      error: null,
      quantity: 1
    };
  }

  static get observedAttributes() {
    return ['product-id', 'variant-id', 'button-text', 'button-loading-text', 'show-quantity', 'ajax'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
      this.setupEventListeners();
    }
  }

  get productId() {
    return this.getAttribute('product-id');
  }

  get variantId() {
    return this.getAttribute('variant-id') || this.productId;
  }

  get action() {
    return this.getAttribute('action') || '/cart/add';
  }

  get useAjax() {
    return this.getAttribute('ajax') !== 'false';
  }

  get buttonText() {
    return this.getAttribute('button-text') || 'Add to Cart';
  }

  get buttonLoadingText() {
    return this.getAttribute('button-loading-text') || 'Adding...';
  }

  get showQuantity() {
    return this.getAttribute('show-quantity') !== 'false';
  }

  get cartIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1 1H3L3.4 3M3.4 3L5 11H13L15 3H3.4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="6" cy="14" r="1" fill="currentColor"/>
        <circle cx="12" cy="14" r="1" fill="currentColor"/>
      </svg>
    `;
  }

  get loadingSpinner() {
    return `
      <svg class="spinner" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.25" stroke-width="2"/>
        <path d="M15 8C15 4.13401 11.866 1 8 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  render() {
    this.innerHTML = `
      <form
        class="product-form ${this.state.loading ? 'is-loading' : ''}"
        data-product-form
        method="post"
        action="${this.action}">

        <input type="hidden" name="id" value="${this.variantId}" />

        ${this.state.error ? `
          <div class="product-form__error" role="alert">
            <p>${this.state.error}</p>
          </div>
        ` : ''}

        ${this.showQuantity ? `
          <div class="product-form__field">
            <label for="quantity-${this.productId}">Quantity</label>
            <quantity-input
              id="quantity-${this.productId}"
              name="quantity"
              value="${this.state.quantity}"
              min="1"
              data-quantity>
            </quantity-input>
          </div>
        ` : `
          <input type="hidden" name="quantity" value="1" />
        `}

        <button
          type="submit"
          class="product-form__submit button button--primary ${this.state.loading ? 'is-loading' : ''}"
          ${this.state.loading ? 'disabled' : ''}
          data-submit>
          <span class="button__icon">${this.state.loading ? this.loadingSpinner : this.cartIcon}</span>
          <span class="button__text">${this.state.loading ? this.buttonLoadingText : this.buttonText}</span>
        </button>
      </form>
    `;
  }

  setupEventListeners() {
    const form = this.querySelector('[data-product-form]');
    if (!form) return;

    // Form submission
    form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Quantity change
    const quantityInput = this.querySelector('[data-quantity]');
    if (quantityInput) {
      quantityInput.addEventListener('change', (e) => {
        this.state.quantity = e.detail.value;
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.state.loading) return;

    // Clear previous error
    this.state.error = null;

    // Set loading state
    this.state.loading = true;
    this.render();
    this.setupEventListeners();

    // Emit submit event
    const submitEvent = new CustomEvent('submit', {
      detail: {
        productId: this.productId,
        variantId: this.variantId,
        quantity: this.state.quantity
      },
      bubbles: true,
      cancelable: true
    });

    if (!this.dispatchEvent(submitEvent)) {
      this.state.loading = false;
      this.render();
      return; // Cancelled
    }

    try {
      if (this.useAjax) {
        await this.submitAjax();
      } else {
        e.target.submit();
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async submitAjax() {
    const formData = new FormData(this.querySelector('[data-product-form]'));

    const response = await fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText || 'Failed to add to cart');
    }

    const data = await response.json();

    // Set success state
    this.state.loading = false;
    this.render();
    this.setupEventListeners();

    // Emit success event
    this.dispatchEvent(new CustomEvent('success', {
      detail: {
        product: data,
        quantity: this.state.quantity
      },
      bubbles: true
    }));

    // Publish cart update event
    if (window.PubSub) {
      PubSub.publish('cart:item-added', {
        product: data,
        quantity: this.state.quantity
      });
    }
  }

  handleError(error) {
    this.state.loading = false;
    this.state.error = error.message || 'An error occurred. Please try again.';
    this.render();
    this.setupEventListeners();

    // Emit error event
    this.dispatchEvent(new CustomEvent('error', {
      detail: {
        error: error.message,
        productId: this.productId,
        variantId: this.variantId
      },
      bubbles: true
    }));
  }

  // Public API
  setVariant(variantId) {
    this.setAttribute('variant-id', variantId);
  }

  setQuantity(quantity) {
    this.state.quantity = quantity;
    const quantityInput = this.querySelector('[data-quantity]');
    if (quantityInput) {
      quantityInput.setAttribute('value', quantity);
    }
  }

  reset() {
    this.state = {
      loading: false,
      error: null,
      quantity: 1
    };
    this.render();
    this.setupEventListeners();
  }
}

// Register the custom element
if (!customElements.get('product-form')) {
  customElements.define('product-form', ProductForm);
}

export default ProductForm;
