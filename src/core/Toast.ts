export type ToastType = "success" | "error" | "info" | "warn";
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

export class Toast {
  private element: HTMLDivElement;
  private duration: number;
  private position: ToastPosition;
  private toastType: ToastType;

  constructor({
    message,
    type = "info",
    duration = 3000,
    position = "top-right"
  }: ToastOptions) {
    this.duration = duration;
    this.position = position;
    this.toastType = type;

    this.element = document.createElement("div");
    this.element.className = `bhoot-toast ${this.toastType}`;
    this.element.innerHTML = this.getTemplate(message, this.toastType);
  }

  private getTemplate(message: string, type: ToastType): string {
    const icons: Record<ToastType, string> = {
      success: "✅",
      error: "❌",
      info: "ℹ️",
      warn: "⚠️"
    };
    return `<span class="icon">${icons[type]}</span><span>${message}</span>`;
  }

  show(container: HTMLElement, prepend = false) {
    if (prepend) {
      container.insertBefore(this.element, container.firstChild);
    } else {
      container.appendChild(this.element);
    }
    setTimeout(() => this.dismiss(container), this.duration);
  }

  dismiss(container: HTMLElement) {
    this.element.classList.add("fade-out");
    setTimeout(() => {
      if (container.contains(this.element)) container.removeChild(this.element);
    }, 300);
  }

  getPosition() {
    return this.position;
  }
}
