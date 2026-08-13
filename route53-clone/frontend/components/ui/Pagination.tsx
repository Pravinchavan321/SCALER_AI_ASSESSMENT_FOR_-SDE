import React from "react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className = "",
}) => {
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div
      className={`flex items-center justify-between px-4 py-2.5 bg-[#fafafa] border-t border-[#eaeded] text-xs text-[#545b64] select-none ${className}`}
    >
      <div>
        <span>
          Showing <span className="font-semibold text-[#161e2d]">{startItem}</span> -{" "}
          <span className="font-semibold text-[#161e2d]">{endItem}</span> of{" "}
          <span className="font-semibold text-[#161e2d]">{totalItems}</span>
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-2 py-1 rounded-[2px] border border-[#eaeded] bg-white text-[#161e2d] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f2f3f3]"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="px-2 text-[#161e2d]">
          Page {page} of {totalPages || 1}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || totalPages === 0}
          className="px-2 py-1 rounded-[2px] border border-[#eaeded] bg-white text-[#161e2d] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f2f3f3]"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
