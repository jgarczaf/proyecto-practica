import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsErrorComponent } from './transactions-error.component';

describe('TransactionsErrorComponent', () => {
  let component: TransactionsErrorComponent;
  let fixture: ComponentFixture<TransactionsErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsErrorComponent],
    });
    fixture = TestBed.createComponent(TransactionsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
