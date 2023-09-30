import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartpanelComponent } from './cartpanel.component';

describe('CartpanelComponent', () => {
  let component: CartpanelComponent;
  let fixture: ComponentFixture<CartpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
