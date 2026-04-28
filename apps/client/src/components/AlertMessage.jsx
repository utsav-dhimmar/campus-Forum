import { useEffect, useState } from "react";

export default function AlertMessage({
  text = "An Unknown error occurred",
  autoHide = true,
}) {
  // console.log(text);
  const [visible, setVisible] = useState(true);
  const showComponent = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };
  const normalShow = () => {
    setVisible(true);
  };
  useEffect(() => {
    if (autoHide === true) {
      showComponent();
    } else {
      normalShow();
    }
  }, [text, autoHide]);

  return (
    <>
      {visible && (
        <div className="alert alert-danger mt-2">
          <span>{text}</span>
        </div>
      )}
    </>
  );
}
