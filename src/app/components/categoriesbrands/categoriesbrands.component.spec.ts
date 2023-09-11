import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesbrandsComponent } from './categoriesbrands.component';

describe('CategoriesbrandsComponent', () => {
  let component: CategoriesbrandsComponent;
  let fixture: ComponentFixture<CategoriesbrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesbrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
