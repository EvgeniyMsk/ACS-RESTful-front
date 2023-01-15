import { Component } from '@angular/core';
import {environment} from "../environments/environment";
import {TokenStorageService} from "./services/token-storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';

  constructor(private router: Router,
              private tokenStorageServie: TokenStorageService) {
    if (this.tokenStorageServie.getUser() == null)
      this.router.navigate(['/login']);
    else
      this.router.navigate(['/profile']);
  }
}
