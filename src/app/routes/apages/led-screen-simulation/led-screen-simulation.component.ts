import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadXHRArgs} from "ng-zorro-antd";
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-led-screen-simulation',
  templateUrl: './led-screen-simulation.component.html',
  styleUrls: ['./led-screen-simulation.component.less']
})
export class LedScreenSimulationComponent implements OnInit {

  page={
    type:"1", // 页面类型 1：新增。2：修改
  };


  editForm: FormGroup;  // 表单
  data: any = {}; // 数据

  fileTypeList="image/png,image/jpeg,image/gif,image/bmp";
  // "video/mp4,video/ogg,video/mkv,video/mov";

  // region变量选择框相关。
  varModalVisible = false;
  varTags = [ {label:'温度',value:'temperature'}, {label:'湿度',value:'humidity'}, {label:'天气',value:'weather'} ];
  selectedTags = [];
  modalCurrentTextObj:any = {}; // 打开变量模态框时的textObj
  // endregion变量选择框相关。

  exhibitionAreaStyle ={
    "background-color": "black",
    "width": "500px",
    "height": "400px",
  };


  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private http: HttpClient,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.data.textArray = [];
    this.data.textArray.push(this.inintText());// 默认有一个文本输入框
  }



  save(){
    // 校验表单
    this.validateForm();
    if (!this.editForm.valid) {
      this.message.create('error', "请完善数据后再提交！");
      return;
    }
  }

  // 添加文本域
  addText(){
    this.data.textArray.push(this.inintText());
    console.log(this.data);
  }

  // 删除文本域
  deleteText(textObj){
    this.data.textArray = this.data.textArray.filter(e => e.sort != textObj.sort);
    // 如果已经添加到了显示区，显示区也删掉
    console.log(this.data);
  }

  // 文本域的样式相关改变时
  textStyleChange(textObj){
    if (!textObj.style){
      textObj.style = {};
    }
    /** 简单样式 */
    // region x/y
    if(textObj.x){
      textObj.style.left = textObj.x + "px";
    } else {
      textObj.x = 0;
      textObj.style.left = "0px";
    }
    if(textObj.y){
      textObj.style.top = textObj.y + "px";
    } else {
      textObj.y = 0;
      textObj.style.top = "0px";
    }
    // endregion x/y
    // region 字体大小
    if(textObj.fontsize){ // 字体大小
      textObj.style["font-size"] = textObj.fontsize;
    } else {
      textObj.style["font-size"] = "12px";
    }
    // endregion 字体大小
    // region 字体颜色
    if(textObj.color){ // 字体颜色
      textObj.style.color = textObj.color;
    } else {
      textObj.style.color = "red";
    }
    // endregion 字体颜色
    // region 字体类型
    if(textObj.fonttype){ // 字体类型
      textObj.style["font-family"] = textObj.fonttype;
    }
    // endregion 字体类型
    // region 加粗？
    if(textObj.bold){ // 字体颜色
      textObj.style["font-weight"] = "bold";
    } else {
      textObj.style["font-weight"] = "normal";
    }
    // endregion 加粗？
    // region 倾斜？
    if(textObj.italics){ // 字体颜色
      textObj.style["font-style"] = "italic";
    } else {
      textObj.style["font-style"] = "normal";
    }
    // endregion 倾斜？
    // region 是否自动换行？
    if(textObj.linefeed){ // 字体颜色
      textObj.style["word-break"] = "break-all";
    } else {
      textObj.style["word-break"] = "normal";
    }
    // endregion 是否自动换行？

    /*
    // 删除属性
    delete textObj.style.firstname;
     */
    console.log(textObj);
  }

  // 素材类型改变时
  typeChange(v){
    this.data.filepath = '';
    if ("WJLXWB" != v) {
      this.editForm.get('resolution').clearValidators();
      this.editForm.get('resolution').markAsPristine();
      this.editForm.get('textContent').clearValidators();
      this.editForm.get('textContent').markAsPristine();
      if ("WJLXTP" == v){
        this.fileTypeList = "image/png,image/jpeg,image/gif,image/bmp";
      } else if("WJLXSP" == v){
        this.fileTypeList = "video/mp4,video/ogg,video/mkv,video/mov";
      }
    } else {
      this.editForm.get('resolution').setValidators(Validators.required);
      this.editForm.get('resolution').markAsDirty();
      this.editForm.get('textContent').setValidators([
        Validators.required,
        Validators.maxLength(35),
        Validators.pattern('^[\\s\\S]*.*[^\\s][\\s\\S]*$')
      ]);
      this.editForm.get('textContent').markAsDirty();
    }
    this.editForm.updateValueAndValidity();
  }


  // 新增文本域时使用
  inintText(){
    // 设置一些默认值
    const text = {
      sort:new Date().getTime(),
      alignment:'left',
      color: 'red',
      fontsize: '12px',
      x:0,
      y:0,
      var:[],
      style:{},
    };
    return text;
  }


  // 获取各个文本域div的宽和高
  setWidthAndHeight(textObj,divElement){
    textObj.with = divElement.offsetWidth;
    textObj.height = divElement.offsetHeight;
  }

  /** region 添加变量相关区域*/
  // 点击添加变量
  addVar(textObj){
    // 设置该文本域变量的回显的事宜
    this.modalCurrentTextObj = textObj;
    this.selectedTags = textObj.var;
    this.varModalVisible = true;
  }

  varModalHandleCancel(){
    this.varModalVisible = false;
  }
  varModalHandleOk(){
    this.modalCurrentTextObj.var = this.selectedTags;
    this.varModalVisible = false;
  }
  varTagsHandleChange(checked: boolean, tag): void {
    if (checked) {
      // 文本域中的内容也需要添加加上。
      this.selectedTags.push(tag.value);
      if (!this.modalCurrentTextObj.text){
        this.modalCurrentTextObj.text = "";
      }
      this.modalCurrentTextObj.text = this.modalCurrentTextObj.text + `\${${tag.value}}`;
    } else {
      // 删除，也是删除文本域中的变量。
      this.selectedTags = this.selectedTags.filter(t => t !== tag.value);
      this.modalCurrentTextObj.text = this.modalCurrentTextObj.text.replace(new RegExp("\\${" + tag.value + "}"), "");
    }
  }
  /** endregion*/

  // 显示区大小改变设置展示区大小
  resolutionChange(value:string){
    const sizeArr = value.split("*");
    this.exhibitionAreaStyle.width = sizeArr[0] + "px";
    this.exhibitionAreaStyle.height = sizeArr[1] + "px";
    this.setBackgroundFileToView();
  }


  // 类型为视频或图片时右侧文件上传
  customReq = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('id', '1000');
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress : true,
      responseType: "text",
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event instanceof HttpResponse) {
        // 处理成功
        item.onSuccess(event.body, item.file, event);
        this.data.filepath = event.body;
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }

  /**region 背景素材相关*/
    // 背景素材上传文件
  customBackgroundFile = (item: UploadXHRArgs) => {
    this.data.backgroundtype = "1";
    this.data.backgroundname = "bg4.jpg";
    this.data.backgroundurl = "./assets/tmp/img/bg4.jpg";

    /**
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('id', '1000');
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress : true,
      responseType: "text",
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event instanceof HttpResponse) {
        // 处理成功
        item.onSuccess(event.body, item.file, event);
        this.data.backgroundname = event.body;
        this.data.backgroundurl = "网络地址"  + event.body;
        this.setBackgroundFileToView();
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
     */
  }
  // 删除背景素材文件
  deleteBackgroundFile(){
    this.data.backgroundurl = '';
    this.data.backgroundname = '';
  }
  // 背景素材类型改变时
  backgroundTypeChange(){
    this.data.backgroundurl = '';
    this.data.backgroundname = '';
  }
  // 将背景文件添加到展示区
  setBackgroundFileToView(){
    this.data.backgroundfilestyle = {};
    this.data.backgroundfilestyle.position = "absolute";
    this.data.backgroundfilestyle.width = this.exhibitionAreaStyle.width;
    this.data.backgroundfilestyle.height = this.exhibitionAreaStyle.height;
  }
  /**endregion 背景素材相关*/

  // *表单验证相关=============
  // 创建表单,用于表单验证
  buildForm() {
    this.editForm = this.fb.group({
      name: [
        this.data.name,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[\\s\\S]*.*[^\\s][\\s\\S]*$')
        ]
      ],
      type: [
        this.data.type,
        [
          Validators.required
        ]
      ],
      category: [
        this.data.category,
        [
          Validators.required
        ]
      ],
      resolution: [null],
      textContent: [null],
    })
  }
  // 表单校验 ，在提交表单时调用此方法
  validateForm() {
    const form = this.editForm;
    for (const key in form.controls) {
      const control = form.controls[key];
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  };
  // *表单验证相关=============end

  reback(){

  }

  /**region 背景音频相关*/
  // 背景音频上传文件
  // customAudioFile = (item: UploadXHRArgs) => {
  //   // 构建一个 FormData 对象，用于存储文件或其他参数
  //   const formData = new FormData();
  //   // tslint:disable-next-line:no-any
  //   formData.append('file', item.file as any);
  //   formData.append('id', '1000');
  //   const req = new HttpRequest('POST', item.action, formData, {
  //     reportProgress : true,
  //     responseType: "text",
  //     withCredentials: true
  //   });
  //   // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
  //   return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
  //     if (event instanceof HttpResponse) {
  //       // 处理成功
  //       item.onSuccess(event.body, item.file, event);
  //       console.log(event.body);
  //       this.data.audioname = event.body;
  //       this.data.audio = this.config.baseUrl  + event.body;
  //     }
  //   }, (err) => {
  //     // 处理失败
  //     item.onError(err, item.file);
  //   });
  // }
  // // 删除背景音频
  // deleteAudioFile(){
  //   this.data.audio = '';
  //   this.data.audioname = '';
  // }
  /**endregion 背景音频相关*/


}
