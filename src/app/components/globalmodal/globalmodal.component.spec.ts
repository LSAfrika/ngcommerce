import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalmodalComponent } from './globalmodal.component';

describe('GlobalmodalComponent', () => {
  let component: GlobalmodalComponent;
  let fixture: ComponentFixture<GlobalmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
