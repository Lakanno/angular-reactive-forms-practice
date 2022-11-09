import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries = ['usa', 'georgia', 'ukraine']
  cities: String[] = [];

  //@ts-ignore
  countryToCities = new Map([
    ['georgia', ['tbilisi', 'rustavi']],
    ['ukraine', ['kharkov', 'lvov']],
    ['usa', ['california', 'washington']],
  ])

  formCount = new FormGroup({
    country: new FormControl(null),
    city: new FormControl(null),
  })

  form = new FormGroup({
    age: new FormControl(),
    pin: new FormControl(),
  })

  constructor() { }

  ngOnInit(): void {
    this.valueChanges();
    this.ageValueChanges();
  }

  logForm(){

  }

  valueChanges(){
   this.country.valueChanges.pipe(tap((data) =>{
    const cities = this.countryToCities.get(data) as String[];
    //ეს ბექმა მომცა 
    this.cities = [...cities]
   })).subscribe()
  }
  
  // ageValueChanges(){
  //   this.age.valueChanges.pipe(
  //     tap((age) =>{
  //       if (Number(age) >= 18) {
  //         this.pin.setValidators([Validators.required]);
  //       }else{
  //         this.pin.clearValidators();
  //       }
  //       this.pin.updateValueAndValidity();
  //   })).subscribe()
  // }

  ageValueChanges(){
    this.age.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(), //ადარებს ერტმაეთს
      tap((age) =>{
        console.log(age);
        
    })).subscribe()
  }
  // debounceTime ლოგები რომ თავიდან ავიცილოთ, ამიტომ დაელოდება ტითოეული 


  get country(){
    return this.formCount.get('country') as FormControl
  }

  get age(){
    return this.form.get('age') as FormControl
  }

  get pin(){
    return this.form.get('pin') as FormControl
  }


}
