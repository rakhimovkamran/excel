import { Page } from "@core/router/Page";

import { Toolbar } from "@/components/Toolbar";
import { Formula } from "@/components/Formula";
import { Header } from "@/components/Header";
import { Excel } from "@/components/Excel";
import { Table } from "@/components/Table";

import { Store } from "@core/store";
import { rootReducer } from "@/store/rootReducer";
import { normalizeInitialState } from "@/store/initialState";

import { debounce, storage } from "@core/utils/utils";

const storageName = (param) => `excel:${param}`;

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();

        const state = storage(storageName(params));
        const store = new Store(rootReducer, normalizeInitialState(state));

        const stateListener = debounce((state) => {
            storage(storageName(params), state);
        }, 300);

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store,
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}
