"use client";

import {
  HomeIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Inicio", href: "/inicio", icon: HomeIcon },
  { name: "Plan de retiro", href: "/inicio/plan", icon: ChartBarIcon },
  { name: "Planes", href: "/inicio/planes", icon: ChartBarIcon },
  {
    name: "Seguimiento",
    href: "/inicio/seguimiento",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Configuración",
    href: "/inicio/configuracion",
    icon: Cog6ToothIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150",
              {
                "bg-[#016384] text-white font-bold": isActive,
                "text-[#002349] hover:bg-gray-50 hover:text-[#016384]":
                  !isActive,
              },
            )}
          >
            <LinkIcon
              className={clsx("mr-3 h-5 w-5 flex-shrink-0", {
                "text-white": isActive,
                "text-[#002349] group-hover:text-[#016384]": !isActive,
              })}
            />
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
