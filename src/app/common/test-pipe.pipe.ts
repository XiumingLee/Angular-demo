import { Pipe, PipeTransform } from '@angular/core';
// 自定义管道 getGender
@Pipe({
  name: 'testPipe'
})
export class TestPipePipe implements PipeTransform {
  transform(value: string) {
    console.log(value);
    let parse = JSON.parse(value);
    return parse['zh_CN'];
  }
}
