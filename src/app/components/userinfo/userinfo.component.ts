import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../entity/User";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {AccessObject} from "../../entity/AccessObject";
import {Person} from "../../entity/Person";

const OBJECTS_URL = environment.BACKEND_ADDRESS + '/api/data/accessobjects'
const OBJECTNAME_URI = environment.BACKEND_ADDRESS + '/api/data/objectName'

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  public user: User
  public login: string = ''
  public loading: boolean = true
  public myAccessObjects: AccessObject[]

  constructor(private httpClient: HttpClient,
              private router: Router) {
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
    this.getObjects()

  }

  ngOnInit(): void {

  }

  private getObjects() {
    this.httpClient.get<Person[]>(OBJECTS_URL, {
      responseType: "json",
      observe: "response"
    })
      .subscribe(response => {
        // @ts-ignore
        this.myAccessObjects = response.body
        // @ts-ignore
        for (let i = 0; i < this.myAccessObjects.length; i++)
          this.httpClient.post(OBJECTNAME_URI, {
            // @ts-ignore
            objectName : this.myAccessObjects[i].title
          }, {
            responseType: "json",
            observe: "response"
          })
            .subscribe(response => {
              // @ts-ignore
              this.myAccessObjects[i].name = response.body.objectName
            })
      })
  }


}
