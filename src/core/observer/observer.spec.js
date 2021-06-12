import { Observer } from "./Observer";

describe("Observer: ", () => {
    let observer;
    let handler;

    beforeEach(() => {
        observer = new Observer();
        handler = jest.fn();
    });

    test("should be defined", () => {
        expect(observer).toBeDefined();
        expect(observer.dispatch).toBeDefined();
        expect(observer.subscribe).toBeDefined();
    });

    test("should subscribe", () => {
        observer.subscribe(handler);

        expect(Object.entries(observer.listeners).length).toEqual(1);
    });
});
