
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  // Use a singleton pattern for the root to prevent "createRoot" errors on re-execution
  let root = (rootElement as any)._reactRoot;
  if (!root) {
    root = ReactDOM.createRoot(rootElement);
    (rootElement as any)._reactRoot = root;
  }
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Could not find root element to mount to");
}
