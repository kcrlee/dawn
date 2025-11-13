# Custom Elements Reference

Complete list of all custom HTML elements (web components) in this library.

## How to Read This Reference

- **Element Name**: The tag name used in HTML (e.g., `<cart-drawer>`)
- **Defined In**: The JavaScript file containing the class definition
- **Styles**: Associated CSS file(s)
- **Template**: Liquid markup file (if available)

---

## Elements from global.js

These components are defined in `core/global.js` and loaded globally:

### `<quantity-input>`
- **Class**: `QuantityInput`
- **Defined In**: `core/global.js`
- **Styles**: Included in base styles
- **Template**: `components/quantity-input/quantity-input.liquid`
- **Purpose**: Quantity selector with +/- buttons

### `<menu-drawer>`
- **Class**: `MenuDrawer`
- **Defined In**: `core/global.js`
- **Styles**: `components/menu-drawer/component-menu-drawer.css`
- **Purpose**: Mobile navigation drawer

### `<header-drawer>`
- **Class**: `HeaderDrawer`
- **Defined In**: `core/global.js`
- **Styles**: None (inherits from menu-drawer)
- **Template**: `components/header-drawer/header-drawer.liquid`
- **Purpose**: Header-specific drawer component

### `<modal-dialog>`
- **Class**: `ModalDialog`
- **Defined In**: `core/global.js`
- **Styles**: `components/modal-dialog/component-modal-video.css`
- **Purpose**: Reusable modal dialog overlay

### `<bulk-modal>`
- **Class**: `BulkModal`
- **Defined In**: `core/global.js`
- **Styles**: Inherits from modal-dialog
- **Purpose**: Modal for bulk operations

### `<modal-opener>`
- **Class**: `ModalOpener`
- **Defined In**: `core/global.js`
- **Purpose**: Button to trigger modal opening

### `<deferred-media>`
- **Class**: `DeferredMedia`
- **Defined In**: `core/global.js`
- **Styles**: `components/deferred-media/component-deferred-media.css`
- **Purpose**: Lazy-load images and videos

### `<slider-component>`
- **Class**: `SliderComponent`
- **Defined In**: `core/global.js`
- **Styles**: `components/slider/component-slider.css`
- **Purpose**: Content slider/carousel

### `<slideshow-component>`
- **Class**: `SlideshowComponent`
- **Defined In**: `core/global.js`
- **Styles**: `components/slideshow/component-slideshow.css`
- **Purpose**: Image slideshow with auto-play

### `<variant-selects>`
- **Class**: `VariantSelects`
- **Defined In**: `core/global.js`
- **Styles**: `components/variant-picker/component-product-variant-picker.css`
- **Template**: `components/variant-picker/product-variant-picker.liquid`
- **Purpose**: Product variant selection (size, color, etc.)

### `<product-recommendations>`
- **Class**: `ProductRecommendations`
- **Defined In**: `core/global.js`
- **Purpose**: Display related/recommended products

### `<account-icon>`
- **Class**: `AccountIcon`
- **Defined In**: `core/global.js`
- **Purpose**: User account icon with dynamic state

### `<bulk-add>`
- **Class**: `BulkAdd`
- **Defined In**: `core/global.js`
- **Purpose**: Bulk add multiple items to cart

---

## Cart & Checkout Elements

### `<cart-drawer>`
- **Class**: `CartDrawer`
- **Defined In**: `components/cart-drawer/cart-drawer.js`
- **Styles**: `components/cart-drawer/component-cart-drawer.css`
- **Template**: `components/cart-drawer/cart-drawer.liquid`
- **Purpose**: Slide-out shopping cart drawer
- **Methods**: `open()`, `close()`, `renderContents()`

### `<cart-drawer-items>`
- **Class**: `CartDrawerItems`
- **Defined In**: `components/cart-drawer/cart-drawer.js`
- **Purpose**: Cart items list within cart drawer

### `<cart-notification>`
- **Class**: `CartNotification`
- **Defined In**: `components/cart-notification/cart-notification.js`
- **Styles**: `components/cart-notification/component-cart-notification.css`
- **Template**: `components/cart-notification/cart-notification.liquid`
- **Purpose**: Toast notification when item added to cart

