import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as fromTrace from '../reducers';
import { Store, select } from '@ngrx/store';
import { EventNode } from '../models/event-node.model';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-event-tree',
    template: `
        <nz-tree [nzData]="eventNodes$ | async" nzShowLine="true" (nzClick)="nzEvent($event)"> </nz-tree>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventTreeComponent implements OnInit {
    eventNodes$: Observable<EventNode[]>;

    constructor(private store: Store<fromTrace.State>) {}

    ngOnInit() {
        this.eventNodes$ = this.store.pipe(select(fromTrace.getEventNodes));
    }
}
