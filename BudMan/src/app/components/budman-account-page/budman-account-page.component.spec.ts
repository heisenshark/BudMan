import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudmanAccountPageComponent } from './budman-account-page.component';

describe('BudmanAccountPageComponent', () => {
  let component: BudmanAccountPageComponent;
  let fixture: ComponentFixture<BudmanAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudmanAccountPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudmanAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
