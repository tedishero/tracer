import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: '/traces', pathMatch: 'full' },
    {
        path: 'traces',
        canActivate: [AuthGuard],
        loadChildren: 'src/app/trace-explorer/trace-explorer.module#TraceExplorerModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
