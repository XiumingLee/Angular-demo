import { Directive,Input, ElementRef, Renderer2, HostListener} from '@angular/core';

@Directive({
  selector: '[app-draggable][dragTag][draggedClass][dragData]'
})
export class DragDirective {

  private _isDraggable = false; // 是否可以拖动

  @Input() dragTag: string;
  @Input() draggedClass: string;
  @Input() dragData: any;

  @Input('app-draggable')  // 将值通过`app-draggable`赋给draggable
  set isDraggable(draggable: boolean) {
    this._isDraggable = draggable;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${draggable}`);
  }

  get isDraggable() {
    return this._isDraggable;
  }

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
  ) {
    this.saySelf(); // 此时值还没有传进来
    /*
      false
      undefined
      undefined
      undefined
     */
  }

  @HostListener('dragstart', ['$event'])  // 监听元素的拖拽开始(dragstart)事件
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) { // 判断产生事件的元素是不是当前元素。
      this.rd.addClass(this.el.nativeElement, this.draggedClass);  // 为元素添加样式class
    }
    this.saySelf();
    /*
       true
       task-item
       drag-start
       {id: "123456", name: "Xiuming Lee", url: "https://xiuminglee.cn"}
     */
  }

  @HostListener('dragend', ['$event'])  // 监听元素的拖拽结束(dragstart)事件
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass); // 为元素移除样式class
    }
    this.saySelf();
    /*
       true
       task-item
       drag-start
       {id: "123456", name: "Xiuming Lee", url: "https://xiuminglee.cn"}
     */
  }

  private saySelf(){
    console.log(this._isDraggable);
    console.log(this.dragTag);
    console.log(this.draggedClass);
    console.log(this.dragData);
  }

}
