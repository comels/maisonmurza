import { useEffect } from "react";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";

export default function Contact() {
  // Empêche le scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="relative h-screen w-screen select-none">
      <NavBar />
      <Logo />

      {/* Bloc texte contact */}
      <div className="absolute top-[20%] left-4 leading-relaxed">
        <p>Agathe Soudan</p>
        <p>
          <a href="mailto:contact@maisonmurza.com" className="hover:underline">
            contact@maisonmurza.com
          </a>
        </p>
        <p>
          <a href="tel:+33645869898" className="hover:underline">
            +33 6 45 86 98 98
          </a>
        </p>
        <p>
          ig :{" "}
          <a
            href="https://www.instagram.com/maisonmurza/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            @maisonmurza
          </a>
        </p>
        <p className="mt-4">Paris // Marseille</p>
      </div>
    </div>
  );
}
