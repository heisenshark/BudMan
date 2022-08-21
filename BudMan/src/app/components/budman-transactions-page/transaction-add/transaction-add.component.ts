import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class TransactionAddComponent implements OnInit {

  constructor(    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
) {
  this._locale = 'en-GB'
  _adapter.setLocale(this._locale)

  }

  date = new FormControl(new Date())
  ngOnInit(): void {

  }

  onSubmit(){

  }

}
