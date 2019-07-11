import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

declare var provice: any;
@Component({
  selector: 'app-cascade-selection',
  templateUrl: './cascade-selection.component.html',
  styles: []
})
export class CascadeSelectionComponent implements OnInit {

  cityOptions: any;
  area = {
    prefix: [],
    info: ''  // 详细地址
  };
  areaDetail:string;

  /* 由`_;`分开级联选择和详细地址*/
  // areaSimulation = '甘肃省/庆阳市/合水县_;合水县政务大厅';
  // areaSimulation = '甘肃省/庆阳市/合水县政务大厅';
  areaSimulation = '甘肃省/庆阳市/合水县_;';

  constructor(
    private message: NzMessageService
  ) {
    this.dealProviceData(); // 格式化数据
    this.pareAreaDate(this.areaSimulation); // 数据转换
    this.areaDetail = this.areaSimulation;
  }

  ngOnInit() {
  }

  //////////////////////////// 办理地点---开始///////////////////////////////////////
  /**
   * 解析数据
   * @param data
   */
  pareAreaDate(data: string) {
    if(data.indexOf('_;') != -1){ // 判断字符串中是否含有`_;`
      const areaArray = data.split('_;');
      console.log(areaArray);
      this.area.info = areaArray.pop(); // 取出最后一个作为详细信息
      this.area.prefix = areaArray.shift().split('/');
    } else {
      this.area.prefix = ['甘肃省','庆阳市','合水县'];
      this.area.info = data; // 详细信息
    }
  }
  /**
   * 处理省市县数据
   */
  dealProviceData() {
    const data = provice;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      data[i].label = data[i].value;
      if (!!data[i].children) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < data[i].children.length; j++) {
          data[i].children[j].label = data[i].children[j].value;
          if (!!data[i].children[j].children) {
            // tslint:disable-next-line:prefer-for-of
            for (let t = 0; t < data[i].children[j].children.length; t++) {
              data[i].children[j].children[t].label = data[i].children[j].children[t].value;
            }
          }
        }
      }
    }
    this.cityOptions = data;
  }

  onAreaChanges(values: any) {
    if (this.area.info.trim()){
      this.areaDetail = this.area.prefix.join('/') + '_;' + this.area.info;
      console.log(values, this.area.prefix);
      console.log(this.areaDetail);
    } else {
      // 如果详细信息为空则不赋值
      this.areaDetail = '';
      console.log('不赋值');
    }

  }

  //////////////////////////// 办理地点---结束///////////////////////////////////////

  /** success、error、warning*/
  submitForm(){
    this.message.create('success', `办理地点：${this.areaDetail}`);
  }
}
