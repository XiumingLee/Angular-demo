import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-validator',
  templateUrl: './form-validator.component.html',
  styles: []
})
export class FormValidatorComponent implements OnInit {
  validateForm: FormGroup;

  user = {
    userName:'', // 用户名称
    userNickName:'', // 用户昵称
  }


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    // 构建表单
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      nickname: [null],
      needNickName: [null],
    });
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  needNickNameChange(flag) {
    console.log(flag)
    if (flag == '2') { // 2的时候不需要验证
      this.validateForm.get('nickname')!.clearValidators();  // 清除验证
      this.validateForm.get('nickname')!.markAsPristine();
    } else {
      this.validateForm.get('nickname')!.setValidators(Validators.required);
      this.validateForm.get('nickname')!.markAsDirty();
    }
    this.validateForm.get('nickname')!.updateValueAndValidity();
  }

}
