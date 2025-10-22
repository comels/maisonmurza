import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="absolute left-4 right-4 z-40 flex justify-center items-end pointer-events-auto"
      style={{
        // marge bas = 16px + safe area iPhone
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
      }}
    >
      <img
        src="/images/logo.png"
        alt="Maison Murza"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </Link>
  );
}
