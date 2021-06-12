export class Observer {
    constructor() {
        this.listeners = {};
    }

    dispatch(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => {
                listener(...args);
            });
        }
    }

    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);

        return () => {
            this.listeners[event] = this.listeners[event].filter(
                (listener) => listener !== callback
            );
        };
    }
}
