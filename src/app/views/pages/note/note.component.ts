import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  constructor(private noteService: NoteService) {}

  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp: any;

  @Output()
  notify = new EventEmitter();

  ngOnInit(): void {}

  confirmRemove() {
    if (confirm('Deseja realmente apagar?')) this.notify.emit();
  }

  editNote(note: Note) {
    this.noteService.notifyNewNoteEdit(note);

    const element = document.getElementById(note.id + '');
    element != undefined ? (element.className = 'editNote') : element;

    this.noteService.getNotes().subscribe({
      next: (apiNotes) => {
        apiNotes.forEach((element) => {
          if (element.id != note.id) {
          }
        });
      },
      error: (error) => console.error(error),
    });
  }
}
