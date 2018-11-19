import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracePageComponent } from './container/trace-explorer.component';
import { TraceExplorerRoutingModule } from './trace-explorer-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { TraceExplorerEffects } from './effects/trace-explorer.effects';
import { TraceDateRangerSelectorComponent } from './components/date-selector.component';
import { FormsModule } from '@angular/forms';
export const COMPONENTS = [TracePageComponent, TraceDateRangerSelectorComponent];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TraceExplorerRoutingModule,
        NgZorroAntdModule,
        StoreModule.forFeature('traces', reducers),
        EffectsModule.forFeature([TraceExplorerEffects])
    ],
    declarations: COMPONENTS
})
export class TraceExplorerModule {}
