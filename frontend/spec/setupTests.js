import '@testing-library/jest-dom';
import { beforeEach, afterEach, vi } from 'vitest';

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock();

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

beforeEach(() => {
    vi.clearAllMocks();
});

afterEach(() => {
    vi.clearAllTimers();
});
