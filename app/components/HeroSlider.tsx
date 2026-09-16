import Image from "next/image";

export default function HeroSlider() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/img/lomaBolaLaCruz.jpeg"
        alt="Vista panorámica de La Paz, Córdoba"
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  );
}
