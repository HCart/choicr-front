import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { ListDetailComponent } from './list-detail/list-detail.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { EditableComponent } from './editable/editable.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListDetailComponent,
    MessagesComponent,
    EditableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
