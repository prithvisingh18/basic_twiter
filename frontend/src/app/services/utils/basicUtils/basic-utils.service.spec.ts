import { TestBed } from '@angular/core/testing';

import { BasicUtilsService } from './basic-utils.service';

describe('BasicUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicUtilsService = TestBed.get(BasicUtilsService);
    expect(service).toBeTruthy();
  });
});
