import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-user',
  templateUrl: './no-user.component.html',
  styleUrls: ['./no-user.component.scss']
})
export class NoUserComponent {
  user: string | null= sessionStorage.getItem('username');

  constructor(
    protected router: Router
  ){}

  goHome(): void{
    this.router.navigate(['/home']);
  }
}
