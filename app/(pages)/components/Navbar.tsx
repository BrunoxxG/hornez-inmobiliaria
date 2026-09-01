"use client";

import Link from "next/link";
import { useState } from "react";
import { Music2 } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/#contacto", label: "Contacto" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/hornezinmobiliaria?igsh=dWM5NXdpYjZqczhm&utm_source=qr", label: "Instagram", icon: "pi-instagram" },
  { href: "https://www.facebook.com/share/1QngV9yJAU/?mibextid=wwXIfr", label: "Facebook", icon: "pi-facebook" },
  { href: "https://www.tiktok.com/@inmobiliariahornez?_r=1&_t=ZS-99EgEg1vBYX", label: "TikTok", icon: "music" },
  { href: "https://wa.me/5493544400903", label: "WhatsApp", icon: "pi-whatsapp" },
];

// Navegación global del sitio público: menú, logo y acceso a redes sociales.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/img/logoColor.png"
              alt="Hornez Inmobiliaria"
              className="h-8"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-hornez-blue font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="text-gray-700 transition-colors hover:text-hornez-orange"
                >
                  {social.icon === "music" ? <Music2 size={20} /> : <i className={`pi ${social.icon} text-xl`} />}
                </a>
              ))}
            </div>
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
              className="block py-3 text-gray-700 hover:text-hornez-blue font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-center gap-5 border-t border-gray-200 pt-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="text-gray-700 transition-colors hover:text-hornez-orange"
              >
                {social.icon === "music" ? <Music2 size={21} /> : <i className={`pi ${social.icon} text-xl`} />}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
