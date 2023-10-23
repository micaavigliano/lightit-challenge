import { useRef, useEffect } from "react";

const KEYCODE_TAB = 9;

const FOCUSABLE_ELEMENTS =
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

export const useFocusTrap = () => {
  const ref = useRef<HTMLElement | null>(null);

  const handleFocus = (event: KeyboardEvent) => {
    const refElement = ref?.current;

    if (refElement) {
      const focusableElem = Array.from(
        refElement.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
      ).filter((el) => !el.hasAttribute("disabled")) as HTMLElement[];

      const firstFocusableEl = focusableElem[0];
      const lastFocusableEl = focusableElem[focusableElem.length - 1];
      const isTabPressed = event.key === "Tab" || event.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    const currentRef = ref.current;
    currentRef?.addEventListener("keydown", handleFocus);

    return () => {
      currentRef?.removeEventListener("keydown", handleFocus);
    };
  }, []);

  return ref;
};
