import React from 'react';

const withGlobalWrapper = (Story) => (
  <div className="l-constrain u-spaced-5">
    <Story />
  </div>
);

export { withGlobalWrapper };
