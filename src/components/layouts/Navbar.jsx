import { useState } from "react";
import { FiFacebook, FiInstagram, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Catalog", href: "/categorie" },
    { name: "My favorites", href: "/favoris" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="">
      <nav className="w-full bg-[#1A1A27] text-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className=" flex items-center gap-2 text-2xl font-bold text-fc-blue-dark"
          >
            <img
              src="/logo_aniverse.png"
              alt="Le logo du site aniverse"
              className="mt-1 rounded-full"
              width={40}
              height={40}
            />
            <span>Aniverse</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-fc-blue-dark transition-colors"
              >
                <li>{link.name}</li>
              </Link>
            ))}
            {/* Links Socials */}
            <li>
              <a
                aria-label="Visitez notre page Instagram"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
            </li>
            <li>
              <a
                aria-label="Visitez notre page Facebook"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fc-blue-dark transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-slate-800"
            onClick={() => setOpen(!open)}
            aria-label="Button menu"
          >
            {!open ? <FiMenu className="w-6 h-6" /> : <FiX />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-fc-blue-text">
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block px-2 py-2 rounded text-fc-white transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
