import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { Settings, User } from "lucide-react";
import { FaMailchimp ,FaUserPen} from "react-icons/fa6";
interface Route {
  label: string;
  icon: LucideIcon | IconType;
  activeIcon: LucideIcon | IconType;
  href?: string;
  isParent?: boolean;
  children?: Omit<Route, "isParent" | "children">[];
}

export const routes: Route[] = [
  {
    label: "Trang chủ",
    icon: GoHome,
    activeIcon: GoHomeFill,
    href: "/dashboard",
  },
  {
    label: "Quản lý nhân sự",
    icon: FaUserPen,
    activeIcon: FaUserPen,
    isParent: true,
    children: [
      {
        label: "Danh sách nhân sự",
        href: "/dashboard/users",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
      },
    ],
  },
  {
    label: "Quản lý dịch vụ",
    icon: MdMiscellaneousServices,
    activeIcon: MdMiscellaneousServices,
    isParent: true,
    children: [
      {
        label: "Danh sách dịch vụ",
        href: "/dashboard/services",
        icon: FaRegListAlt,
        activeIcon: FaRegListAlt,
      },
    ],
  },
  {
    label: "Phản hồi",
    icon: FaMailchimp,
    activeIcon: FaMailchimp,
    href: "/dashboard/mail",
  },
  {
    label: "Cài đặt",
    icon: Settings,
    activeIcon: Settings,
    href: "/dashboard/settings",
  },


];
