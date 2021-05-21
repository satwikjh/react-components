import React, { useState, useEffect } from "react";

export const LazyImage = ({ getSrc, alt, pre }) => {
  const placeHolder = pre
    ? pre
    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

  const [src, setSrc] = useState();
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();

  const getImageSrc = async (filename) => {
    let src = await getSrc(filename);
    setSrc(src);
  };
  getImageSrc(alt);

  useEffect(() => {
    let observer;
    let didCancel = false;
    if (src)
      if (imageRef && imageSrc !== src) {
        if (IntersectionObserver) {
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (
                  !didCancel &&
                  (entry.intersectionRatio > 0 || entry.isIntersecting)
                ) {
                  setImageSrc(src);
                  observer.unobserve(imageRef);
                }
              });
            },
            {
              threshold: 0.001,
              rootMargin: "10px",
              triggerOnce: true,
            }
          );
          observer.observe(imageRef);
        } else {
          setImageSrc(src);
        }
      }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);
  return <img ref={setImageRef} src={imageSrc} alt={alt} />;
};
