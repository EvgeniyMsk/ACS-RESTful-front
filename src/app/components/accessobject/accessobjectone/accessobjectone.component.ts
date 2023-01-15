import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-accessobjectone',
  templateUrl: './accessobjectone.component.html',
  styleUrls: ['./accessobjectone.component.css']
})
export class AccessobjectoneComponent implements OnInit {
  id: number

  constructor(private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
