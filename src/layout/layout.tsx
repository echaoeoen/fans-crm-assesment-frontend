import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useLogout } from '../hook/use-logout';

const links = [
  {
    name: 'User',
    to: '/',
  },
];

export default function Layout() {
  const { doLogout } = useLogout();
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Fans-CRM Assesment</h1>
        <nav>
          <ul>
            {links.map((link) => (
              <li className="mb-2" key={link.to}>
                <Link
                  to={link.to}
                  className="block p-2 rounded hover:bg-gray-700"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="mb-2">
              <a
                onClick={doLogout}
                className="block p-2 rounded hover:bg-gray-700"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
