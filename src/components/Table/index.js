import { ExcelComponent } from "@core/ExcelComponent";

import { isCell, matrix, nextSelector, shouldResize } from "./table.functions";
import { TableSelection } from "./TableSelection";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { $ } from "@core/DOM";

import * as actions from "@/store/actions";
import { defaultStyles } from "@/constants";
import { applyStyle, changeStyles } from "@/store/actions";
import { parse } from "@core/parse";

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
            this.selection.current
                .attr("data-value", content)
                .text(parse(content));

            this.updateTextInStore(content);
        });

        this.$on("formula:done", () => {
            this.selection.current.focus();
        });

        this.$on("toolbar:applyStyle", (value) => {
            this.selection.applyStyle(value);
            this.$storeDispatch(
                applyStyle({
                    value,
                    ids: this.selection.selectedIds,
                })
            );
        });
    }

    selectSell($cell) {
        this.$dispatch("table:select", $cell);
        this.selection.select($cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));

        this.$storeDispatch(changeStyles(styles));
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$storeDispatch(actions.tableResize(data));
        } catch (e) {
            console.warn("Resize Error:", e.message);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        }
    }

    onClick(event) {
        if (isCell(event)) {
            const $target = $(event.target);

            if (!event.shiftKey) {
                this.selectSell($target);
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

    updateTextInStore(value) {
        this.$storeDispatch(
            actions.changeText({
                id: this.selection.current.id(),
                value,
            })
        );
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text());
    }

    toHTML() {
        return createTable(30, this.store.getState());
    }
}
