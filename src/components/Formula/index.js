import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = "app__formula";

    constructor($root) {
        super($root, {
            name: "Formula",
            listeners: ["input"],
        });
    }

    toHTML() {
        return /* html */ `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }

    onInput(event) {
        console.log(this.$root);
        console.log("Formula: onInput", event.target.textContent);
    }
}
