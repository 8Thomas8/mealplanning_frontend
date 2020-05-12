import { TestBed } from '@angular/core/testing';

import { ApiDayService } from './api-day.service';

describe('ApiDayService', () => {
  let service: ApiDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
