import { Component, OnInit } from '@angular/core';
import { faTimes,faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-transaction-button',
  templateUrl: './transaction-button.component.html',
  styleUrls: ['./transaction-button.component.scss']
})
export class TransactionButtonComponent implements OnInit {

  constructor() { }
  faTimes = faTimes
  faPlus = faPlus

  ngOnInit(): void {
  }

}
