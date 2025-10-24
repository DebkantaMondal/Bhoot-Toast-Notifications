import { ToastManager } from "./core/ToastManager";

const manager = ToastManager.getInstance({ delayBetween: 800 });

document.querySelectorAll("button[data-type]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type") as any;
    const position = (document.querySelector("#position") as HTMLSelectElement)
      .value as any;

    manager.showToast({
      message: `Bhoot ${type.toUpperCase()} Toast at ${position}! 👻`,
      type,
      position,
      duration: 2500
    });
  });
});

manager.showToast({
  message: 'Hi! 👻',
  type: 'error',
  position: 'top-left',
  duration: 2500
});

manager.showToast({
  message: 'Hello! 👻'
});
