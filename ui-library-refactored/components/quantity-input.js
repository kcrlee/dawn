/**
 * QuantityInput Component
 *
 * A quantity input control with increment/decrement buttons.
 *
 * Props:
 * @prop {number} value - Current quantity value (default: 1)
 * @prop {number} min - Minimum value (default: 1)
 * @prop {number} max - Maximum value (default: null)
 * @prop {number} step - Step increment (default: 1)
 * @prop {string} name - Input name attribute
 * @prop {boolean} disabled - Disabled state
 * @prop {string} label - Accessible label
 *
 * Events:
 * @event change - Fired when value changes
 * @event input - Fired during value input
 *
 * Usage:
 * <quantity-input
 *   value="1"
 *   min="1"
 *   max="10"
 *   step="1"
 *   name="quantity"
 *   label="Product quantity">
 * </quantity-input>
 */

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this._value = 1;
  }

  static get observedAttributes() {
    return ['value', 'min', 'max', 'step', 'disabled', 'name', 'label'];
  }

  connectedCallback() {
    this._value = this.value;
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isConnected) return;

    if (name === 'value') {
      this._value = this.value;
    }

    this.render();
    this.setupEventListeners();
  }

  get value() {
    const val = parseInt(this.getAttribute('value')) || 1;
    return Math.max(this.min, Math.min(this.max || Infinity, val));
  }

  set value(val) {
    const newValue = Math.max(this.min, Math.min(this.max || Infinity, parseInt(val) || 1));
    this.setAttribute('value', newValue.toString());
    this._value = newValue;
  }

  get min() {
    return parseInt(this.getAttribute('min')) || 1;
  }

  get max() {
    const maxAttr = this.getAttribute('max');
    return maxAttr ? parseInt(maxAttr) : null;
  }

  get step() {
    return parseInt(this.getAttribute('step')) || 1;
  }

  get name() {
    return this.getAttribute('name') || 'quantity';
  }

  get label() {
    return this.getAttribute('label') || 'Quantity';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get minusIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" fill="none">
        <path d="M1 1H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  get plusIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 1V9M1 5H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  render() {
    const canDecrement = this._value > this.min;
    const canIncrement = this.max === null || this._value < this.max;

    this.innerHTML = `
      <div class="quantity-input ${this.disabled ? 'is-disabled' : ''}">
        <button
          type="button"
          class="quantity-input__button quantity-input__button--minus"
          data-action="decrement"
          aria-label="Decrease ${this.label}"
          ${!canDecrement || this.disabled ? 'disabled' : ''}>
          <span class="svg-wrapper">${this.minusIcon}</span>
        </button>

        <input
          type="number"
          class="quantity-input__input"
          name="${this.name}"
          value="${this._value}"
          min="${this.min}"
          ${this.max !== null ? `max="${this.max}"` : ''}
          step="${this.step}"
          aria-label="${this.label}"
          ${this.disabled ? 'disabled' : ''}
          data-input
        />

        <button
          type="button"
          class="quantity-input__button quantity-input__button--plus"
          data-action="increment"
          aria-label="Increase ${this.label}"
          ${!canIncrement || this.disabled ? 'disabled' : ''}>
          <span class="svg-wrapper">${this.plusIcon}</span>
        </button>
      </div>
    `;
  }

  setupEventListeners() {
    // Decrement button
    const minusBtn = this.querySelector('[data-action="decrement"]');
    if (minusBtn) {
      minusBtn.addEventListener('click', () => this.decrement());
    }

    // Increment button
    const plusBtn = this.querySelector('[data-action="increment"]');
    if (plusBtn) {
      plusBtn.addEventListener('click', () => this.increment());
    }

    // Input change
    const input = this.querySelector('[data-input]');
    if (input) {
      input.addEventListener('input', (e) => {
        const newValue = parseInt(e.target.value) || this.min;
        this.updateValue(newValue, 'input');
      });

      input.addEventListener('change', (e) => {
        const newValue = parseInt(e.target.value) || this.min;
        this.updateValue(newValue, 'change');
      });

      input.addEventListener('blur', () => {
        // Ensure value is valid on blur
        if (this._value < this.min) {
          this.updateValue(this.min);
        } else if (this.max && this._value > this.max) {
          this.updateValue(this.max);
        }
      });
    }
  }

  increment() {
    if (this.disabled) return;
    const newValue = this._value + this.step;
    if (this.max === null || newValue <= this.max) {
      this.updateValue(newValue);
    }
  }

  decrement() {
    if (this.disabled) return;
    const newValue = this._value - this.step;
    if (newValue >= this.min) {
      this.updateValue(newValue);
    }
  }

  updateValue(newValue, eventType = 'change') {
    const oldValue = this._value;
    this._value = Math.max(this.min, Math.min(this.max || Infinity, newValue));

    // Update attribute
    this.setAttribute('value', this._value.toString());

    // Update input value if different
    const input = this.querySelector('[data-input]');
    if (input && parseInt(input.value) !== this._value) {
      input.value = this._value;
    }

    // Update button states
    const minusBtn = this.querySelector('[data-action="decrement"]');
    const plusBtn = this.querySelector('[data-action="increment"]');

    if (minusBtn) {
      minusBtn.disabled = this._value <= this.min || this.disabled;
    }

    if (plusBtn) {
      plusBtn.disabled = (this.max !== null && this._value >= this.max) || this.disabled;
    }

    // Emit event if value changed
    if (oldValue !== this._value) {
      this.dispatchEvent(new CustomEvent(eventType, {
        detail: {
          value: this._value,
          oldValue: oldValue,
          min: this.min,
          max: this.max
        },
        bubbles: true
      }));
    }
  }

  // Public API
  getValue() {
    return this._value;
  }

  setValue(value) {
    this.value = value;
  }

  reset() {
    this.value = this.min;
  }
}

// Register the custom element
if (!customElements.get('quantity-input')) {
  customElements.define('quantity-input', QuantityInput);
}

export default QuantityInput;
