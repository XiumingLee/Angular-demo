import {Component, OnInit, Injector, Inject} from '@angular/core';
import {Person} from "../modal/person.modal";

@Component({
  selector: 'app-lesson-aaa',
  templateUrl: './lesson-aaa.component.html',
  styles: []
})
export class LessonAaaComponent implements OnInit {

  constructor(
    private person:Person,
    @Inject('BASE_CONFIG') private config,
  ) {
    console.log(this.person);
    console.log(this.config);
  }

  ngOnInit() {
    this.person.say();
  }

}

