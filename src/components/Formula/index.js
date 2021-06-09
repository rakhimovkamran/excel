import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/DOM";

export class Formula extends ExcelComponent {
    static className = "app__formula";

    constructor($root, options) {
        super($root, {
            name: "Formula",
            listeners: ["input", "keydown"],
            subscribe: ["currentText"],
            ...options,
        });
    }

    init() {
        super.init();

        this.$formula = this.$root.find('[data-item="formula_input"]');

        this.$on("table:select", (selected) => {
            this.$formula.text(selected.data.value);
        });
    }

    toHTML() {
        return /* html */ `
            <div class="info">fx</div>
            <div class="input" 
                data-item="formula_input" 
                contenteditable spellcheck="false"
            ></div>
        `;
    }

    storeChanged({ currentText }) {
        this.$formula.text(currentText);
    }

    onInput(event) {
        this.$dispatch("formula:input", $(event.target).text());
    }

    onKeydown(event) {
        const keys = ["Enter", "Tab"];
        const { key } = event;

        if (keys.includes(key)) {
            event.preventDefault();
            this.$dispatch("formula:done");
        }
    }
}
