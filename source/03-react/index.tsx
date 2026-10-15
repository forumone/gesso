import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Lazy load components so we only load the JS we need.
const Example = lazy(() => import('./Example/Example'));

/**
 * Waits for block containers to be rendered in case BigPipe is enabled.
 */
function waitForBlock(selector: string): Promise<HTMLElement | void> {
  return new Promise(resolve => {
    const observer = new MutationObserver(() => {
      const element = document.getElementById(selector) as HTMLElement;
      if (element) {
        resolve(element);
        observer.disconnect();
      }

      // Assumed the block doesn't exist if not
      // present within a couple seconds.
      setTimeout(() => resolve(), 2000);
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}

waitForBlock('some-id-to-hydrate').then(container => {
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Example />
      </Suspense>
    );
  }
});

// Continue adding blocks as needed.
