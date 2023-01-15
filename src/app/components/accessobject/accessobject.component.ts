import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccessObject} from "../../entity/AccessObject";
import {environment} from "../../../environments/environment";

const OBJECTS_URL = environment.BACKEND_ADDRESS + '/api/data/accessobjects'

@Component({
  selector: 'app-accessobject',
  templateUrl: './accessobject.component.html',
  styleUrls: ['./accessobject.component.css']
})
export class AccessobjectComponent implements OnInit {
  public accessObjects: AccessObject[] | null

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<AccessObject[]>(OBJECTS_URL,
      {
        responseType: "json",
        observe: "response"
      })
      .subscribe(response => {
        this.accessObjects = response.body
      })
  }
}
