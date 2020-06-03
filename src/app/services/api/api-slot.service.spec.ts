import { TestBed } from '@angular/core/testing';

import { ApiSlotService } from './api-slot.service';

describe('ApiSlotService', () => {
  let service: ApiSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
