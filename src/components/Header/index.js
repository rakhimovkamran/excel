import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/DOM";
import { changeTitle } from "@/store/actions";
import { defaultTitle } from "@/constants";
import { debounce } from "@core/utils";

export class Header extends ExcelComponent {
    static className = "app__header";

    constructor($root, options) {
        super($root, {
            name: "Header",
            listeners: ["input"],
            subscribe: ["title"],
            ...options,
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    onInput(event) {
        const $target = $(event.target);

        this.$storeDispatch(changeTitle($target.text()));
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle;

        return /* html */ `
        <input type="text" class="title_input" value="${title}" />

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
