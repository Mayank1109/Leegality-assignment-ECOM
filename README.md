# E-commerce Product Browser

A small React application for browsing products, filtering the listing, and viewing product details. Product and category data come from the [DummyJSON API](https://dummyjson.com/).

## Setup

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

### Other commands

```bash
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

The app needs an internet connection to retrieve product and category data from DummyJSON.

## Assumptions

- DummyJSON is the source of truth; no local database or authentication is required.
- The product listing fetches the products for the selected category, then applies price, brand, and text filters in the browser.
- The listing displays 20 products per page.
- Category, brand, price, text-search, and page state are represented in URL query parameters where applicable, so listing state can be linked to or restored from a URL.
- Product and category data may fail to load, so the interface provides loading and error states; product requests can be retried.

## Architectural decisions

- **React with Vite:** keeps the client-side app and development setup lightweight.
- **React Router:** provides the listing and product-detail routes, along with URL-backed listing state.
- **API helpers in `src/api/`:** keep fetch and response handling separate from presentation.
- **Hooks in `src/hooks/`:** isolate product loading/filtering and responsive breakpoint behavior from the page components.
- **Page and reusable UI separation:** `src/pages/` composes screens, while `src/components/` and `src/ui/` hold reusable layout, filters, and interface elements.
- **Client-side filtering and pagination:** appropriate for the assignment's modest data set and allows filters to respond without additional requests.

## Improvements with more time

- Add automated tests for filtering, URL state, pagination, loading/error states, and product details.
- Debounce text-based filtering and consider moving filtering and pagination to the API if the catalog grows.
- Add stronger validation and clearer handling for incomplete or unexpected API data.
- Review keyboard, screen-reader, and mobile interactions across both screens.
- Add environment-based API configuration and caching if the app needs to support a different backend or reduce repeat requests.
