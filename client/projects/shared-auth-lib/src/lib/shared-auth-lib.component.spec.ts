import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAuthLibComponent } from './shared-auth-lib.component';

describe('SharedAuthLibComponent', () => {
  let component: SharedAuthLibComponent;
  let fixture: ComponentFixture<SharedAuthLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedAuthLibComponent]
    });
    fixture = TestBed.createComponent(SharedAuthLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
