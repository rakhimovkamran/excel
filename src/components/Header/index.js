import { ExcelComponent } from "@core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = "app__header";

    constructor($root) {
        super($root, {
            name: "Header",
            listeners: [],
        });
    }

    toHTML() {
        return /* html */ `
        <input type="text" class="title_input" value="New Table" />

        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>
        `;
    }
}
