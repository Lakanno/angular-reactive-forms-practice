import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { IPost } from './p.interface';
import { PostService } from './post.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  title = 'angular-reactive-forms';
  posts: IPost[] | undefined;

  constructor(private postService: PostService ){}
  // AbstractControl - saerTo mshobeli klasia
  form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      age: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      address: new FormGroup({
        house1: new FormControl('', [Validators.required]),
        house2: new FormControl('',  [Validators.required])
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

  get house2(){
    return this.form.get('address')!.get('house2') as FormControl
  }

  get age(){
    return this.form.get('age') as FormControl
  }


  get addressGroup(){
    return this.form.get('address') as FormGroup
  }
    // as დაბრუნდება FormGroup
  get name(){
    return this.form.get('name') as FormControl
  }

  get lastname(){
    return this.form.get('lastName') as FormControl
  }

  ngOnInit(){
    this.name.valueChanges.pipe(tap((data) =>console.log(data))).subscribe();
    this.lastname.valueChanges.pipe(tap((data) =>console.log(data))).subscribe();
  }


  onNewItem(inputEl: HTMLInputElement){
    if (this.form.valid) {
      console.log(inputEl.value);
      this.postService.addItem(inputEl.value);
      inputEl.value = '';
    }else{
      alert('Please Add ToDo List')
    }
  }


}
