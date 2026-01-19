import { TestBed } from '@angular/core/testing';

import { SharedAuthLibService } from './shared-auth-lib.service';

describe('SharedAuthLibService', () => {
  let service: SharedAuthLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAuthLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
