import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="absolute bottom-4 z-10 left-4 right-4 flex justify-center items-end"
    >
      <img
        src="/images/logo.png"
        alt="Maison Murza"
        className="w-full h-auto object-contain"
        draggable={false}
      />
    </Link>
  );
}
