import React from "react";

export const MenuItem = ({ text, onClick }) => (
  <div
    className="p-2 text-sm text-gray-300 hover:bg-neutral-700 cursor-pointer transition-colors duration-200"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  >
    {text}
  </div>
);

export const MenuDivider = () => <div className="h-px bg-neutral-700" />;