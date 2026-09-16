const BUTTON_CLASS =
  "border-2 border-white bg-transparent px-[2.2rem] py-[0.825rem] text-[1.24rem] font-semibold text-white rounded-md transition-colors hover:border-hornez-orange hover:bg-hornez-orange";

export default function HeroActions() {
  return (
    <div className="flex justify-center">
      <a href="/propiedades" className={BUTTON_CLASS}>
        Comprar
      </a>
    </div>
  );
}