### `<cart-remove-button>`
- **Class**: `CartRemoveButton`
- **Defined In**: `components/cart/cart.js`
- **Purpose**: Remove item from cart button

### `<cart-items>`
- **Class**: `CartItems`
- **Defined In**: `components/cart/cart.js`
- **Styles**: `components/cart/component-cart-items.css`
- **Purpose**: Main cart items list

### `<cart-note>`
- **Class**: `CartNote`
- **Defined In**: `components/cart/cart.js`
- **Purpose**: Cart notes/special instructions (conditionally loaded)

### `<quick-add>`
- **Class**: `QuickAdd`
- **Defined In**: `components/quick-add/quick-add.js`
- **Styles**: `components/quick-add/quick-add.css`
- **Purpose**: Quick add to cart button on product cards

### `<quick-add-bulk>`
- **Class**: `QuickAddBulk`
- **Defined In**: `components/quick-add-bulk/quick-add-bulk.js`
- **Purpose**: Bulk quantity quick add

### `<quick-order-list>`
- **Class**: `QuickOrderList`
- **Defined In**: `components/quick-order-list/quick-order-list.js`
- **Styles**: `components/quick-order-list/quick-order-list.css`
- **Purpose**: Fast ordering interface for multiple products

### `<quick-order-list-remove-all-button>`
- **Class**: `QuickOrderListRemoveAllButton`
- **Defined In**: `components/quick-order-list/quick-order-list.js`
- **Purpose**: Clear all items from quick order list

### `<quantity-popover>`
- **Class**: `QuantityPopover`
- **Defined In**: `components/quantity-popover/quantity-popover.js`
- **Styles**: `components/quantity-popover/quantity-popover.css`
- **Purpose**: Popover quantity selector

---

## Product Elements

### `<product-form>`
- **Class**: `ProductForm`
- **Defined In**: `components/product-form/product-form.js`
- **Purpose**: Product add-to-cart form with AJAX submission

### `<product-info>`
- **Class**: `ProductInfo`
- **Defined In**: `components/product-info/product-info.js`
- **Purpose**: Product information display with dynamic updates

### `<product-modal>`
- **Class**: `ProductModal`
- **Defined In**: `components/product-modal/product-modal.js`
- **Template**: `components/product-modal/product-media-modal.liquid`
- **Purpose**: Product quick view/media modal

### `<product-model>`
- **Class**: `ProductModel`
- **Defined In**: `components/product-model/product-model.js`
- **Styles**: `components/product-model/component-product-model.css`
- **Purpose**: 3D product model viewer

### `<media-gallery>`
- **Class**: `MediaGallery`
- **Defined In**: `components/media-gallery/media-gallery.js`
- **Template**: `components/media-gallery/product-media-gallery.liquid`
- **Purpose**: Product image/video gallery with thumbnails

### `<price-per-item>`
- **Class**: `PricePerItem`
- **Defined In**: `components/price-per-item/price-per-item.js`
- **Styles**: `components/price-per-item/component-price.css`
- **Purpose**: Display unit price (e.g., "$5.00 per 100ml")

### `<recipient-form>`
- **Class**: `RecipientForm`
- **Defined In**: `components/recipient-form/recipient-form.js`
- **Template**: `components/recipient-form/gift-card-recipient-form.liquid`
- **Purpose**: Gift card recipient information form

---

## Search & Filter Elements

### `<main-search>`
- **Class**: `MainSearch`
- **Defined In**: `components/main-search/main-search.js`
- **Purpose**: Main search functionality

### `<search-form>`
- **Class**: `SearchForm`
- **Defined In**: `components/search-form/search-form.js`
- **Styles**: `components/search-form/component-search.css`
- **Purpose**: Search input form

### `<predictive-search>`
- **Class**: `PredictiveSearch`
- **Defined In**: `components/predictive-search/predictive-search.js`
- **Styles**: `components/predictive-search/component-predictive-search.css`
- **Purpose**: Auto-complete search results

### `<facet-filters-form>`
- **Class**: `FacetFiltersForm`
- **Defined In**: `components/facets/facets.js`
- **Styles**: `components/facets/component-facets.css`
- **Template**: `components/facets/facets.liquid`
- **Purpose**: Product filtering form

