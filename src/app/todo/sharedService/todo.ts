import {Injectable} from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TodoService {
    toDoList: AngularFireList<any>;
    constructor(private angularfireDb:AngularFireDatabase){}
 
    getToDoList(){
        this.toDoList = this.angularfireDb.list('title');
        return this.toDoList;
    }

    addTitle(title:string){
        this.toDoList.push({
            title:title,
            isChecked:false
        })
    }

    removeTitle($key: string) {
        this.toDoList.remove($key);
      }

      checkOrUnCheckTitle($key: string, flag: boolean) {
        this.toDoList.update($key, { isChecked: flag });
      }  
}
