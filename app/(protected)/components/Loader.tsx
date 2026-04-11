import { createPortal } from "react-dom";

interface LoaderProps {
  usePortal?: boolean;
}

export default function Loader({ usePortal = false }: LoaderProps) {
  const content = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60">
      <div className="flex items-center justify-center w-30 h-30 bg-white rounded-xl shadow-xl animate-bounce-soft">
        <img src="/img/logo.svg" alt="logo-hornez" className="w-20" />
      </div>
    </div>
  );

  if (usePortal) {
    if (typeof window === "undefined") return null;
    return createPortal(content, document.body);
  }

  return content;
}
