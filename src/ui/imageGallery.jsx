import { useState } from "react";
import "./imageGallery.css";

export const ImageGallery = ({ images, alt }) => {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="gallery">
      <div className="gallery__main">
        {current && <img src={current} alt={alt} />}
      </div>

      {images.length > 1 && (
        <div className="gallery__thumbs" role="list">
          {images.map((src, i) => (
            <button
              key={src}
              role="listitem"
              className={`gallery__thumb${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === active ? "true" : undefined}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
