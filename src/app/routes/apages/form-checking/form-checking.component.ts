import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-checking',
  templateUrl: './form-checking.component.html',
  styles: []
})
export class FormCheckingComponent implements OnInit {

  validateForm:FormGroup;
  data = {name:''};

  constructor(
    public fb:FormBuilder,
    private message: NzMessageService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  /** 构建表单 */
  buildForm(){
    this.validateForm = this.fb.group({
      name:[null,Validators.required,this.customValidator]
    });
  }

  /* 自定义的校验方法 - 开始 */
  customValidator = (control: FormControl): Promise<{ [s: string]: boolean }> => {
    console.log(`自定义的校验器--》${control.value}`);
    return new Promise((resolve) => {
      if (!control.value) {
        resolve({ required: true });
      } else if (control.value !== '李修明') {
        resolve({ customValid: true, error: true});
      }
      resolve(null)
      // return {};
    })
  };

  customValidator2(): ValidatorFn{
    return (control: FormControl): { [key: string]: any } => {
      console.log(`自定义的校验器2--》${control.value}`);
      if (!control.value) {
        return { required: true };
      } else if (control.value !== '李修明') {
        return { customValid: true, error: true };
      }
      return null;
    }
  }
  /* 自定义的校验方法 - 结束 */

  /** 校验表单 */
  checkingForm(){
    const form = this.validateForm;
    for (const key in form.controls) {
      const control = form.controls[key];
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  }

  /** success、error、warning*/
  submitForm(){
    this.checkingForm();
    /**
     * **VALID**: This control has passed all validation checks.此控件已通过所有验证检查。
     * **INVALID**: This control has failed at least one validation check.此控件至少一次验证检查失败。
     * **PENDING**: This control is in the midst of conducting a validation check.该控件正在进行验证检查。
     * **DISABLED**: This control is exempt from validation checks.此控件不受验证检查
     */
    if (this.validateForm.invalid){ // 推荐使用invalid判断是否全部通过校验
      this.message.create('error', `请完善表单信息！`);
    } else {
      this.message.create('success', `表单信息完善！`);
    }
  }
}