### `<price-range>`
- **Class**: `PriceRange`
- **Defined In**: `components/facets/facets.js`
- **Styles**: `components/facets/component-facets.css`
- **Purpose**: Price range filter slider

### `<facet-remove>`
- **Class**: `FacetRemove`
- **Defined In**: `components/facets/facets.js`
- **Purpose**: Remove active filter button

---

## UI Control Elements

### `<details-disclosure>`
- **Class**: `DetailsDisclosure`
- **Defined In**: `components/details-disclosure/details-disclosure.js`
- **Purpose**: Collapsible content using HTML `<details>` element

### `<header-menu>`
- **Class**: `HeaderMenu`
- **Defined In**: `components/details-disclosure/details-disclosure.js`
- **Purpose**: Header navigation menu (extends details-disclosure)

### `<details-modal>`
- **Class**: `DetailsModal`
- **Defined In**: `components/details-modal/details-modal.js`
- **Purpose**: Modal overlay using `<details>` element

### `<show-more>`
- **Class**: `ShowMore`
- **Defined In**: `components/show-more/show-more.js`
- **Styles**: `components/show-more/component-show-more.css`
- **Purpose**: Expand/collapse content button

### `<share>`
- **Class**: `Share`
- **Defined In**: `components/share/share.js`
- **Template**: `components/share/share-button.liquid`
- **Purpose**: Social media share button with Web Share API

---

## Other Elements

### `<localization-form>`
- **Class**: `LocalizationForm`
- **Defined In**: `components/localization-form/localization-form.js`
- **Styles**: `components/localization-form/component-localization-form.css`
- **Purpose**: Language/currency/country selector

### `<pickup-availability>`
- **Class**: `PickupAvailability`
- **Defined In**: `components/pickup-availability/pickup-availability.js`
- **Styles**: `components/pickup-availability/component-pickup-availability.css`
- **Purpose**: Store pickup availability information

### `<pickup-availability-drawer>`
- **Class**: `PickupAvailabilityDrawer`
- **Defined In**: `components/pickup-availability/pickup-availability.js`
- **Styles**: `components/pickup-availability/component-pickup-availability.css`
- **Purpose**: Drawer showing detailed pickup availability

### `<password-modal>`
- **Class**: `PasswordModal`
- **Defined In**: `components/password-modal/password-modal.js`
- **Purpose**: Password-protected page modal

---

## Quick Reference by Use Case

### Shopping Cart
- `<cart-drawer>`, `<cart-drawer-items>`
- `<cart-items>`, `<cart-remove-button>`, `<cart-note>`
- `<cart-notification>`

### Product Display
- `<product-info>`, `<product-form>`
- `<media-gallery>`, `<product-modal>`
- `<variant-selects>`, `<price-per-item>`
- `<product-model>`, `<product-recommendations>`

### Quick Shopping
- `<quick-add>`, `<quick-add-bulk>`
- `<quick-order-list>`, `<quick-order-list-remove-all-button>`
- `<quantity-input>`, `<quantity-popover>`

### Search
- `<main-search>`, `<search-form>`
- `<predictive-search>`

### Filtering
- `<facet-filters-form>`, `<price-range>`, `<facet-remove>`

### Navigation
- `<menu-drawer>`, `<header-drawer>`, `<header-menu>`

### UI Controls
- `<modal-dialog>`, `<details-modal>`, `<bulk-modal>`
- `<modal-opener>`
- `<details-disclosure>`, `<show-more>`
- `<slider-component>`, `<slideshow-component>`

### Media
- `<deferred-media>`
- `<media-gallery>`, `<product-model>`

### Utilities
- `<localization-form>`
- `<pickup-availability>`, `<pickup-availability-drawer>`
- `<share>`, `<recipient-form>`
- `<password-modal>`, `<account-icon>`

---

## Total Count

- **40+ Custom Elements** across 33 component directories
- **13 Elements** defined in `global.js` (loaded globally)
- **27 Elements** in individual component files

## Browser Support

All elements require:
- Custom Elements v1 API
- ES6+ JavaScript support
- Modern CSS support (flexbox, grid, custom properties)

For older browsers, include polyfills:
- `@webcomponents/custom-elements`
- Babel/transpilation for ES6+

---

For detailed usage examples, see `QUICKSTART.md` and `README.md`.
