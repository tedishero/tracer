import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as fromTrace from '../reducers';
import { Store, select } from '@ngrx/store';
import { TraceExplorerPageActions } from '../actions';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-date-selector',
    template: `
        <nz-range-picker
            [nzDisabled]="loading$ | async"
            [nzFormat]="dateFormat"
            [ngModel]="dateRange$ | async"
            (ngModelChange)="onChange($event)"
        >
        </nz-range-picker>
        <button nz-button nzType="primary" [nzLoading]="loading$ | async" (click)="onSearch()">
            <i nz-icon type="search"></i>Search
        </button>
    `,
    styles: [
        `
            nz-range-picker {
                margin: 0 8px 12px 0;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraceDateRangerSelectorComponent implements OnInit {
    dateRange$: Observable<Date[]>;
    loading$: Observable<boolean>;
    dateFormat = 'yyyy/MM/dd';
    constructor(private store: Store<fromTrace.State>) {}

    ngOnInit() {
        this.dateRange$ = this.store.pipe(select(fromTrace.getDateRangeFilter));
        this.loading$ = this.store.pipe(select(fromTrace.getLoadingState));
    }

    onChange(event: any) {
        this.store.dispatch(
            new TraceExplorerPageActions.DateRangeUpdated({
                range: event
            })
        );
    }

    onSearch() {
        this.store.dispatch(new TraceExplorerPageActions.DataRequested());
    }
}
