import React, { useEffect, useMemo, useRef, useState } from "react";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";

export default function MaisonMurzaLanding() {
  const IMAGES = useMemo(() => {
    const perche = Array.from(
      { length: 45 },
      (_, i) => `/images/perche-${i + 1}.jpg`
    );
    const deodat = Array.from(
      { length: 22 },
      (_, i) => `/images/deodat-${i + 1}.jpg`
    );
    return [...perche, ...deodat];
  }, []);

  const AUTOPLAY_MS = 3500;
  const [idx, setIdx] = useState(0);
  const [ratios, setRatios] = useState([]);
  const [ready, setReady] = useState(false);

  const timerRef = useRef(null); // 🧠 on garde une référence au timer

  // Bloque le scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Précharge les images et calcule les ratios
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      IMAGES.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img.naturalWidth / img.naturalHeight);
            img.onerror = () => resolve(1);
            img.src = src;
          })
      )
    ).then((r) => {
      if (!cancelled) {
        setRatios(r);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [IMAGES]);

  // Fonction pour lancer le timer
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % IMAGES.length);
    }, AUTOPLAY_MS);
  };

  // Démarre l’autoplay une fois que tout est prêt
  useEffect(() => {
    if (!ready) return;
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [ready]);

  // 🖱️ Clic → image suivante + reset du timer
  const next = () => {
    clearInterval(timerRef.current); // stoppe le timer
    setIdx((i) => (i + 1) % IMAGES.length);
    startTimer(); // redémarre depuis zéro
  };

  const WRAP_STYLE = {
    width: "min(900px, 85vw)",
    height: "min(80vh, 1000px)",
  };

  return (
    <div className="relative h-screen w-screen bg-white text-black select-none">
      <NavBar />
      <Logo />

      <div className="h-full w-full grid place-items-center">
        {!ready ? (
          <div className="opacity-60 text-sm">Chargement…</div>
        ) : (
          <button
            aria-label="Prochaine image"
            onClick={next}
            className="relative overflow-hidden"
            style={WRAP_STYLE}
          >
            {IMAGES.map((src, i) => {
              const isLandscape = (ratios[i] ?? 1) > 1.05;
              const common =
                "absolute inset-0 transition-opacity duration-700 " +
                "left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%]";
              const sizing = isLandscape
                ? "w-[95%] h-auto max-h-[95%]"
                : "h-[95%] w-auto max-w-[95%]";

              return (
                <img
                  key={src}
                  src={src}
                  alt={`maisonmurza visuel ${i + 1}`}
                  className={`${common} ${sizing} ${
                    i === idx ? "opacity-100" : "opacity-0"
                  }`}
                  draggable={false}
                />
              );
            })}
          </button>
        )}
      </div>
    </div>
  );
}
