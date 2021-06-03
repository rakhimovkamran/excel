import { ExcelComponent } from "@core/ExcelComponent";

import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { shouldResize } from "./table.functions";

export class Table extends ExcelComponent {
    static className = "app__table";

    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["mousedown"],
        });
    }

    onMousedown(event) {
        if (shouldResize) {
            resizeHandler(this.$root, event);
        }
    }

    toHTML() {
        return createTable(21);
    }
}
