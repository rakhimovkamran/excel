import { createToolbar } from "@/components/Toolbar/toolbar.template";
import { $ } from "@core/DOM/DOM";
import { ExcelStateComponent } from "@core/root/ExcelStateComponent";
import { defaultStyles } from "@/constants";

export class Toolbar extends ExcelStateComponent {
    static className = "app__toolbar";

    constructor($root, options) {
        super($root, {
            name: "Toolbar",
            listeners: ["click"],
            subscribe: ["currentStyles"],
            ...options,
        });
    }

    prepare() {
        this.initState(defaultStyles);
    }

    get template() {
        return createToolbar(this.state);
    }

    onClick(event) {
        const $target = $(event.target);

        if ($target.data.type === "button") {
            const [[key, value]] = Object.entries(
                JSON.parse($target.data.value)
            );

            this.$dispatch("toolbar:applyStyle", { [key]: value });
        }
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles);
    }

    toHTML() {
        return createToolbar(this.state);
    }
}
