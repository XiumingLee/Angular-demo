import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentOneComponent } from '../component/component-one/component-one.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styles: []
})
export class DetailPageComponent implements OnInit {
  // @ts-ignore
  @ViewChild(ComponentOneComponent)
  componentOne:ComponentOneComponent;

  fatherData = { // 传给子类的数据
    type:1,
  }

  constructor(
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  save(){
    this.componentOne.checkingForm(); // 调用子类的方法。
    if (this.componentOne.validateForm.invalid) {
      this.message.create('error', `请完善表单信息！`);
    }else {
      this.message.create('success', `表单信息完善！`);
    }
  }

  changeFatherData(){
    // 改变传入子组件的值
    this.fatherData.type = Math.floor(Math.random()*10); // 0-9之间的数
  }

}
