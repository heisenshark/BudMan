import { Component, OnInit } from '@angular/core';

interface Food {
    value: string;
    viewValue: string;
}
@Component({
  selector: 'app-budman-transactions-page',
  templateUrl: './budman-transactions-page.component.html',
  styleUrls: ['./budman-transactions-page.component.scss']
})
export class BudmanTransactionsPageComponent implements OnInit {
    options:any[] = [
        'xd',
        'hf'
    ];
    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'},
    ];
    range: any;
    startDate: Date = new Date();
    picker: Date = new Date();
    dateDisabled: boolean =false;
  constructor() { }

  ngOnInit(): void {
  }

    DisableDate() {

    }
}
