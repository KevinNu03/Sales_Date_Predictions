import { Routes } from "@angular/router";
import { PrivateRoutes } from "./public-private-routes";

export const routes: Routes = [
    {
        path: '',
        redirectTo: `/${PrivateRoutes.HOME}`,
        pathMatch: 'full'
    },
    {
        path: PrivateRoutes.HOME,
        loadComponent: () => import('../../pages/sales-date-predition/sales-date-predition.component').then(c => c.SalesDatePreditionComponent)
    }
]