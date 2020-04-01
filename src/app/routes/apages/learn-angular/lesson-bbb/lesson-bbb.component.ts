import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson-bbb',
  templateUrl: './lesson-bbb.component.html',
  styleUrls:['./lesson-bbb.component.less']
})
export class LessonBbbComponent implements OnInit {

  markData = {
    id:'123456',
    name:'Xiuming Lee',
    url:'https://xiuminglee.cn'
  };

  constructor() { }

  ngOnInit() {
  }

}
