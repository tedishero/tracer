import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as fromTrace from '../reducers';
import { Store, select } from '@ngrx/store';
import { TraceExplorerPageActions } from '../actions';
@Component({
    selector: 'app-date-selector',
    template: `
        <nz-range-picker [nzFormat]="dateFormat" [ngModel]="dateRange" (ngModelChange)="onChange($event)">
        </nz-range-picker>
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
    dateFormat = 'yyyy/MM/dd';
    dateRange: Date[];

    constructor(private store: Store<fromTrace.State>) {}

    ngOnInit() {
        // TODO: get the default state from store to set defaultDateRange
        this.dateRange$.pipe().subscribe(dateRateData => {
            this.dateRange = dateRateData;
        });
    }

    onChange(event: any) {
        this.store.dispatch(
            new TraceExplorerPageActions.DateRangeUpdated({
                range: event
            })
        );
    }
}
