import React from "react";

export default function Input({ type, value, onChange, required }: any) {
  return (
    <input
      type={type}
      className="border px-3 py-1 rounded w-80"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
