import React, { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string | ReactNode;
  render?: (item: T, index: number) => ReactNode;
  width?: string;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  selectedId?: string | number | null;
  onSelect?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  selectable?: boolean;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  selectedId,
  onSelect,
  isLoading = false,
  emptyMessage = "No items to display.",
  selectable = false,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-[#eaeded] bg-white rounded-[2px] shadow-sm">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[#fafafa] border-b border-[#eaeded] text-[#545b64] font-bold select-none">
            {selectable && (
              <th className="py-2.5 px-3 w-10 text-center">
                <span className="sr-only">Select</span>
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={`py-2.5 px-3 tracking-wider font-semibold text-[#545b64] ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eaeded] text-[#161e2d]">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-12 text-center text-[#545b64]"
              >
                <div className="inline-flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-[#0972d3]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-sm">Loading resources...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-10 text-center text-[#545b64]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => {
              const isSelected = selectedId !== undefined && selectedId === keyExtractor(item);
              return (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onSelect && onSelect(item)}
                  className={`transition-colors ${
                    isSelected
                      ? "bg-[#f2f8fd]"
                      : "hover:bg-[#f8f9fa]"
                  } ${onSelect ? "cursor-pointer" : ""}`}
                >
                  {selectable && (
                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="radio"
                        name="table-selection"
                        checked={isSelected}
                        onChange={() => onSelect && onSelect(item)}
                        className="text-[#0972d3] focus:ring-[#0972d3] h-3.5 w-3.5 border-[#68707f]"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={`py-2.5 px-3 ${col.className || ""}`}>
                      {col.render
                        ? col.render(item, idx)
                        : (item as Record<string, any>)[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
