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
git clone <your-repo-url>
cd <your-repo-folder>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in your browser
http://localhost:3000
