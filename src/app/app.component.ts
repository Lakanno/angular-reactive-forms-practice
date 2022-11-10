import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-reactive-forms';

  // AbstractControl - saerTo mshobeli klasia
  form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl(''),

      address: new FormGroup({
        house1: new FormControl(),
        house2: new FormControl()
      })
    }
  )

  logForm(){
    console.log(this.form.valid);
    if(this.form.invalid){
      this.form.markAllAsTouched();
    }
  }

  get house1(){
    return this.form.get('address')!.get('house1') as FormControl
  }

  get addressGroup(){
    return this.form.get('address') as FormGroup
  }

  get name(){
    return this.form.get('name') as FormControl
  }

  // as დაბრუნდება FormGroup

  ngOnInit(){
    this.name.valueChanges.pipe(tap((data) =>console.log(data))).subscribe()
  }
}
