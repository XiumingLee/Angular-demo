import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styles: [],
  styleUrls:['./editable-table.component.less']
})
export class EditableTableComponent implements OnInit {
  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  itemNum = 0; // 事项的数量
  validateForm: FormGroup;
  currentItem={edit: false, data: {}}; // 当前正在编辑的事项

  testData = [
    {id:'01',name:'公安局'},
    {id:'02',name:'税务局'},
    {id:'03',name:'住建局'},
  ]

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {
    this.validateForm = this.fb.group({});
  }

  ngOnInit(): void {
    for (let i = 1; i < 2; i++) {
      const item = {
        id: `item${i}`,
        dept: `01`,
        name: `01`,
      }
      this.listOfData.push(item);
      this.addValidate(item);
      this.itemNum++;
    }
    this.updateEditCache();
    console.log(this.editCache)
  }

  save(){
    console.log(this.listOfData)
  }


  /** 开启行编辑*/
  startEdit(id: string): void {
    this.editCache[id].edit = true;
    this.currentItem = this.editCache[id];
  }

  /** 取消行编辑*/
  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  /** 保存行编辑*/
  saveEdit(id: string): void {
    this.checkingForm();
    if (!this.validateForm.invalid) {
      const index = this.listOfData.findIndex(item => item.id === id);
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
      return;
    }
    console.log("请完善表单")
  }

  /** 更新编辑缓存*/
  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  addEditCache(item): void {
      this.editCache[item.id] = {
        edit: true,
        data: { ...item }
      };
    this.currentItem = this.editCache[item.id];
  }

  /** 添加一行*/
  addRow(): void {
    // 添加时判断是否有未保存的行。
    if (this.currentItem.edit) {
      this.message.create('error', `请先保存上一行信息！`);
      return;
    }

    this.itemNum++;
    const item = {
      id: `item${this.itemNum}`,
      dept: ``,
      name: ``,
    }
    this.listOfData = [...this.listOfData,item];
    this.addEditCache(item);
    this.addValidate(item);
  }

  /** 删除一行*/
  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    this.removeValidate(this.editCache[id].data);
    delete this.editCache[id];
  }

  /** 添加验证*/
  addValidate(data: any): void{
    this.validateForm.addControl(
      `${data.id}dept`,
      new FormControl(null, Validators.required)
    );
    this.validateForm.addControl(
      `${data.id}name`,
      new FormControl(null, Validators.required)
    );
  }

  /** 删除验证*/
  removeValidate(data: any): void{
    this.validateForm.removeControl(`${data.id}dept`);
    this.validateForm.removeControl(`${data.id}name`);
  }

  /** 校验表单*/
  checkingForm(){
    const form = this.validateForm;
    console.log(form);
    for (const key in form.controls) {
      const control = form.controls[key];
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  }

  deptChange(event){
    console.log(event);
  }
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

}
