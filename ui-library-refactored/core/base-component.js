/**
 * BaseComponent - Foundation class for React-like Web Components
 *
 * Provides:
 * - Props system via attributes
 * - Template rendering
 * - Lifecycle hooks
 * - State management
 */

class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this._props = {};
    this._state = {};
    this._mounted = false;
  }

  /**
   * Observed attributes that trigger attributeChangedCallback
   * Override in child classes
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * Component lifecycle: Called when element is added to DOM
   */
  connectedCallback() {
    if (!this._mounted) {
      this._initializeProps();
      this._mounted = true;

      // Render if template exists and innerHTML is empty
      if (this.template && !this.innerHTML.trim()) {
        this.render();
      }

      // Call child class mount hook
      if (this.onMount) {
        this.onMount();
      }
    }
  }

  /**
   * Component lifecycle: Called when element is removed from DOM
   */
  disconnectedCallback() {
    if (this.onUnmount) {
      this.onUnmount();
    }
  }

  /**
   * Component lifecycle: Called when an observed attribute changes
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    this._props[this._camelCase(name)] = this._parseAttributeValue(newValue);

    if (this._mounted && this.onPropsChange) {
      this.onPropsChange(name, oldValue, newValue);
    }

    // Auto re-render if autoRender is enabled
    if (this._mounted && this.autoRender !== false) {
      this.render();
    }
  }

  /**
   * Initialize props from attributes
   */
  _initializeProps() {
    Array.from(this.attributes).forEach(attr => {
      this._props[this._camelCase(attr.name)] = this._parseAttributeValue(attr.value);
    });
  }

  /**
   * Parse attribute value (handle JSON, booleans, numbers)
   */
  _parseAttributeValue(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (value === 'undefined') return undefined;
    if (!isNaN(value) && value !== '') return Number(value);

    // Try to parse as JSON
    if ((value.startsWith('{') && value.endsWith('}')) ||
        (value.startsWith('[') && value.endsWith(']'))) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }

    return value;
  }

  /**
   * Convert kebab-case to camelCase
   */
  _camelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  /**
   * Get prop value
   */
  prop(name, defaultValue) {
    return this._props[name] !== undefined ? this._props[name] : defaultValue;
  }

  /**
   * Set prop value (also updates attribute)
   */
  setProp(name, value) {
    const attrName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    this.setAttribute(attrName, typeof value === 'object' ? JSON.stringify(value) : value);
  }

  /**
   * Get all props
   */
  get props() {
    return { ...this._props };
  }

  /**
   * Get state value
   */
  state(key, defaultValue) {
    return this._state[key] !== undefined ? this._state[key] : defaultValue;
  }

  /**
   * Set state value and optionally re-render
   */
  setState(updates, shouldRender = true) {
    this._state = { ...this._state, ...updates };

    if (shouldRender && this.autoRender !== false) {
      this.render();
    }

    if (this.onStateChange) {
      this.onStateChange(updates);
    }
  }

  /**
   * Render the component
   */
  render() {
    if (!this.template) return;

    const html = typeof this.template === 'function'
      ? this.template(this.props, this._state)
      : this.template;

    // Only update if content has changed
    if (this._lastRendered !== html) {
      this.innerHTML = html;
      this._lastRendered = html;

      if (this.onRender) {
        this.onRender();
      }
    }
  }

  /**
   * Query selector shorthand
   */
  $(selector) {
    return this.querySelector(selector);
  }

  /**
   * Query selector all shorthand
   */
  $$(selector) {
    return Array.from(this.querySelectorAll(selector));
  }

  /**
   * Emit custom event
   */
  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Template to render (override in child classes)
   * Can be a string or function that returns a string
   */
  get template() {
    return null;
  }

  /**
   * Lifecycle hooks (override in child classes):
   * - onMount(): Called when component is mounted
   * - onUnmount(): Called when component is unmounted
   * - onPropsChange(name, oldValue, newValue): Called when props change
   * - onStateChange(updates): Called when state changes
   * - onRender(): Called after render
   */
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BaseComponent;
}
