import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoriesService } from '../core/services/repositories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  inputValue!: string;
  searchHistory: string[] = [];
  showHistory: boolean = false;

  constructor(
    protected repositoriesService: RepositoriesService,
    protected router: Router
  ) { }

  findRepository(): void{
    if(this.inputValue !== '' && this.inputValue !== undefined) {
      this.addCookieFromInput();
      this.router.navigate(['/repositories'], { queryParams: { userName: this.inputValue } });
    }
  }

  removeFromHistory(el: number): void {
    if(el==0)
      this.searchHistory.splice(el, 1);
    this.searchHistory.splice(el, el);
    this.createCookieFromArray();
  }

  addCookieFromInput(): void {
    if(!this.searchHistory.includes(this.inputValue))
      document.cookie += `${this.inputValue}!`;
  }

  createCookieFromArray(): void {
    let newCookieValue = this.searchHistory.join().replace(/,/g,"!").concat("!");
    if(newCookieValue=="!")
      this.deleteCookie();
    else
      document.cookie = newCookieValue;
  }

  createArrayFromCookie(): void {
    if(document.cookie.length!=0) {
      this.showHistory = true;
    }
    let cookieString = document.cookie;
    this.searchHistory = cookieString.split("!");
    this.searchHistory.pop();
  }

  deleteCookie(): void {
    document.cookie = document.cookie + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    this.showHistory = false;
  }

  clearInput(): void{
    this.inputValue = '';
  }

  fillInputFromHistory(element: string): void {
    this.inputValue = element;
    this.findRepository();
  }

  hideHistory(): void {
    this.showHistory = false;
  }

}
