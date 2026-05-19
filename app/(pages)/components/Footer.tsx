import Link from "next/link";

const SERVICIOS = [
  { label: "Propiedades en Venta", href: "/propiedades?operacion=venta" },
  { label: "Propiedades en Alquiler", href: "/propiedades?operacion=alquiler" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="mt-auto bg-gray-900 text-gray-300">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:items-start">

          {/* Logo + descripción */}
          <div className="space-y-4 md:justify-self-end md:max-w-sm md:-mt-6">
            <Link href="/">
              <img
                src="/img/logo.svg"
                alt="Hornez Inmobiliaria"
                className="brightness-0 invert h-[7.26rem] w-auto"
              />
            </Link>
            <p className="text-[0.96rem] leading-relaxed text-gray-400">
              Tu inmobiliaria de confianza. Te acompañamos en cada paso
              para encontrar la propiedad que estás buscando.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/hornezinmobiliaria?igsh=dWM5NXdpYjZqczhm&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <i className="pi pi-instagram text-xl" />
              </a>
              <a
                href="https://www.facebook.com/share/1QngV9yJAU/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <i className="pi pi-facebook text-xl" />
              </a>
              <a
                href="https://wa.me/5493544400903"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-white transition-colors"
              >
                <i className="pi pi-whatsapp text-xl" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div className="md:justify-self-center">
            <h3 className="text-white font-semibold mb-4 text-[0.96rem] uppercase tracking-wider">
              Servicios
            </h3>
            <ul className="space-y-2">
              {SERVICIOS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-[0.96rem] text-gray-400 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:justify-self-start">
            <h3 className="text-white font-semibold mb-4 text-[0.96rem] uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3 text-[0.96rem] text-gray-400">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300">
                  <i className="pi pi-phone" />
                </span>
                <a href="tel:+5493544400903" className="hover:text-white transition-colors">
                  +54 9 3544 400903
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300">
                  <i className="pi pi-envelope" />
                </span>
                <a href="mailto:hornezinmobiliaria@gmail.com" className="break-all hover:text-white transition-colors">
                  hornezinmobiliaria@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300">
                  <i className="pi pi-map-marker" />
                </span>
                <span>La Paz, Córdoba</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-4 text-left text-[0.825rem] text-gray-500">
          © {new Date().getFullYear()} Hornez Inmobiliaria. Todos los derechos reservados.
        </div>
      </div>

      <a
        href="https://wa.me/5493544400903"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-[3.85rem] w-[3.85rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <i className="pi pi-whatsapp text-3xl" />
      </a>
    </footer>
  );
}
