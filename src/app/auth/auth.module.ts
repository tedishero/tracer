import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './container/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import { NgxLoadingModule } from 'ngx-loading';

export const COMPONENTS = [LoginPageComponent, LoginFormComponent];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects]),
        NgxLoadingModule
    ],
    declarations: COMPONENTS
})
export class AuthModule {}
