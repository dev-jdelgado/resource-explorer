import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import CharacterList from "./pages/CharacterList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeToggle from "./components/ThemeToggle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const CharacterDetail = React.lazy(() => import("./pages/CharacterDetail"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-shell">
          <header className="header">
            <div style={{ display: "flex", gap: 12, flexDirection: "column", rowGap: "0" }}>
              <Link to="/character" className="link" aria-label="Resource Explorer Home">
                <h1 style={{ margin: 0 }}>Resource Explorer</h1>
              </Link>
              <h2 className="small">Rick & Morty Characters</h2>
            </div>

            <div className="controls">
              <ThemeToggle />
            </div>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/character" replace />} />
              <Route path="/character" element={<CharacterList />} />
              <Route
                path="/character/:id"
                element={
                  <Suspense fallback={<div className="card">Loading detail…</div>}>
                    <CharacterDetail />
                  </Suspense>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
