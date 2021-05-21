import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";

const ModalNew = ({ onClose, width, height, children, keepOpen = false }) => {
  let modalRef = null;

  React.useEffect(() => {
    document.querySelector("html").classList.add("scroll-lock");
    return () => document.querySelector("html").classList.remove("scroll-lock");
  }, []);

  const onClickOutside = (event) => {
    if (modalRef === null || modalRef.contains(event.target) || keepOpen)
      return;
    onClose();
  };

  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        onClick={onClickOutside}
        onKeyDown={(e) => {
          if (e.keyCode === 27) onClose();
        }}
      >
        <div
          tabIndex="0"
          className="modal-area"
          ref={(ref) => (modalRef = ref)}
          style={{ width: width, height: height }}
        >
          <i
            type="button"
            className="material-icons modal-close"
            onClick={onClose}
            onMouseDown={onClose}
          >
            close
          </i>
          <div className="modal-body">{children}</div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default ModalNew;
