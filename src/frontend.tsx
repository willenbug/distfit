/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';

const element = document.querySelector('#root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.hot === undefined) {
  // The hot module reloading API is not available in production.
  createRoot(element).render(app);
} else {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(element)) as {
    render(node: React.ReactNode): void;
  };
  root.render(app);
}
