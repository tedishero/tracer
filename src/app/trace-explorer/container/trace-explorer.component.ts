import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/reducers';
import * as fromRoot from 'src/app/reducers';
import * as fromTrace from '../reducers';
import { TraceExplorerPageActions } from '../actions';
import { exhaustMap, tap } from 'rxjs/operators';
import { Credentials } from 'src/app/auth/models/credentials';
import { EventNode } from '../models/event-node.model';

@Component({
    selector: 'app-trace-explorer',
    template: `
        <app-date-selector></app-date-selector>
        <app-event-tree></app-event-tree>
        <nz-pagination [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>
    `,
    styles: []
})
export class TracePageComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        //
        // gets the current credential and dispatch [DataRequested] action
        // to request for trace data to populate this page.
        // this.cred$.pipe(
        //     tap((auth: Credentials) => {
        //         console.log('Tracer getting current cred: ' + auth);
        //         if (auth) {
        //             this.store.dispatch(
        //                 new TraceExplorerPageActions.DataRequested({
        //                     startTime: undefined,
        //                     endTime: undefined,
        //                     credential: auth
        //                 })
        //             );
        //         }
        //     })
        // );
    }
}
