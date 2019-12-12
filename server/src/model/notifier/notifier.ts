export interface Notifier<T> {
  send(data: T): boolean;
}