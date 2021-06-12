import { ExcelComponent } from "@core/root/ExcelComponent";
import { $ } from "@core/DOM/DOM";
import { changeTitle } from "@/store/actions";
import { defaultTitle } from "@/constants";
import { debounce } from "@core/utils/utils";
import { ActiveRoute } from "@core/router/ActiveRoute";

export class Header extends ExcelComponent {
    static className = "app__header";

    constructor($root, options) {
        super($root, {
            name: "Header",
            listeners: ["input", "click"],
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

    onClick(event) {
        const $target = $(event.target);

        if ($target.data.btn === "remove") {
            const decision = confirm(
                "Are you sure, you want to delete this table ?"
            );

            if (decision) {
                localStorage.removeItem("excel:" + ActiveRoute.param);
                ActiveRoute.navigate("");
            }
        } else if ($target.data.btn === "exit") {
            ActiveRoute.navigate("");
        }
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle;

        return /* html */ `
        <input type="text" class="title_input" value="${title}" />

        <div>
            <div class="button" data-btn="remove">
                <i class="material-icons" data-btn="remove">delete</i>
            </div>
            <div class="button" data-btn="exit">
                <i class="material-icons" data-btn="exit">exit_to_app</i>
            </div>
        </div>
        `;
    }
}
