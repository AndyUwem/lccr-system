import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input('isInternetError') isInternetError!: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  public reload(): void {
      window.location.reload()
  }


}
