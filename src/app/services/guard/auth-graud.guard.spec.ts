import { TestBed } from '@angular/core/testing';

import { AuthGraud } from './auth-graud.guard';

describe('AuthGraudGuard', () => {
  let guard: AuthGraud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGraud);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
