/**
 * ModalDialog Component
 *
 * A flexible modal dialog with accessibility features and animations.
 *
 * Props:
 * @prop {string} title - Modal title
 * @prop {boolean} open - Open state
 * @prop {string} size - Modal size: 'small', 'medium', 'large' (default: 'medium')
 * @prop {boolean} closeable - Show close button (default: true)
 * @prop {boolean} close-on-overlay - Close when clicking overlay (default: true)
 * @prop {boolean} close-on-escape - Close on Escape key (default: true)
 *
 * Slots:
 * - Default slot: Modal content
 * - "header": Custom header content
 * - "footer": Custom footer content
 *
 * Events:
 * @event open - Fired when modal opens
 * @event close - Fired when modal closes
 * @event before-close - Fired before modal closes (cancellable)
 *
 * Usage:
 * <modal-dialog title="Confirm Action" size="small">
 *   <p>Are you sure you want to proceed?</p>
 *   <div slot="footer">
 *     <button>Cancel</button>
 *     <button>Confirm</button>
 *   </div>
 * </modal-dialog>
 */

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this._isOpen = false;
    this._previousFocus = null;
  }

  static get observedAttributes() {
    return ['open', 'title', 'size', 'closeable', 'close-on-overlay', 'close-on-escape'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();

    // Check if should be open on mount
    if (this.hasAttribute('open')) {
      this.open();
    }
  }

  disconnectedCallback() {
    this.cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isConnected) return;

    if (name === 'open') {
      if (newValue !== null) {
        this.open();
      } else {
        this.close();
      }
    } else {
      this.render();
    }
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  get isCloseable() {
    return this.getAttribute('closeable') !== 'false';
  }

  get closeOnOverlay() {
    return this.getAttribute('close-on-overlay') !== 'false';
  }

  get closeOnEscape() {
    return this.getAttribute('close-on-escape') !== 'false';
  }

  get closeIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  render() {
    // Store existing content
    const existingContent = this.querySelector('[data-modal-content]');
    const contentHTML = existingContent ? existingContent.innerHTML : this.innerHTML;

    this.innerHTML = `
      <div class="modal-dialog ${this._isOpen ? 'is-open' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title-${this._getUniqueId()}">
        <div class="modal-dialog__overlay" data-modal-overlay></div>
        <div class="modal-dialog__content modal-dialog__content--${this.size}">
          <div class="modal-dialog__header">
            ${this.querySelector('[slot="header"]')?.outerHTML || `
              <h2 class="modal-dialog__title" id="modal-title-${this._getUniqueId()}">${this.title}</h2>
            `}
            ${this.isCloseable ? `
              <button
                type="button"
                class="modal-dialog__close"
                data-modal-close
                aria-label="Close modal">
                <span class="svg-wrapper">${this.closeIcon}</span>
              </button>
            ` : ''}
          </div>
          <div class="modal-dialog__body" data-modal-content>
            ${contentHTML}
          </div>
          ${this.querySelector('[slot="footer"]') ? `
            <div class="modal-dialog__footer">
              ${this.querySelector('[slot="footer"]').innerHTML}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Close button
    const closeBtn = this.querySelector('[data-modal-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // Overlay click
    const overlay = this.querySelector('[data-modal-overlay]');
    if (overlay && this.closeOnOverlay) {
      overlay.addEventListener('click', () => this.close());
    }

    // Escape key
    if (this.closeOnEscape) {
      this._escapeHandler = (e) => {
        if (e.key === 'Escape' && this._isOpen) {
          this.close();
        }
      };
      document.addEventListener('keydown', this._escapeHandler);
    }
  }

  cleanup() {
    if (this._escapeHandler) {
      document.removeEventListener('keydown', this._escapeHandler);
    }
    if (this._isOpen) {
      this._restoreFocus();
      document.body.classList.remove('modal-open');
    }
  }

  open() {
    if (this._isOpen) return;

    // Store current focus
    this._previousFocus = document.activeElement;

    // Set state
    this._isOpen = true;
    this.setAttribute('open', '');

    // Update UI
    const modal = this.querySelector('.modal-dialog');
    if (modal) {
      modal.classList.add('is-open');
    }

    // Prevent body scroll
    document.body.classList.add('modal-open');

    // Trap focus
    this._trapFocus();

    // Emit event
    this.dispatchEvent(new CustomEvent('open', {
      bubbles: true,
      detail: { modal: this }
    }));

    // Focus first focusable element
    requestAnimationFrame(() => {
      const firstFocusable = this.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    });
  }

  close() {
    if (!this._isOpen) return;

    // Fire before-close event (cancellable)
    const beforeCloseEvent = new CustomEvent('before-close', {
      bubbles: true,
      cancelable: true,
      detail: { modal: this }
    });

    if (!this.dispatchEvent(beforeCloseEvent)) {
      return; // Cancelled
    }

    // Set state
    this._isOpen = false;
    this.removeAttribute('open');

    // Update UI
    const modal = this.querySelector('.modal-dialog');
    if (modal) {
      modal.classList.remove('is-open');
    }

    // Restore body scroll
    document.body.classList.remove('modal-open');

    // Restore focus
    this._restoreFocus();

    // Emit event
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      detail: { modal: this }
    }));
  }

  toggle() {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  _trapFocus() {
    const focusableElements = this.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this._focusTrapHandler = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    this.addEventListener('keydown', this._focusTrapHandler);
  }

  _restoreFocus() {
    if (this._previousFocus && typeof this._previousFocus.focus === 'function') {
      this._previousFocus.focus();
    }
    this._previousFocus = null;

    if (this._focusTrapHandler) {
      this.removeEventListener('keydown', this._focusTrapHandler);
      this._focusTrapHandler = null;
    }
  }

  _getUniqueId() {
    if (!this._uniqueId) {
      this._uniqueId = `modal-${Math.random().toString(36).substr(2, 9)}`;
    }
    return this._uniqueId;
  }

  // Public API
  get isOpen() {
    return this._isOpen;
  }
}

// Register the custom element
if (!customElements.get('modal-dialog')) {
  customElements.define('modal-dialog', ModalDialog);
}

export default ModalDialog;
