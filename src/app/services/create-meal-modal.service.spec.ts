import { TestBed } from '@angular/core/testing';

import { CreateMealModalService } from './create-meal-modal.service';

describe('CreateMealModalService', () => {
  let service: CreateMealModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateMealModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
