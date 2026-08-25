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
                src="/img/logoBlanco.png"
                alt="Hornez Inmobiliaria"
                className=" h-15 m-4"
              />
            </Link>
            <p className="text-[0.96rem] leading-relaxed text-gray-400 transition-colors hover:text-hornez-orange">
              Tu inmobiliaria de confianza. Te acompañamos en cada paso
              para encontrar la propiedad que estás buscando.
            </p>
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
                    className="text-[0.96rem] text-gray-400 transition-colors hover:text-hornez-orange"
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
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-colors hover:bg-hornez-orange/15 hover:text-hornez-orange">
                  <i className="pi pi-phone" />
                </span>
                <a href="tel:+5493544400903" className="transition-colors hover:text-hornez-orange">
                  +54 9 3544 400903
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-colors hover:bg-hornez-orange/15 hover:text-hornez-orange">
                  <i className="pi pi-envelope" />
                </span>
                <a href="mailto:hornezinmobiliaria@gmail.com" className="break-all transition-colors hover:text-hornez-orange">
                  hornezinmobiliaria@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-colors hover:bg-hornez-orange/15 hover:text-hornez-orange">
                  <i className="pi pi-map-marker" />
                </span>
                <span className="transition-colors hover:text-hornez-orange">La Paz, Córdoba</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="grid w-full items-center gap-4 px-4 py-4 text-[0.825rem] text-gray-500 sm:px-6 md:grid-cols-3 lg:px-12">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <img
              src="/img/logo-MAT-8394.jpeg"
              alt="CPI Córdoba Matrícula 8394"
              className="h-9 w-auto rounded-md"
            />
            <span className="max-w-xs leading-snug">
              Bruno Nehuen Gimenez Martillero y Corredor Publico Matricula N°8394.
            </span>
          </div>
          <div className="text-center md:col-start-2">
            © {new Date().getFullYear()} Hornez Inmobiliaria. Todos los derechos reservados.
          </div>
          <div className="flex justify-center md:justify-end md:pr-10">
            <Link
              href="/login"
              className="rounded-md border-2 border-gray-700 bg-gray-900 px-[1.375rem] py-[0.55rem] text-[1.1rem] font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
            >
              Ingresar
            </Link>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50">
        <a
          href="https://wa.me/5493544400903"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="peer flex h-[3.85rem] w-[3.85rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        >
          <i className="pi pi-whatsapp text-3xl" />
        </a>
        <div className="invisible pointer-events-none absolute bottom-[calc(100%+0.75rem)] right-0 w-max max-w-[18rem] rounded-2xl bg-white px-4 py-3 text-sm font-medium leading-snug text-gray-800 opacity-0 shadow-lg transition-opacity peer-hover:visible peer-hover:opacity-100">
          Hola! Si estás buscando comprar o poner a la venta tu propiedad,
          <br />
          ¡Estoy acá para ayudarte con eso!
          <span className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-white" />
        </div>
      </div>
    </footer>
  );
}
