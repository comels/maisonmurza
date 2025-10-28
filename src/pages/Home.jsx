import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Home() {
  const IMAGES = useMemo(() => {
    const all = Array.from(
      { length: 59 },
      (_, i) => `/images/${String(i + 1).padStart(2, "0")}.jpg`
    );
    // Fisher–Yates
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }, []);

  const AUTOPLAY_MS = 3500;
  const [idx, setIdx] = useState(0);
  const [ratios, setRatios] = useState(() => new Map()); // src -> ratio
  const timerRef = useRef(null);

  // Bloque le scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  // Donne la priorité aux 3 premières images (préload HTML)
  useEffect(() => {
    const head = document.head;
    const links = IMAGES.slice(0, 3).map((href) => {
      const l = document.createElement("link");
      l.rel = "preload";
      l.as = "image";
      l.href = href;
      head.appendChild(l);
      return l;
    });
    return () => links.forEach((l) => head.removeChild(l));
  }, [IMAGES]);

  // Précharge progressive (6 d’abord, puis le reste quand le navigateur est idle)
  useEffect(() => {
    let cancelled = false;

    const loadImg = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 1);
        img.onerror = () => resolve(1);
        img.src = src;
        // hint browser cache
        img.decoding = "async";
        img.loading = "eager";
      });

    (async () => {
      // 1) prime cache pour 6 images autour de l’index 0
      const firstBatch = IMAGES.slice(0, Math.min(6, IMAGES.length));
      for (const src of firstBatch) {
        if (cancelled) return;
        const ratio = await loadImg(src);
        if (cancelled) return;
        setRatios((m) => new Map(m).set(src, ratio));
      }

      // 2) puis le reste quand le navigateur est idle
      const rest = IMAGES.slice(firstBatch.length);
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 100));
      const idleLoad = () => {
        if (cancelled) return;
        if (!rest.length) return;
        const src = rest.shift();
        loadImg(src).then((ratio) => {
          if (cancelled) return;
          setRatios((m) => new Map(m).set(src, ratio));
          idle(idleLoad);
        });
      };
      idle(idleLoad);
    })();

    return () => {
      cancelled = true;
    };
  }, [IMAGES]);

  // Timer
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % IMAGES.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []); // démarre immédiatement (pas besoin d'attendre le préchargement)

  const next = () => {
    clearInterval(timerRef.current);
    setIdx((i) => (i + 1) % IMAGES.length);
    startTimer();
  };

  const WRAP_STYLE = {
    width: "min(900px, 85vw)",
    height: "min(80vh, 1000px)",
  };

  // On ne rend que prev / current / next
  const idsToRender = [
    (idx - 1 + IMAGES.length) % IMAGES.length,
    idx,
    (idx + 1) % IMAGES.length,
  ];

  return (
    <div className="relative min-h-dvh w-screen select-none">
      <NavBar />

      <div className="h-full w-full pt-20 grid place-items-center">
        <button
          aria-label="Prochaine image"
          onClick={next}
          className="relative overflow-hidden"
          style={WRAP_STYLE}
        >
          {idsToRender.map((i) => {
            const src = IMAGES[i];
            const ratio = ratios.get(src) ?? 1;
            const isLandscape = ratio > 1.05;

            const common =
              "absolute inset-0 transition-opacity duration-700 " +
              "left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%]";
            const sizing = isLandscape
              ? "w-[95%] h-auto max-h-[95%]"
              : "h-[95%] w-auto max-w-[95%]";

            const isCurrent = i === idx;

            return (
              <img
                key={src}
                src={src}
                alt={`maisonmurza visuel ${i + 1}`}
                className={`${common} ${sizing} ${
                  isCurrent ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
                // priorité réseau + décode
                loading={isCurrent ? "eager" : "lazy"}
                fetchpriority={isCurrent ? "high" : "low"}
                decoding="async"
              />
            );
          })}
        </button>
      </div>

      <Link
        to="/"
        className="absolute left-4 right-4 z-40 mb-4 flex justify-center items-end pointer-events-auto"
        style={{
          bottom: "calc(1rem + env(safe-area-inset-bottom))",
        }}
      >
        <img
          src="/images/logo.png"
          alt="Maison Murza"
          className="w-full h-full object-contain"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </Link>
    </div>
  );
}
