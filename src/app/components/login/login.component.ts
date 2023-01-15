import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../entity/LoginRequest";
import {environment} from "../../../environments/environment";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

const LOGIN_URL = environment.BACKEND_ADDRESS + '/api/auth/signIn'
const ME_URL = environment.BACKEND_ADDRESS + '/api/data/me'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  private loginRequest: LoginRequest
  private loginResponse: any
  private profileResponse: any

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    if (this.tokenStorageService.getUser())
      this.router.navigate(['/profile']);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required])
    })
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'Ок', {
      duration: 2000,
    });
  }

  getErrorMessage() {
    if (this.loginForm.get('userName')?.hasError('required')) {
      return 'Поле не должно быть пустым';
    }
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'Поле не должно быть пустым';
    }
    return this.loginForm.get('userName')?.hasError('minlength') ? 'Длина не менее 4 символов' : '';
  }

  login() {
    this.loginRequest = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.httpClient.post(LOGIN_URL, this.loginRequest, {
      responseType: "json",
      observe: "response",
    }).subscribe(response => {
      this.loginResponse = response.body
      this.tokenStorageService.saveToken(this.loginResponse.token)
      this.getProfile(this.loginResponse.token)
      this.openSnackBar('Успешная авторизация!')
    }, error => {
      if (error.status === 401)
        this.openSnackBar('Неверный логин/пароль!')
    })
  }

  getProfile(token: string) {
    this.httpClient.get(ME_URL, {
      responseType: "json",
      observe: "response"
    }).subscribe(response => {
      this.profileResponse = response.body
      this.tokenStorageService.saveUser(this.profileResponse)
      if (this.tokenStorageService.getUser())
        this.router.navigate(['/profile']);
    })
  }

}
