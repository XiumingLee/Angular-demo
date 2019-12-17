import { Component, OnInit,ViewChild } from '@angular/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd/core';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-modal-transfer',
  templateUrl: './modal-transfer.component.html',
  styles: [],
  styleUrls:['./modal-transfer.component.less']
})
export class ModalTransferComponent implements OnInit {
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent: NzTreeComponent;
  list: TransferItem[] = [];

  radioValue:any;

  searchValue = '';

  type = "checkbox" ;// 是多选(checkbox)还是单选(radio)

  rawData: NzTreeNodeOptions[] = [
    {
      id:'1',
      title: '泰华智慧产业集团',
      key: '100',
      children: [
        { id:'A11',
          title: '大数据与人工智能',
          key: 'A1000',
          children: [
            { id:'A11', title: '辛国茂',imgSrc:'./assets/tmp/img/1.png', key: 'A1000',  isLeaf: true },
          ]
        },
        { id:'11', title: '张佳宁',imgSrc:'./assets/tmp/img/1.png', key: '1000',  isLeaf: true },
        { id:'12', title: '王守坤',imgSrc:'./assets/tmp/img/2.png', key: '1001',  isLeaf: true }
      ]
    },
    {
      id:'2',
      title: '物联网业务部',
      key: '101',
      children: [
        { id:'21',title: '郑其荣', key: '1011', imgSrc:'./assets/tmp/img/3.png', isLeaf: true },
        { id:'22',title: '韩鹏鹏', key: '1012', imgSrc:'./assets/tmp/img/4.png', isLeaf: true },
        { id:'23',title: '郑其荣', key: '1014', imgSrc:'./assets/tmp/img/3.png', isLeaf: true },
        { id:'24',title: '韩鹏鹏', key: '1015', imgSrc:'./assets/tmp/img/4.png', isLeaf: true },
        { id:'25',title: '郑其荣', key: '1016', imgSrc:'./assets/tmp/img/3.png', isLeaf: true },
        { id:'26',title: '韩鹏鹏', key: '1017', imgSrc:'./assets/tmp/img/4.png', isLeaf: true },
        { id:'27',title: '郑其荣', key: '1018', imgSrc:'./assets/tmp/img/3.png', isLeaf: true },
        { id:'28',title: '韩鹏鹏', key: '1019', imgSrc:'./assets/tmp/img/4.png', isLeaf: true },
        { id:'29',title: '郑其荣', key: '1013', imgSrc:'./assets/tmp/img/3.png', isLeaf: true },
        { id:'30',title: '韩鹏鹏', key: '1020', imgSrc:'./assets/tmp/img/4.png', isLeaf: true },
      ]
    }
  ];


  showNodesStack = []; // 返回时使用
  activedNode: NzTreeNode;
  showNodes: NzTreeNodeOptions[] = JSON.parse(JSON.stringify(this.rawData));
  checkedNodes: NzTreeNodeOptions[] = [
  ];


  constructor() { }

  ngOnInit() {
  }

    // 点击条目
    activeNode(data: NzFormatEmitEvent): void {
    if (data.node.origin.children){
      this.showNodesStack.push(this.showNodes);
      this.showNodes = data.node.origin.children;
    }
    this.activedNode = data.node!;
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
    if (event.node.origin.isLeaf && event.node.origin.checked){ // 选中人员
      this.checkedNodes.push(event.node.origin);
      this.checkedNodes = [...this.checkedNodes];
    } else if(event.node.origin.isLeaf && !event.node.origin.checked){ // 取消选中人员
      this.removeUserFromCheckedNodes(event.node.origin);
    } else if (!event.node.origin.isLeaf && event.node.origin.checked) { // 选中机构部门
      // 遍历，将其子节点的全部选中。添加到已选中的数组中。
      this.traversalAddUser(event.node.origin.children);
    } else if(!event.node.origin.isLeaf && !event.node.origin.checked){ // 取消该部门所有的人员选择。
      // 删除选中数组中的即可。
      this.traversalRemoveUserFromCheckedNodes(this.showNodes)

    }
  }

  reBack(){
    const set = new Set(this.showNodesStack);
    this.showNodesStack = [...set];
    if(this.showNodesStack.length>0){
      const item = this.showNodes;
      this.showNodes = this.showNodesStack.pop();
    }
    this.updateCheckedNodes();
  }

  clearChecked(){
      this.checkedNodes = [];
      this.nzTreeComponent.nzCheckedKeys = [];
  }

  radioValueChange(){ // 单选改变时
      this.checkedNodes = [this.radioValue.origin];
      console.log(this.radioValue)
  }

  removeRadioValue(node){
    if (this.type == "radio"){ // 单选
      this.checkedNodes = [];
      this.radioValue = null;
    } else { // TODO 多选，移除选择状态
      this.traversalRemoveUser(node.origin);
    }
    this.updateCheckedNodes();
  }

  // 遍历节点下所有人员并添加到选中人员上。
  traversalAddUser(arr:NzTreeNodeOptions[]){
    for (let i = 0; i < arr.length; i++) {
      const node = arr[i];
      if(!node.isLeaf && node.children.length > 0){
        this.traversalAddUser(node.children);
      } else {
        this.checkedNodes.push(node);
      }
    }
    // 防止重复添加
    const set = new Set(this.checkedNodes);
    this.checkedNodes = [...set];
  }

  traversalRemoveUser(node:NzTreeNodeOptions){
    this.removeUserFromCheckedNodes(node);
    this.updateCheckedNodes();

  }
  traversalRemoveUserFromCheckedNodes(arr:NzTreeNodeOptions[]){
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if(!item.isLeaf && item.children.length > 0){
        this.traversalRemoveUserFromCheckedNodes(item.children);
      } else {
        this.removeUserFromCheckedNodes(item);
      }
    }
  }
  removeUserFromCheckedNodes(node:NzTreeNodeOptions){
    this.checkedNodes = this.checkedNodes.filter(e => e.id != node.id);
  }

  updateCheckedNodes(){
    const checkedKeys = [];
    this.checkedNodes.forEach(e=>{
      checkedKeys.push(e.key);
    })
    const me = this;
    setTimeout(()=>{
      me.nzTreeComponent.nzCheckedKeys = checkedKeys;
    },100)
  }


}
