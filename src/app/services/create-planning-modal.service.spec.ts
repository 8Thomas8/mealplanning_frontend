import { TestBed } from '@angular/core/testing';

import { CreatePlanningModalService } from './create-planning-modal.service';

describe('CreatePlanningModalService', () => {
  let service: CreatePlanningModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePlanningModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
