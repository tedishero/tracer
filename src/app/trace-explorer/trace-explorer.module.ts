import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracePageComponent } from './container/trace-explorer.component';
import { TraceExplorerRoutingModule } from './trace-explorer-routing.module';

export const COMPONENTS = [TracePageComponent];

@NgModule({
    imports: [CommonModule, TraceExplorerRoutingModule],
    declarations: COMPONENTS
})
export class TraceExplorerModule {}
