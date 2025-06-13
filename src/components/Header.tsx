import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="Header relative flex justify-between items-center shadow-sm p-4">
      <NavLink to="/" className="flex items-center">
        <div className="flex items-center">
          <img src="/icon.png" alt="OpenStay Logo" className="w-10 h-10 mr-2" />
          <h1 className="title">OpenStays</h1>
        </div>
      </NavLink>
      <nav className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-lime-800 font-bold' : 'text-lime-800 hover:text-lime-600'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-lime-800 font-bold' : 'text-lime-800 hover:text-lime-600'
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
