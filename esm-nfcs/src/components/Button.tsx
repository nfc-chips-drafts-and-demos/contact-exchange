import { ReactNode } from "react";

export function Button({ disabled, onClick, label }: { disabled: boolean, onClick: () => void, label: string }): ReactNode {
  return <button className="border rounded border-gray-400 px-4 py-2 font-medium text-md" onClick={onClick}>{label}</button>
}