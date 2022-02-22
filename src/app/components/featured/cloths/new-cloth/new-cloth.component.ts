import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cloth } from 'src/app/interface/cloth.interface';

@Component({
  selector: 'app-new-cloth',
  templateUrl: './new-cloth.component.html',
  styleUrls: ['./new-cloth.component.css']
})
export class NewClothComponent implements OnInit {

  public newClothForm!: FormGroup;
  @Output('newClothEmitter') newClothEmitter = new EventEmitter<Cloth>()
  
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

  private sendNewClothToParent(): void {
    this.newClothEmitter.emit(this.newClothForm.value)
  }

  public saveNewCloth(): void{
    if(this.newClothForm.valid)
      this.sendNewClothToParent()

      this.newClothForm.reset();
  }

  public cancelNewClothForm() : void {
    this.newClothForm.reset();
  }

  
}
