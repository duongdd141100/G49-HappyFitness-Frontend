import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CurrencyInputDirective } from './format-currency.derective';

@NgModule({
  declarations: [
    CurrencyInputDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CurrencyInputDirective
  ],
  providers: [
    CurrencyPipe, 
    DecimalPipe
  ]
})
export class InputDirectivesModule { }
