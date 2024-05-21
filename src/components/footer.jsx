import React from 'react';

function Footer() {
  return (
    <div className="flex flex-col justify-center items-center w-full text-base text-zinc-500 border-t-4 mt-8 mb-11 max-md:mb-10 max-md:max-w-full">
      <div className="flex flex-col items-center px-16 pt-12 pb-1.5 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-1.5">
          <p className="flex-auto">1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
