import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../entity/User";
import {delay} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User
  public login: string = ''
  public loading: boolean = true

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.httpClient.get<User>(environment.BACKEND_ADDRESS + '/api/data/me',
      {
        responseType: "json",
        observe: "response"
      })
      .subscribe(response => {
        // @ts-ignore
        this.user = response.body
        this.login = this.user.username
        this.loading = false
      })
  }

}
