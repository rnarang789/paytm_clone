"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className=" bg-gray-800 text-sm text-white p-2.5 me-2 mb-2 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
