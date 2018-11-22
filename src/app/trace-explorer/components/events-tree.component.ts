import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as fromTrace from '../reducers';
import { Store, select } from '@ngrx/store';
import { EventNode } from '../models/event-node.model';
import { Observable } from 'rxjs';
import { TraceExplorerPageActions } from '../actions';
import { map, switchMap, tap } from 'rxjs/operators';
@Component({
    selector: 'app-event-tree',
    template: `
        <nz-skeleton [nzLoading]="loading$ | async" [nzActive]="true" [nzTitle]="false" [nzParagraph]="{ rows: 25 }">
            <nz-tree
                nzShowLine="true"
                [nzData]="eventNodes$ | async"
                [nzExpandedKeys]="expandedIds$ | async"
                (nzExpandChange)="onExpanded($event)"
                (nzClick)="onNodeClick($event)"
            >
            </nz-tree>
        </nz-skeleton>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventTreeComponent implements OnInit {
    eventNodes$: Observable<EventNode[]>;
    expandedIds$: Observable<string[]>;
    loading$: Observable<boolean>;

    constructor(private store: Store<fromTrace.State>) {}

    ngOnInit() {
        this.eventNodes$ = this.store.pipe(select(fromTrace.getAllRootNodes)).pipe(
            tap(() => console.log('got new nodes')),
            map(data => data.map(d => JSON.parse(JSON.stringify(d))))
        );
        this.loading$ = this.store.pipe(select(fromTrace.getLoadingState));
        this.expandedIds$ = this.store.pipe(select(fromTrace.getExpandedIds));
        this.expandedIds$.subscribe(ids => {
            console.log(ids);
        });
    }

    onExpanded(event: any) {
        if (event && event.node && event.node.isExpanded) {
            this.store.dispatch(
                new TraceExplorerPageActions.NodeExpanded({
                    nodeId: event.node.key,
                    isRoot: event.node.level === 0
                })
            );
        }
    }

    onNodeClick(event: any) {}
}
