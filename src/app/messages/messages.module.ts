import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MomentModule } from 'angular2-moment';


// Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

// Rutas
import { MessagesRoutingModule } from './messages.routing';

// Servicios para el guard
import { UserGuard } from '../services/user.guard';
import { UserService } from '../services/user.service';


UserService
@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        MessagesRoutingModule,
        MomentModule
    ],
    exports: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    providers: [
        UserService,
        UserGuard
    ]
})

export class MessagesModule { }

