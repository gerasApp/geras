"use client";

import {
  HomeIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Inicio', href: '/inicio', icon: HomeIcon },
  { name: 'Plan de retiro', href: '/inicio/plan', icon: ChartBarIcon },
  { name: 'Seguimiento', href: '/inicio/seguimiento', icon: MagnifyingGlassIcon },
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
              'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
              {
                'bg-brand-light text-brand-primary font-bold': isActive,
                'text-black-500 hover:bg-gray-50 hover:text-black-900': !isActive,
              }
            )}
          >
            <LinkIcon 
              className={clsx(
                'mr-3 h-5 w-5 flex-shrink-0',
                {
                  'text-brand-primary': isActive,
                  'text-black-500 group-hover:text-gray-900': !isActive,
                }
              )} 
            />
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
