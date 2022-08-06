import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudmanTopbarComponent } from './budman-topbar.component';

describe('BudmanTopbarComponent', () => {
  let component: BudmanTopbarComponent;
  let fixture: ComponentFixture<BudmanTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudmanTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudmanTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
