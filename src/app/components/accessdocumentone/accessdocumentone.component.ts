import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Person} from "../../entity/Person";
import {AccessDocument} from "../../entity/AccessDocument";
import {AccessObject} from "../../entity/AccessObject";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";

const DOCUMENT_URI = environment.BACKEND_ADDRESS + '/api/data/accessdocuments'
const OBJECTNAME_URI = environment.BACKEND_ADDRESS + '/api/data/objectName'
const OBJECTS_URL = environment.BACKEND_ADDRESS + '/api/data/accessobjects'

@Component({
  selector: 'app-accessdocumentone',
  templateUrl: './accessdocumentone.component.html',
  styleUrls: ['./accessdocumentone.component.css']
})
export class AccessdocumentoneComponent implements OnInit {
  public loading: boolean = true
  id: number
  accessDocument: AccessDocument
  accessObjects: AccessObject[]
  people: Person[]
  accepted: number

  constructor(private activateRoute: ActivatedRoute,
              private httpClient: HttpClient) {
    this.id = activateRoute.snapshot.params['id'];

    this.httpClient.get<AccessObject[]>(OBJECTS_URL,
      {
        responseType: "json",
        observe: "response"
      })
      .subscribe(response => {
        // @ts-ignore
        this.myAccessObjects = response.body
      })

    this.httpClient.get(DOCUMENT_URI + '/' + this.id, {
      responseType: "json",
      observe: "response"
    })
      .pipe(delay(1500))
      .subscribe(response => {
        // @ts-ignore
        this.accessDocument = response.body
        this.getPeople()
        this.getObjects()
        this.loading = false
      })
  }

  private getPeople() {
    this.httpClient.get<Person[]>(DOCUMENT_URI + '/' + this.id + '/people', {
      responseType: "json",
      observe: "response"
    })
      .subscribe(response => {
        // @ts-ignore
        this.people = response.body
        this.accepted = this.people.filter(person => person.reasonResult === '+').length
      })
  }

  private getObjects() {
    this.httpClient.get<Person[]>(DOCUMENT_URI + '/' + this.id + '/objects', {
      responseType: "json",
      observe: "response"
    })
      .subscribe(response => {
        // @ts-ignore
        this.accessObjects = response.body
        // @ts-ignore
        for (let i = 0; i < this.accessObjects.length; i++)
          this.httpClient.post(OBJECTNAME_URI, {
            // @ts-ignore
            objectName : this.accessObjects[i].title
          }, {
            responseType: "json",
            observe: "response"
          })
            .subscribe(response => {
              // @ts-ignore
              this.accessObjects[i].name = response.body.objectName
            })
      })
  }

  ngOnInit(): void {

  }

  downloadPDF() {
    this.httpClient.get(DOCUMENT_URI + '/' + this.id + '/pdf', {
      observe: "response",
      responseType: "blob"
    })
      .subscribe(data => {
        let fileName = Date.now().toString()
        let blob: Blob = data.body as Blob
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob);
        a.click()
      })
  }

  downloadExcel() {
    this.httpClient.get(DOCUMENT_URI + '/' + this.id + '/excel', {
      responseType: "blob"
    })
      .subscribe(data => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let fileName = Date.now().toString()
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob);
        a.click()
      })
  }

  downloadExcelWithPassports() {
    this.httpClient.get(DOCUMENT_URI + '/' + this.id + '/excelPassport', {
      responseType: "blob"
    })
      .subscribe(data => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let fileName = Date.now().toString()
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob);
        a.click()
      })
  }
}
