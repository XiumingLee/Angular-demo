import { Component, OnInit } from '@angular/core';

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
  areaSimulation = '甘肃省/庆阳市/合水县/合水县政务大厅';

  constructor() {
    console.log(provice);
    this.dealProviceData();
    console.log(this.cityOptions);
    this.pareAreaDate(this.areaSimulation);
  }

  ngOnInit() {
  }

  //////////////////////////// 办理地点---开始///////////////////////////////////////
  pareAreaDate(data: string) {
    const areaArray = data.split('/');
    this.area.info = areaArray.pop();
    this.area.prefix = areaArray;
    console.log(areaArray);
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
    console.log(values, this.area.prefix);
    console.log(values.join('/') + '/' + this.area.info);
  }

  //////////////////////////// 办理地点---结束///////////////////////////////////////

}
