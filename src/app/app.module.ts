import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateValidatorDirective } from './directives/date.directive';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DniServicio } from './services/dni.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, DateValidatorDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    FormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DniServicio],
  bootstrap: [AppComponent],
})
export class AppModule {}
