import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          className="font-editorial text-2xl font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          Aethelgard
        </Link>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary Editorial Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600"
        >
          <Link
            to="/"
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
              isActive('/') && location.hash === ''
                ? 'text-stone-900 underline underline-offset-8 decoration-[#9A3412] decoration-2'
                : ''
            }`}
          >
            Future AI Journal
          </Link>
          <Link
            to="/articles/future-of-ai-in-healthcare-diagnostics"
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
              location.pathname.startsWith('/articles/')
                ? 'text-stone-900 underline underline-offset-8 decoration-[#9A3412] decoration-2'
                : ''
            }`}
          >
            10 Research Articles
          </Link>
          <Link
            to="/future-ai-simulator"
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
              isActive('/future-ai-simulator')
                ? 'text-stone-900 underline underline-offset-8 decoration-[#9A3412] decoration-2'
                : ''
            }`}
          >
            2035 AI Impact App
          </Link>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/future-ai-simulator"
            className="px-4 py-2 text-xs font-medium rounded-lg bg-stone-900 text-stone-50 hover:bg-[#9A3412] transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch 2035 Simulator</span>
          </Link>
        </div>
      </div>

      {/* Mobile navigation strip */}
      <div className="flex md:hidden items-center gap-5 overflow-x-auto px-6 py-2.5 border-t border-stone-200/80 text-xs font-medium text-stone-600">
        <Link to="/" className="whitespace-nowrap shrink-0 hover:text-stone-900">
          Future AI Journal
        </Link>
        <Link
          to="/articles/future-of-ai-in-healthcare-diagnostics"
          className="whitespace-nowrap shrink-0 hover:text-stone-900"
        >
          10 Research Articles
        </Link>
        <Link
          to="/future-ai-simulator"
          className="whitespace-nowrap shrink-0 hover:text-stone-900"
        >
          2035 AI Impact App
        </Link>
      </div>
    </header>
  );
};
