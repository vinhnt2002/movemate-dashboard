"use client";

import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical, LogOut, Settings } from "lucide-react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserAvatar from "./user-avatar";

interface FormPopoverUserProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const nameStringTest = "Nguyễn Thành Vinh";
const nameSplit = nameStringTest.split(" ");
// console.log(nameSplit[0]);
// console.log(nameSplit[nameSplit.length - 1]);
const fullName = nameSplit[0] + " " + nameSplit[nameSplit.length - 1];

const FormPopoverUser = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverUserProps) => {
  const router = useRouter();
  const handleLogout = () => {
    signOut();
    router.push("/");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-60 pt-3 mr-2 dark:bg-gray-800"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="mb-2 p-1">Tài khoản</div>
        <div className="flex ">
          <div className="flex items-center gap-2">
            <UserAvatar />
            <div className="text-xs">
              <p className="font-bold text-sm">{fullName}</p>
              <p className="text-neutral-200">vinh@gmail.com</p>
            </div>
          </div>
          <Button
            className="h-auto w-auto ml-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="pt-6  text-neutral-500 space-y-2">
          {/* <Button
            variant="ghost"
            className="flex items-center gap-x-3 group w-full justify-start"
          >
            <Settings className="h-6 w-6 " />
            <div className=" p-2 rounded-md font-normal">Quản lý tài khoản</div>
          </Button> */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-x-3 group w-full justify-start"
          >
            <LogOut className="h-6 w-6 " />
            <div className=" p-2 rounded-md font-normal">Đăng xuất</div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopoverUser;
