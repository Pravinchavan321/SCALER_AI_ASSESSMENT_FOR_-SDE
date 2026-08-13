"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const AwsTopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-[#161e2d] text-white h-10 px-4 flex items-center justify-between text-xs select-none border-b border-[#232f3e] z-30 sticky top-0">
      {/* Left: AWS Logo & Service search */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 font-bold tracking-wider text-sm text-[#ec7211] cursor-pointer">
          <svg className="w-5 h-5 text-white fill-current mr-1" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-white font-extrabold tracking-tight">AWS</span>
        </div>

        {/* Global Console Search Bar */}
        <div className="relative flex items-center w-72">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#879596]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search for services, features, docs [Alt+S]"
            className="w-full bg-[#232f3e] hover:bg-[#2d3a4b] text-white text-[11px] pl-8 pr-12 py-1 rounded-[2px] border border-transparent focus:border-[#ec7211] focus:outline-none transition-colors cursor-text placeholder-[#879596]"
          />
          <div className="absolute right-2 text-[10px] bg-[#161e2d] px-1 py-0.5 rounded text-[#879596] border border-[#3b4758]">
            /
          </div>
        </div>
      </div>

      {/* Right: Region, Notifications, Support, Account */}
      <div className="flex items-center space-x-3 text-xs">
        {/* Global Region Indicator */}
        <div className="flex items-center space-x-1 px-2 py-1 hover:bg-[#232f3e] rounded-[2px] cursor-pointer text-[#d5dbdb]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#037f0c] mr-1"></span>
          <span>Global</span>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-1 hover:bg-[#232f3e] text-[#d5dbdb] hover:text-white rounded-[2px]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Help / Support */}
        <button
          type="button"
          aria-label="Help"
          className="p-1 hover:bg-[#232f3e] text-[#d5dbdb] hover:text-white rounded-[2px]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* User Account Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-1.5 px-2 py-1 bg-[#232f3e] hover:bg-[#2d3a4b] rounded-[2px] text-white focus:outline-none"
          >
            <span className="font-semibold">{user?.username || "Admin"}</span>
            <span className="text-[#879596]">@ 1234-5678-9012</span>
            <svg className="w-3.5 h-3.5 ml-1 text-[#879596]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-1 w-56 bg-white border border-[#eaeded] rounded-[2px] shadow-xl text-[#161e2d] py-1 z-50">
              <div className="px-3 py-2 border-b border-[#eaeded] bg-[#fafafa]">
                <p className="text-[11px] text-[#545b64]">Signed in as</p>
                <p className="font-bold text-xs truncate">{user?.email || "admin@example.com"}</p>
                <p className="text-[10px] text-[#879596]">Account ID: 123456789012</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#d13212] hover:bg-[#fdf3f1] font-medium flex items-center space-x-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
