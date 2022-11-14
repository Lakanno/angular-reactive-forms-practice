import { Injectable } from '@angular/core';
import { IPost } from './p.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: IPost[] = [
    {id: 1, name: 'Laka'},
    {id: 2, name: 'Lika'},
    {id: 3, name: 'Luka'},
  ]

  constructor() { }

  addItem(newName: string){
    this.posts.push({name: newName, id: 4})
  }
}
