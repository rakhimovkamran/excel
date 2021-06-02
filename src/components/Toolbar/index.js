import { ExcelComponent } from "@core/ExcelComponent";

export class Toolbar extends ExcelComponent {
    static className = "app__toolbar";

    constructor($root) {
        super($root, {
            name: "Toolbar",
            listeners: [],
        });
    }

    toHTML() {
        return /* html */ `
        <div class="button">
            <i class="material-icons">format_align_left</i>
        </div>
        <div class="button">
            <i class="material-icons">format_align_center</i>
        </div>
        <div class="button">
            <i class="material-icons">format_align_right</i>
        </div>

        <span class="toolbar_separator">|</span>

        <div class="button">
            <i class="material-icons">format_bold</i>
        </div>
        <div class="button">
            <i class="material-icons">format_italic</i>
        </div>
        <div class="button">
            <i class="material-icons">format_underline</i>
        </div>
        `;
    }
}
