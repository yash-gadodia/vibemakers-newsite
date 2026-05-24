import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Radix UI primitives (Select, RadioGroup, etc.) call ResizeObserver in
// layout effects; jsdom doesn't ship one, so any test that mounts those
// components crashes without this polyfill.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as unknown as { ResizeObserver: typeof ResizeObserverStub }).ResizeObserver =
  ResizeObserverStub;

// Radix Select uses scrollIntoView when an item becomes selected; jsdom
// doesn't implement it, so stub a no-op.
if (!(HTMLElement.prototype as unknown as { scrollIntoView?: () => void }).scrollIntoView) {
  (HTMLElement.prototype as unknown as { scrollIntoView: () => void }).scrollIntoView = () => {};
}

// Reveal component uses IntersectionObserver for scroll-based animations; jsdom
// doesn't ship one, so stub a no-op observer similar to ResizeObserver.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserverStub }).IntersectionObserver =
  IntersectionObserverStub;
