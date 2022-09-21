import { Component, OnInit } from '@angular/core';
import {InstructorsService} from "../../services/instructors.service";

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  constructor(private instructorsService: InstructorsService) { }

  ngOnInit(): void {
    this.instructorsService.getAll().subscribe((response: any) => {
      console.log(response);
    })
  }

}
