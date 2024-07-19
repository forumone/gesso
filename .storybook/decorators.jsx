import React from 'react';
import { useEffect, useState } from 'react';

const withGlobalWrapper = (Story) => (
  <div className="l-constrain u-spaced-4">
    <Story />
  </div>
);

const gsapImport = (Story) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <Story />;
}

export { withGlobalWrapper, gsapImport };
