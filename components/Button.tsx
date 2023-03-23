import React from "react";

export default function Button({ children, type, onClick }: any) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-green-800 hover:bg-green-700 text-gray-100 px-4 py-2 rounded my-2"
    >
      {children}
    </button>
  );
}
