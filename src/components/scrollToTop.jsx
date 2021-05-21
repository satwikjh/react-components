import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <div className="scroll-to-top">
        <div className="tip-text text-secondary bold">Top</div>
        <i
          type="button"
          onClick={scrollToTop}
          className="fa fa-angle-double-up"
        ></i>
      </div>
    )
  );
}
