"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}
export const SidebarItem = ({ icon, path, title }: Props) => {
  const currentPath = usePathname();
  return (
    <ul>
      {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
      <li>
        <Link
          href={path}
          className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
            currentPath === path
              ? " text-white bg-gradient-to-r from-sky-600 to-cyan-400"
              : ""
          }`}
        >
					{icon}
          <span className="-mr-1 font-medium">{title}</span>
        </Link>
      </li>
    </ul>
  );
};
