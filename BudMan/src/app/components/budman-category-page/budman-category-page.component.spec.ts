import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudmanCategoryPageComponent } from './budman-category-page.component';

describe('BudmanCategoryPageComponent', () => {
  let component: BudmanCategoryPageComponent;
  let fixture: ComponentFixture<BudmanCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudmanCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudmanCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
