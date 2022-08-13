import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudmanTransactionsPageComponent } from './budman-transactions-page.component';

describe('BudmanTransactionsPageComponent', () => {
  let component: BudmanTransactionsPageComponent;
  let fixture: ComponentFixture<BudmanTransactionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudmanTransactionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudmanTransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
