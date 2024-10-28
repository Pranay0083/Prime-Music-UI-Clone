import React from 'react';

const ErrorState = ({ error }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    Error: {error}
  </div>
);

export default ErrorState;
