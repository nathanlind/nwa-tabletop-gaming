import { TestBed } from '@angular/core/testing';

import { CityCardServiceService } from './city-card-service.service';

describe('CityCardServiceService', () => {
  let service: CityCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
