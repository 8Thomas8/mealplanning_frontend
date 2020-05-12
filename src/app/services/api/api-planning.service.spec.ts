import { TestBed } from '@angular/core/testing';

import { ApiPlanningService } from './api-planning.service';

describe('ApiPlanningService', () => {
  let service: ApiPlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
