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
    script.onload = () => {
      setIsLoaded(true);
    };
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    document.body.appendChild(script);
    return () => {
      // clean up effects of script here
    };
  }, []);

  return isLoaded ? <Story /> : <div>Loading...</div>;
}

export { withGlobalWrapper, gsapImport };
