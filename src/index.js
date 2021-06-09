import "./scss/index.scss";

import { Excel } from "./components/Excel";
import { Header } from "./components/Header";
import { Toolbar } from "./components/Toolbar";
import { Formula } from "./components/Formula";
import { Table } from "./components/Table";

import { Store } from "@core/createStore";
import { rootReducer } from "./store/rootReducer";
import { debounce, storage } from "@core/utils";
import { initialState } from "@/store/initialState";

const store = new Store(rootReducer, initialState);

const stateListener = debounce((state) => {
    storage("excel-state", state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel("#app", {
    components: [Header, Toolbar, Formula, Table],
    store,
});

excel.render();
