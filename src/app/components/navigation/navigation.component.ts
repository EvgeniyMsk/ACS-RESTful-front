import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isMenuCollapsed = true;

  @Input()
  username: string = 'null'

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorageService.logout()
  }

}
