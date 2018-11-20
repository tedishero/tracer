import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as fromTrace from '../reducers';
import { Store, select } from '@ngrx/store';
import { TraceExplorerPageActions } from '../actions';
import { AIEvent } from 'src/app/core/models/ai.model';
@Component({
    selector: 'app-date-selector',
    template: `
        <nz-range-picker [nzFormat]="dateFormat" [ngModel]="dateRange" (ngModelChange)="onChange($event)">
        </nz-range-picker>
        <button nz-button nzType="primary" (click)="onSearch()"><i nz-icon type="search"></i>Search</button>
    `,
    styles: [
        `
            nz-date-picker,
            nz-month-picker,
            nz-range-picker,
            nz-week-picker {
                margin: 0 8px 12px 0;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraceDateRangerSelectorComponent implements OnInit {
    dateRange$ = this.store.pipe(select(fromTrace.getDateRangeFilter));
    traceData$ = this.store.pipe(select(fromTrace.getTracesData));
    dateFormat = 'yyyy/MM/dd';
    dateRange: Date[];
    traceData: AIEvent[];
    constructor(private store: Store<fromTrace.State>) {}

    ngOnInit() {
        this.dateRange$.pipe().subscribe(dateRateData => {
            this.dateRange = dateRateData;
        });

        this.traceData$.pipe().subscribe(traceData => {
            this.traceData = traceData;
            console.log(this.traceData);
        });
    }

    onChange(event: any) {
        this.store.dispatch(
            new TraceExplorerPageActions.DateRangeUpdated({
                range: event
            })
        );
    }

    onSearch() {
        console.log('on search clicekd');
        this.store.dispatch(new TraceExplorerPageActions.DataRequested());
    }
}
