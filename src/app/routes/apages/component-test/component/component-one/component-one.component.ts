import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styles: []
})
export class ComponentOneComponent implements OnInit {
  @Input() fatherData:any;  // 这里接收父组件传来的值

  validateForm:FormGroup;
  data ={
    username:'',
    sex:''
  }


  constructor(
    public fb:FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    console.log(this.fatherData);
    this.buildForm();
  }

  /** 构建表单 */
  buildForm(){
    this.validateForm = this.fb.group({
      username:[null,[Validators.required,Validators.pattern('[\\s\\S]*.*[^\\s][\\s\\S]*$')]],
      sex:[null,[Validators.required]],
    });
  }

  /** 校验表单 */
  checkingForm(){
    const form = this.validateForm;
    for (const key in form.controls) {
      const control = form.controls[key];
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  }
}
