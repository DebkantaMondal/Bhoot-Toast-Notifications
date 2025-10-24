import { Toast, type ToastOptions } from "./Toast";

export class ToastQueue {
  private queue: Toast[] = [];

  enqueue(toast: Toast) {
    this.queue.push(toast);
  }

  dequeue(): Toast | undefined {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  createToast(options: ToastOptions) {
    const toast = new Toast(options);
    this.enqueue(toast);
  }
}
