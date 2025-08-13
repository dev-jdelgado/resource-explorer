# Resource Explorer — Rick & Morty (React + TypeScript + Vite)

A small React + TypeScript app (Next.js) that lists characters from the [Rick and Morty API](https://rickandmortyapi.com/), supports search, filtering, sorting, favorites, and detail pages — with URL-driven state.


Live preview: 

## Features

- List of characters with pagination (server paginated).
- Detail view at `/character/:id` (code-split with `React.lazy`).
- Debounced search (400ms), status filter, and sort is trivial to add.
- URL reflects `page`, `name` (search), `status`, and `favorites` — shareable and reload-safe.
- Toggle favorites from list and detail. Persisted in `localStorage`.
- Loading skeletons / error states with retry button.
- Abort/cancellation handled by fetch implementation (axios supports `AbortSignal`).
- React Query for client caching and background refetch.
- Light/Dark theme toggle (persisted).
- Code-splitting for detail route.


## 🚀 How to Run

**Prerequisites**
- Node.js ≥ 18
- npm or yarn

**Steps**
```bash
# 1. Clone the repository
git clone https://github.com/dev-jdelgado/resource-explorer.git
cd <your-repo-folder>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in your browser
http://localhost:5173
```

## Architecture & trade-offs
**What I prioritized**
- Clean, easy-to-read component boundaries (pages/, components/, api/, hooks/).
- URL is the source of truth for list state (so links are shareable and back/forward works).
- Lightweight UX: Favorites is client-side and non-invasive.

**Trade-offs**
- Favorites filtering currently only filters the characters in the current page (client-side). To show all favorites across pages I'd fetch each favorite by ID (or maintain a local cache of all characters) — I chose the simpler route to keep fetches minimal.
- Abort/cancellation: axios signal (AbortController) is supported; React Query handles cancellation when it re-runs queries, but more aggressive cancellation logic could be added for more complex flows.
- No virtualization yet, simple grid is used. If the dataset or client memory becomes large I would add react-window.

**What I'd ship next (if more time)**
- Persist list scroll position between navigation (to improve back/forward UX).
- Virtualized favorites / list when many items exist.