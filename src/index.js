import "./assets/scss/index.scss";
import { Router } from "@core/router/Router";
import { DashboardPage } from "@/pages/Dashboard/DashboardPage";
import { ExcelPage } from "@/pages/Excel/ExcelPage";

new Router("#app", {
    dashboard: DashboardPage,
    excel: ExcelPage,
});
