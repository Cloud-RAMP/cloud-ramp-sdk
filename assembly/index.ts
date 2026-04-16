import { decodeWSEvent } from "./sdk";
import { onMessage, onJoin, onLeave, onError } from "./user";

// Internal functions to be called by the WebAssembly runtime

export function __onMessage(ptr: usize, len: usize): void {
  const buf = changetype<ArrayBuffer>(ptr);
  const event = decodeWSEvent(buf);

  onMessage(event);
}

export function __onJoin(ptr: usize, len: usize): void {
  const buf = changetype<ArrayBuffer>(ptr);
  const event = decodeWSEvent(buf);
  
  onJoin(event);
}

export function __onLeave(ptr: usize, len: usize): void {
  const buf = changetype<ArrayBuffer>(ptr);
  const event = decodeWSEvent(buf);

  onLeave(event);
}

export function __onError(ptr: usize, len: usize): void {
  const buf = changetype<ArrayBuffer>(ptr);
  const event = decodeWSEvent(buf);

  onError(event);
}
