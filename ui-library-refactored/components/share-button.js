/**
 * ShareButton Component
 *
 * A social share button with Web Share API support and fallback to clipboard copy.
 *
 * Props:
 * @prop {string} url - URL to share (default: current page URL)
 * @prop {string} title - Title to share (default: page title)
 * @prop {string} label - Button label (default: "Share")
 * @prop {string} icon - Icon to display (SVG string or name)
 * @prop {string} id - Unique identifier
 *
 * Events:
 * @event share - Fired when share is initiated
 * @event copy - Fired when URL is copied to clipboard
 *
 * Usage:
 * <share-button
 *   url="https://example.com/product"
 *   label="Share this product"
 *   id="share-product-123">
 * </share-button>
 */

class ShareButton extends HTMLElement {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      copied: false,
      supportsWebShare: !!navigator.share
    };
  }

  static get observedAttributes() {
    return ['url', 'title', 'label', 'icon'];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  get url() {
    return this.getAttribute('url') || window.location.href;
  }

  get title() {
    return this.getAttribute('title') || document.title;
  }

  get label() {
    return this.getAttribute('label') || 'Share';
  }

  get componentId() {
    return this.getAttribute('id') || `share-${Math.random().toString(36).substr(2, 9)}`;
  }

  get shareIcon() {
    return this.getAttribute('icon') || `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
        <path d="M10.1 6.73334L10.1 10.8667C10.1 11.0434 10.0298 11.2129 9.90482 11.3379C9.77984 11.4629 9.61043 11.5333 9.43332 11.5333L1.89998 11.5333C1.72288 11.5333 1.55346 11.4629 1.42849 11.3379C1.30351 11.2129 1.23332 11.0434 1.23332 10.8667L1.23332 3.33334C1.23332 3.15623 1.30351 2.98682 1.42849 2.86184C1.55346 2.73687 1.72288 2.66668 1.89998 2.66668L6.03332 2.66668" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.16675 1H11.7667V4.6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.36665 6.06668L11.6333 0.333344" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  get closeIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  get copyIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M9.5 1.5H11.5C11.8978 1.5 12.2794 1.65804 12.5607 1.93934C12.842 2.22064 13 2.60218 13 3V11C13 11.3978 12.842 11.7794 12.5607 12.0607C12.2794 12.342 11.8978 12.5 11.5 12.5H3.5C3.10218 12.5 2.72064 12.342 2.43934 12.0607C2.15804 11.7794 2 11.3978 2 11V9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="0.5" y="0.5" width="9" height="9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  render() {
    if (this.state.supportsWebShare) {
      this.innerHTML = `
        <button class="share-button__button" type="button" data-action="native-share">
          <span class="svg-wrapper">${this.shareIcon}</span>
          <span class="share-button__label">${this.label}</span>
        </button>
      `;
    } else {
      this.innerHTML = `
        <details class="share-button__details" ${this.state.isOpen ? 'open' : ''}>
          <summary class="share-button__button">
            <span class="svg-wrapper">${this.shareIcon}</span>
            <span class="share-button__label">${this.label}</span>
          </summary>
          <div class="share-button__fallback">
            <div class="field">
              <span class="share-button__message ${this.state.copied ? '' : 'hidden'}" role="status">
                ${this.state.copied ? 'Link copied!' : ''}
              </span>
              <input
                type="text"
                class="field__input share-button__input"
                id="share-url-${this.componentId}"
                value="${this.url}"
                readonly
                onclick="this.select();"
              />
              <label class="field__label" for="share-url-${this.componentId}">
                Share URL
              </label>
            </div>
            <button
              class="share-button__close ${this.state.copied ? '' : 'hidden'}"
              type="button"
              data-action="close">
              <span class="svg-wrapper">${this.closeIcon}</span>
              <span class="visually-hidden">Close</span>
            </button>
            <button
              class="share-button__copy"
              type="button"
              data-action="copy">
              <span class="svg-wrapper">${this.copyIcon}</span>
              <span class="visually-hidden">Copy to clipboard</span>
            </button>
          </div>
        </details>
      `;
    }
  }

  attachEventListeners() {
    // Remove old listeners by cloning
    const newElement = this.cloneNode(false);
    newElement.innerHTML = this.innerHTML;
    this.parentNode?.replaceChild(newElement, this);

    // Native share button
    const nativeShareBtn = this.querySelector('[data-action="native-share"]');
    if (nativeShareBtn) {
      nativeShareBtn.addEventListener('click', () => this.handleNativeShare());
    }

    // Copy button
    const copyBtn = this.querySelector('[data-action="copy"]');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.handleCopy());
    }

    // Close button
    const closeBtn = this.querySelector('[data-action="close"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.handleClose());
    }

    // Details toggle
    const details = this.querySelector('details');
    if (details) {
      details.addEventListener('toggle', (e) => {
        this.state.isOpen = e.target.open;
        if (!e.target.open) {
          this.state.copied = false;
          this.render();
        }
      });
    }
  }

  async handleNativeShare() {
    try {
      await navigator.share({
        url: this.url,
        title: this.title
      });

      this.dispatchEvent(new CustomEvent('share', {
        detail: { url: this.url, title: this.title },
        bubbles: true
      }));
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  }

  async handleCopy() {
    try {
      await navigator.clipboard.writeText(this.url);
      this.state.copied = true;
      this.render();
      this.attachEventListeners();

      // Focus close button
      this.querySelector('[data-action="close"]')?.focus();

      this.dispatchEvent(new CustomEvent('copy', {
        detail: { url: this.url },
        bubbles: true
      }));

      // Reset copied state after 3 seconds
      setTimeout(() => {
        this.state.copied = false;
        this.render();
        this.attachEventListeners();
      }, 3000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }

  handleClose() {
    const details = this.querySelector('details');
    if (details) {
      details.open = false;
      this.state.isOpen = false;
      this.state.copied = false;
      this.render();
      this.attachEventListeners();
    }
  }

  // Public API
  updateUrl(newUrl) {
    this.setAttribute('url', newUrl);
  }

  updateTitle(newTitle) {
    this.setAttribute('title', newTitle);
  }
}

// Register the custom element
if (!customElements.get('share-button')) {
  customElements.define('share-button', ShareButton);
}

export default ShareButton;
