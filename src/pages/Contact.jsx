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
    <div className="relative min-h-dvh w-screen select-none">
      <NavBar />
      <Logo />

      {/* Bloc texte contact */}
      <div className="absolute top-[20%] left-4">
        {/* Groupe resserré */}
        <div className="leading-none space-y-0">
          <p>Agathe Soudan</p>
          <p>
            <a
              href="mailto:contact@maisonmurza.com"
              className="hover:opacity-70"
            >
              contact@maisonmurza.com
            </a>
          </p>
          <p>
            <a
              href="tel:+33645869898"
              className="hover:opacity-70 tabular-nums"
            >
              +33 6 45 86 98 98
            </a>
          </p>
          <p>
            ig :{" "}
            <a
              href="https://www.instagram.com/maisonmurza/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70"
            >
              @maisonmurza
            </a>
          </p>
        </div>

        {/* Ligne séparée */}
        <p className="mt-4 leading-relaxed">Paris // Marseille</p>
      </div>
    </div>
  );
}
