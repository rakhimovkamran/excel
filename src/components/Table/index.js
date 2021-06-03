import { ExcelComponent } from "@core/ExcelComponent";

import { isCell, matrix, nextSelector, shouldResize } from "./table.functions";
import { TableSelection } from "./TableSelection";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { $ } from "@core/DOM";

export class Table extends ExcelComponent {
    static className = "app__table";

    constructor($root, options) {
        super($root, {
            name: "Table",
            listeners: ["mousedown", "click", "keydown", "input"],
            ...options,
        });
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        const $defaultSelected = this.$root.find('[data-id="1:0"]');
        this.selectSell($defaultSelected);

        this.$on("formula:input", (content) => {
            this.selection.current.text(content);
        });

        this.$on("formula:done", () => {
            this.selection.current.focus();
        });
    }

    selectSell($cell) {
        this.selection.select($cell);
        this.$dispatch("table:select", $cell);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        }
    }

    onClick(event) {
        if (isCell(event)) {
            const $target = $(event.target);

            if (!event.shiftKey) {
                this.selection.select($target);
            } else {
                const cells = matrix(this.selection.current, $target).map(
                    (id) => this.$root.find(`[data-id="${id}"]`)
                );

                this.selection.selectGroup(cells);
            }
        }
    }

    onKeydown(event) {
        const keys = [
            "Enter",
            "Tab",
            "ArrowLeft",
            "ArrowRight",
            "ArrowDown",
            "ArrowUp",
        ];

        const { key } = event;

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();

            const currentID = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, currentID));

            this.selectSell($next);
        }
    }

    onInput(event) {
        this.$dispatch("table:input", $(event.target));
    }

    toHTML() {
        return createTable(21);
    }
}
