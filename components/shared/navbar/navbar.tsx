"use client";

import * as React from "react";
import { MobileSidebar } from "../sidebar/mobile-sidebar";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-muted/40 backdrop-filter backdrop-blur-lg px-6 flex items-center justify-between h-20 border-b-2 my-[1px] border-gray-300 dark:border-gray-600">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Trang quản lý
        </h1>
        <p className="text-muted-foreground dark:text-gray-300">Vinh</p>
      </div>
      <MobileSidebar />
      <ModeToggle />
    </nav>
  );
};
