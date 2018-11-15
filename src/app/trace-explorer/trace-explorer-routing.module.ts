import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TracePageComponent } from './container/trace-explorer.component';

const routes: Routes = [{ path: '', component: TracePageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TraceExplorerRoutingModule {}
