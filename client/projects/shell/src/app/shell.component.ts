import { Component } from '@angular/core';
import { UserService } from 'shared-auth-lib';

@Component({
  selector: 'app-root',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  title = 'shell';

  saldo = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.saldo$.subscribe((valor: number) => {
      this.saldo = valor;
    });

    window.addEventListener('transfer-confirmed', (ev: any) => {
      alert(`Transferencia confirmada: ${ev.detail?.amount || ''}€`);
    });
  }
}
