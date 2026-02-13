import React, { useMemo, useRef, useState } from "react";
import styles from "./App.module.css";
import { timeline } from "./data/timeline";

function normalizeAlt(filename: string): string {
  const plain = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return plain || "медиа";
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedMedia, setLoadedMedia] = useState<Record<string, boolean>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeItem = timeline[activeIndex];
  const mediaBase = `${import.meta.env.BASE_URL}media/`;
  const isLastSlide = activeIndex === timeline.length - 1;
  const isActiveLoaded = loadedMedia[activeItem.filename];
  const celebrationDecor = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);

  const switchSlide = (nextIndex: number) => {
    if (nextIndex === activeIndex) {
      return;
    }
    const normalized = (nextIndex + timeline.length) % timeline.length;
    setActiveIndex(normalized);
    setShowCelebration(false);
    if (normalized === timeline.length - 1) {
      window.setTimeout(() => setShowCelebration(true), 800);
    }
  };

  const goNext = () => switchSlide(activeIndex + 1);
  const goPrev = () => switchSlide(activeIndex - 1);

  const onTouchStart = (x: number) => {
    touchStartX.current = x;
  };

  const onTouchEnd = (x: number) => {
    if (touchStartX.current === null) {
      return;
    }
    const delta = x - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={styles.page}
      onTouchStart={(event) => onTouchStart(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => onTouchEnd(event.changedTouches[0].clientX)}
    >
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <main className={styles.viewport}>
        <header className={styles.topBar}>
          <small>
            {activeIndex + 1}/{timeline.length}
          </small>
        </header>

        <section className={styles.mediaStage}>
          <button className={styles.navButton} onClick={goPrev} aria-label="Назад">
            ‹
          </button>

          <div className={styles.mediaFrame}>
            {!isActiveLoaded && <div className={styles.skeleton} aria-hidden="true" />}
            {activeItem.type === "photo" ? (
              <img
                src={`${mediaBase}${activeItem.filename}`}
                alt={normalizeAlt(activeItem.filename)}
                loading="lazy"
                onLoad={() => setLoadedMedia((prev) => ({ ...prev, [activeItem.filename]: true }))}
                onError={() => setLoadedMedia((prev) => ({ ...prev, [activeItem.filename]: true }))}
                className={isActiveLoaded ? styles.mediaVisible : styles.mediaHidden}
              />
            ) : (
              <video
                src={`${mediaBase}${activeItem.filename}`}
                controls
                playsInline
                preload="metadata"
                onLoadedData={() => setLoadedMedia((prev) => ({ ...prev, [activeItem.filename]: true }))}
                onError={() => setLoadedMedia((prev) => ({ ...prev, [activeItem.filename]: true }))}
                className={isActiveLoaded ? styles.mediaVisible : styles.mediaHidden}
              />
            )}
          </div>

          <button className={styles.navButton} onClick={goNext} aria-label="Вперед">
            ›
          </button>
        </section>

        {activeIndex < 2 && activeItem.caption && <p className={styles.caption}>{activeItem.caption}</p>}

        <div className={styles.dots}>
          {timeline.map((item, index) => (
            <button
              key={item.id}
              aria-label={`Слайд ${index + 1}`}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
              onClick={() => switchSlide(index)}
            />
          ))}
        </div>

        <p className={styles.swipeHint}>Свайпай влево/вправо</p>
      </main>

      {showCelebration && isLastSlide && (
        <div className={styles.celebrationLayer} aria-hidden="true">
          {celebrationDecor.map((item) => (
            <span key={`heart-${item}`} className={styles.heart} style={{ ["--i" as string]: item } as React.CSSProperties} />
          ))}
          {celebrationDecor.map((item) => (
            <span key={`flower-${item}`} className={styles.flower} style={{ ["--i" as string]: item } as React.CSSProperties} />
          ))}
          <div className={styles.celebrationText}>ты дошла до конца умничка лапочка 🌸</div>
        </div>
      )}
    </div>
  );
}

export default App;
