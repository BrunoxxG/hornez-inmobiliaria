"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/img/logo.svg"
              alt="Hornez Inmobiliaria"
              className="h-16"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-hornez-red font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="bg-hornez-red text-white px-5 py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Ingresar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <i className={`pi ${menuOpen ? "pi-times" : "pi-bars"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-gray-700 hover:text-hornez-red font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="block mt-2 text-center bg-hornez-red text-white px-5 py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Ingresar
          </Link>
        </div>
      )}
    </nav>
  );
}
