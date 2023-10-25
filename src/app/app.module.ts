import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { PianoService } from './@core-service/piano-service';
import { SoundService } from './@core-service/sound-service';
import { NoteInfoComponent } from './components/note-info/note-info.component';
import { NotationComponent } from './components/notation/notation.component';
import { SafePipe } from './@pipe/safe.pipe';
import { NotationService } from './@core-service/notation-service';

@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    KeyboardComponent,
    NoteInfoComponent,
    NotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PianoService,
    SoundService,
    NotationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
