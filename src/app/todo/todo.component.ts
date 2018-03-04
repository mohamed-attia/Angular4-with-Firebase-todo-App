import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo/sharedService/todo';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.retriveData();
  }

  retriveData(){
    this.todoService.getToDoList().snapshotChanges()
    .subscribe(res => {
      this.toDoListArray = [];
      //console.log("res",res)
      res.forEach(element => {
      //  console.log("element",element)
       var x = element.payload.toJSON();
       x["$key"] = element.key;
       this.toDoListArray.push(x);
      // console.log("x",x)
      })

      //sort array isChecked false  -> true
        this.toDoListArray.sort((a,b) => {
          return a.isChecked - b.isChecked;
        })
    });
  }//end retriveData

  onAdd(itemtitle){
   this.todoService.addTitle(itemtitle.value);
    itemtitle.value = null;
  }//end onAdd

  alterCheck(key:string,flag){
    this.todoService.checkOrUnCheckTitle(key,!flag)
  }//end alterCheck

  onDelete($key){
    this.todoService.removeTitle($key);
  }

}
