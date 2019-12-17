import { Component, OnInit } from '@angular/core';
import { setHours } from 'date-fns';
import { addDays } from 'date-fns';
import {Location} from '@angular/common';


import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starttime-endtime',
  templateUrl: './starttime-endtime.component.html',
  styles: [],
})
export class StarttimeEndtimeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  startValue = '2020-02-03';
  endValue = '2020-03-09';


  ///////////////////////////////////////// 以下范围时间///////////////////////////////////////////////
  dateRange = [new Date(),addDays(new Date(), 3)]; // [ new Date(), addDays(new Date(), 3) ];
  dateRangeStartTime = '';
  dateRangeEndTime = '';

  ngOnInit() {
    // 获取当前url
    const path = this.location.path();
    console.log(path);
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > new Date(this.endValue).getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= new Date(this.startValue).getTime();
  };

  onStartChange(date: Date): void {
    console.log('onStartChange');
    console.log(date);
    if (date) {
      this.startValue = moment(date).format('YYYY-MM-DD');
    } else {
      this.startValue = '';
    }
    console.log(this.startValue);
  }

  onEndChange(date: Date): void {
    console.log('onEndChange');
    console.log(date);
    if (date) {
      this.endValue = moment(date).format('YYYY-MM-DD');
    } else {
      this.endValue = '';
    }
    console.log(this.endValue);
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
    console.log(this.dateRange);
    if (this.dateRange.length != 0) {
      this.dateRangeStartTime = moment(this.dateRange[0]).format('YYYY-MM-DD H:mm:ss');
      this.dateRangeEndTime = moment(this.dateRange[1]).format('YYYY-MM-DD H:mm:ss');
    } else {
      this.dateRangeStartTime = '';
      this.dateRangeEndTime = '';
    }
    console.log(this.dateRangeStartTime,this.dateRangeEndTime);
  }

  onOk(result: Date): void {
    console.log('onOk', result);
    console.log(this.dateRange);
    if (this.dateRange.length != 0) {
      this.dateRangeStartTime = moment(this.dateRange[0]).format('YYYY-MM-DD H:mm:ss');
      this.dateRangeEndTime = moment(this.dateRange[1]).format('YYYY-MM-DD H:mm:ss');
    } else {
      this.dateRangeStartTime = '';
      this.dateRangeEndTime = '';
    }
    console.log(this.dateRangeStartTime,this.dateRangeEndTime);
  }
///////////////////////////////////////// 范围时间--结束///////////////////////////////////////////////

}
