import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Person} from "../../entity/Person";
import {delay} from "rxjs/operators";

const SEARCH_URL = environment.BACKEND_ADDRESS + '/api/data/search'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup
  loading: boolean = false
  showResult: boolean = false
  people: Person[]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      firstname: new FormControl('', Validators.minLength(3)),
      patronymic: new FormControl('')
    })
  }

  searchPerson() {
    this.loading = true
    this.httpClient.post<Person[]>(SEARCH_URL, {
      lastname: this.searchForm.get('lastname')?.value,
      firstname: this.searchForm.get('firstname')?.value,
      patronymic: this.searchForm.get('patronymic')?.value,
    }, {
      responseType: "json",
      observe: "response"
    })
      .subscribe(response => {
        // @ts-ignore
        this.people = response.body
        this.loading = false
        this.showResult = true
      })
  }

  getErrorMessage() {
    if (this.searchForm.get('lastname')?.hasError('required')) {
      return 'Поле не должно быть пустым';
    }

    return this.searchForm.get('lastname')?.hasError('minlength') ? 'Длина не менее 3 символов' : '';
  }

  clear() {
    this.searchForm.reset('lastname')
    this.searchForm.reset('firstname')
    this.searchForm.reset('patronymic')
  }
}
