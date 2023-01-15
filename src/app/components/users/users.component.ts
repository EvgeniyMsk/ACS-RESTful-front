import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const USERS_URL = environment.BACKEND_ADDRESS + '/api/admin/users'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: any

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(USERS_URL)
      .subscribe(data => {
        this.users = data
      })
  }

}
