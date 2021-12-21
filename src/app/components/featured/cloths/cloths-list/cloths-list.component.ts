import { Component, Input, OnInit } from '@angular/core';
import { Cloth } from 'src/app/interface/cloth.interface';

@Component({
  selector: 'app-cloths-list',
  templateUrl: './cloths-list.component.html',
  styleUrls: ['./cloths-list.component.css']
})
export class ClothsListComponent implements OnInit {

  @Input('customer') customerCloths!: Cloth[]

  constructor() { }

  ngOnInit(): void {

  }

}
