import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-cloth',
  templateUrl: './new-cloth.component.html',
  styleUrls: ['./new-cloth.component.css']
})
export class NewClothComponent implements OnInit {

  public newClothForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeNewClothForm()
  }


  private initializeNewClothForm(): void {
    this.newClothForm = this.fb.group({
      clothName: this.fb.control('', Validators.required),
      clothColor: this.fb.control('', Validators.required),
      clothCategory: this.fb.control('', Validators.required),
      serviceType: this.fb.control('', Validators.required),
      clothStatus: this.fb.control('In Progress'),
      deliveryStatus: this.fb.control('Not Delivered'),
      cost: this.fb.control('', Validators.required),
      pickUpDate: this.fb.control('', Validators.required),
      clothRegistrationDate: [new Date().toUTCString()],
      description: this.fb.control('', Validators.required)
    })
  }

  public get f(): {[key: string]: AbstractControl} {
    return this.newClothForm.controls;
  }


}
