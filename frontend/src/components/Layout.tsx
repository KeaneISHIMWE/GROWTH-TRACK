import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/leads', label: 'Leads' },
  { href: '/clients', label: 'Clients' },
  { href: '/deals', label: 'Deals' },
  { href: '/reports', label: 'Reports' },
];

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Growth Tracker</div>
          <nav className="flex gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium ${
                  pathname === link.href ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;

