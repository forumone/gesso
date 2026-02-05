import React from 'react';

const withGlobalWrapper = (Story) => (
  <div className="l-constrain u-spaced-4">
    <Story />
  </div>
);

export { withGlobalWrapper };
