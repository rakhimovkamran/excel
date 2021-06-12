import { $ } from "../DOM/DOM";
import { ActiveRoute } from "./ActiveRoute";

export class Router {
    constructor(selector, routes) {
        if (!selector) throw new Error("Selector is not provided in Router");

        this.$placeholder = $(selector);
        this.routes = routes;
        this.currentPage = null;

        this.changePageHandler = this.changePageHandler.bind(this);

        this.init();
    }

    init() {
        window.addEventListener("hashchange", this.changePageHandler);
        this.changePageHandler();
    }

    changePageHandler() {
        this.currentPage && this.currentPage.destroy();

        const Page = !ActiveRoute.path.includes("excel")
            ? this.routes.dashboard
            : this.routes.excel;

        this.$placeholder.clear();
        this.currentPage = new Page(ActiveRoute.param);
        this.$placeholder.append(this.currentPage.getRoot());
        this.currentPage.afterRender();
    }

    destroy() {
        window.removeEventListener("hashchange", this.changePageHandler);
    }
}
