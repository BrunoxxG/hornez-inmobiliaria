import Image from "next/image";
import Link from "next/link";

const SERVICIOS = [
  { label: "Propiedades en Venta", href: "/propiedades?tipo=venta" },
  { label: "Propiedades en Alquiler", href: "/propiedades?tipo=alquiler" },
];

const EMPRESA = [
  { label: "Quiénes somos", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Ingresar", href: "/login" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo + descripción */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/img/logo.svg"
                alt="Hornez Inmobiliaria"
                width={140}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Tu inmobiliaria de confianza. Te acompañamos en cada paso
              para encontrar la propiedad que estás buscando.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <i className="pi pi-instagram text-xl" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <i className="pi pi-facebook text-xl" />
              </a>
              <a href="#" aria-label="WhatsApp" className="hover:text-white transition-colors">
                <i className="pi pi-whatsapp text-xl" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Servicios
            </h3>
            <ul className="space-y-2">
              {SERVICIOS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa + Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Empresa
            </h3>
            <ul className="space-y-2 mb-6">
              {EMPRESA.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <i className="pi pi-phone" />
                <a href="tel:+549XXXXXXXXX" className="hover:text-white transition-colors">
                  +54 9 XXX XXX XXXX
                </a>
              </p>
              <p className="flex items-center gap-2">
                <i className="pi pi-envelope" />
                <a href="mailto:info@hornez.com" className="hover:text-white transition-colors">
                  info@hornez.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <i className="pi pi-map-marker" />
                Villa de Merlo, San Luis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Hornez Inmobiliaria. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
