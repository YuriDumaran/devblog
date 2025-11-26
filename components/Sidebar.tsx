"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Posts' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/lab-notes', label: 'Lab Notes' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex w-full flex-col border-b border-slate-800/60 bg-slate-900/30 backdrop-blur lg:h-screen lg:w-80 lg:border-b-0 lg:border-r">
      <div className="flex flex-col gap-6 px-6 py-8">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">devblog</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Yuri Dumaran</h1>
          <p className="mt-1 text-sm text-slate-400">
            Frontend tinkerer sharing build notes, experiments, and ship logs.
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' || pathname.startsWith('/posts') : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800/80 hover:text-white',
                  isActive ? 'bg-slate-800/80 text-white' : 'text-slate-400'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-2 text-sm text-slate-400">
          <p>Need something custom? Drop a line via the contact form.</p>
          <div className="flex gap-4 text-xs uppercase tracking-wide text-slate-500">
            <a
              className="hover:text-accent"
              href="https://github.com/YuriDumaran"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="hover:text-accent"
              href="mailto:hello@example.com"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
