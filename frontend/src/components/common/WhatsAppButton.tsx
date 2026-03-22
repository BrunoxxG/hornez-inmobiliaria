const WhatsAppButton = () => {
  const whatsappNumber = '5492665024444'; // Cambiar por tu número
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hola%20Hornez%20Inmobiliaria%2C%20me%20gustaría%20consultar%20sobre%20propiedades`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
      title="Contactanos por WhatsApp"
    >
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.931 6.934c0 1.928.748 3.741 2.105 5.098l-.533 1.951 1.992-.522c1.316.722 2.817 1.103 4.367 1.103 3.837 0 6.962-3.125 6.962-6.962 0-1.858-.72-3.603-2.028-4.911S12.927 6.979 11.051 6.979z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
