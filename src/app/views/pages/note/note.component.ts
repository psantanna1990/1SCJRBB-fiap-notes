import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {



  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp: any;

  @Input() 
  isEdit: boolean = false;

  @Output()
  notify = new EventEmitter();

  @Output() 
  updateNotify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  confirmRemove(){
    if(confirm("Deseja realmente apagar?"))
      this.notify.emit();
  }

  editar() {
    this.isEdit = !this.isEdit;
    console.log("isEdit", this.isEdit);
  }

  alterar() {
    this.updateNotify.emit();
    this.isEdit = !this.isEdit;
  }

}
