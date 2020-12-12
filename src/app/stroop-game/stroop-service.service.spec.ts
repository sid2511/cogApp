import { TestBed } from '@angular/core/testing';

import { StroopService } from './stroop-service.service';

describe('StroopService', () => {
  let service: StroopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StroopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
