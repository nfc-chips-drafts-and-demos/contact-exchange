"use client";
import { useState } from "react";

export default function SubmitButton({ label, onClick }: { label: string, onClick: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <button
      disabled={submitting}
      onClick={(ev) => {
        setSubmitting(true);
        onClick();
      }}
      className="bg-white border rounded border-gray-400 font-medium text-md inline-flex gap-4 items-center px-4 py-2 leading-6 transition ease-in-out duration-150"
      type="submit">

      <div>{label}</div>
      {submitting &&
        <svg className="animate-spin h-5 w-5 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>}
    </button>
  );

}

/**
 * 
 * class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
 * 
 */