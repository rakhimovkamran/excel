import { Store } from "./index";

const initialState = {
    count: 0,
};

const reducer = (state = initialState, action) => {
    if (action.type === "ADD") {
        return { ...state, count: state.count + 1 };
    }

    return state;
};

describe("Store: ", () => {
    let store;
    let handler;

    beforeEach(() => {
        store = new Store(reducer, initialState);
        handler = jest.fn();
    });

    test("should return store object", () => {
        expect(store).toBeDefined();
        expect(store.dispatch).toBeDefined();
        expect(store.subscribe).toBeDefined();
        expect(store.getState).toBeDefined();
    });

    test("should return object as state", () => {
        expect(store.getState()).toBeInstanceOf(Object);
    });

    test("should return default state", () => {
        expect(store.getState()).toEqual(initialState);
    });

    test("should change state if actions exists", () => {
        store.dispatch({ type: "ADD" });
        expect(store.getState().count).toBe(1);
    });

    test("should NOT change state if actions don't exists", () => {
        store.dispatch({ type: "ACTION_NOT_EXISTS" });
        expect(store.getState().count).toBe(0);
    });

    test("should call subscriber function", () => {
        store.subscribe(handler);
        store.dispatch({ type: "ADD" });

        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith(store.getState());
    });

    test("should NOT call subscriber function if it had been unsubscribed", () => {
        const subscription = store.subscribe(handler);
        subscription.unsubscribe();

        store.dispatch({ type: "ADD" });

        expect(handler).not.toHaveBeenCalled();
    });

    test("should dispatch with async way", () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                store.dispatch({ type: "ADD" });
            }, 500);

            setTimeout(() => {
                expect(store.getState().count).toBe(1);
                resolve();
            }, 1000);
        });
    });
});
