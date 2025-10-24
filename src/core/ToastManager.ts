import { ToastQueue } from "./ToastQueue";
import { type ToastOptions, type ToastPosition } from "./Toast";

export interface ToastManagerOptions {
  delayBetween?: number;
  defaultPosition?: ToastPosition;
}

export class ToastManager {
  private static instance: ToastManager;
  private queue: ToastQueue;
  private containers: Map<ToastPosition, HTMLElement>;
  private isShowing = false;
  private delayBetween: number;
  private defaultPosition: ToastPosition;

  private constructor({ delayBetween = 600, defaultPosition = "top-right" }: ToastManagerOptions = {}) {
    this.queue = new ToastQueue();
    this.containers = new Map();
    this.delayBetween = delayBetween;
    this.defaultPosition = defaultPosition;
  }

  static getInstance(options?: ToastManagerOptions) {
    if (!this.instance) this.instance = new ToastManager(options);
    return this.instance;
  }

  private getContainer(position: ToastPosition): HTMLElement {
    if (!this.containers.has(position)) {
      const container = document.createElement("div");
      container.className = `toast-container ${position}`;
      document.body.appendChild(container);
      this.containers.set(position, container);
    }
    return this.containers.get(position)!;
  }

  showToast(options: ToastOptions) {
    const fullOptions = { position: this.defaultPosition, ...options };
    this.queue.createToast(fullOptions);
    if (!this.isShowing) this.processQueue();
  }

  private async processQueue() {
    this.isShowing = true;
    while (!this.queue.isEmpty()) {
      const toast = this.queue.dequeue()!;
      const container = this.getContainer(toast.getPosition());
      toast.show(container, true);
      await this.sleep(this.delayBetween);
    }
    this.isShowing = false;
  }

  private sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
