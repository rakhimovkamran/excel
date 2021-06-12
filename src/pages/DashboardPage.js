import { Page } from "@core/Page";
import { $ } from "@core/DOM";
import { createRecordsTable } from "@/pages/dashboard.functions";

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString();

        return $.create("div", "dashboard")
            .html(`<div class="dashboard__header">
                    <h1>Dashboard</h1>
                </div>

                <div class="dashboard__new">
                    <div class="dashboard__view">
                        <div class="dashboard__create-container">
                            <a href="#excel/${now}" class="dashboard__create">
                                <i class="material-icons">post_add</i>
                            </a>

                            <span class="dashboard__create-placeholder"
                                >Blank</span
                            >
                        </div>
                    </div>
                </div>

                <div class="dashboard__table dashboard__view">
                   ${createRecordsTable()}
                </div>`);
    }
}
