import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private saldoSubject = new BehaviorSubject<number>(2500);
  saldo$ = this.saldoSubject.asObservable();

  descontar(amount: number) {
    this.saldoSubject.next(this.saldoSubject.value - amount);
  }
}
