import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../entity/User";

const AUTH_TOKEN = "AUTH_TOKEN"
const USER = "USERDATA"
const ME_URL = environment.BACKEND_ADDRESS + '/api/data/me'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private user: User

  constructor(private httpClient: HttpClient) { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(AUTH_TOKEN)
    window.localStorage.setItem(AUTH_TOKEN, token)
  }

  public getToken():string {
    return <string>window.localStorage.getItem(AUTH_TOKEN)
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER)
    window.localStorage.setItem(USER, JSON.stringify(user))
  }

  public getUser(): User {
    return JSON.parse(<string>window.localStorage.getItem(USER));;
  }

  logout(): void {
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.location.reload()
  }
}
