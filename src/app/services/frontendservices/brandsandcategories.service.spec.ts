import { TestBed } from '@angular/core/testing';

import { BrandsandcategoriesService } from './brandsandcategories.service';

describe('BrandsandcategoriesService', () => {
  let service: BrandsandcategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsandcategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
