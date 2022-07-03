import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css'],
})
export class FormNoteComponent implements OnInit {
  title = 'FIAP NOTES';
  textNoteValue: string = '';
  logoImage = '/assets/logo.png';
  isEdit: Boolean = false;
  id: number = 0;

  editingNote: Subscription;

  checkoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.editingNote = this.noteService.editNoteProvider.subscribe({
      next: (note: Note) => {
        if (note.id) {
          this.textNoteValue = note.text;
          this.isEdit = true;
          this.id = note.id;
        }
      },
      error: () => {},
    });
  }

  ngOnInit(): void {}

  sendNote() {
    if (this.checkoutForm.valid) {
      if (this.isEdit) {
        this.noteService
          .putNotes(this.checkoutForm.value.textNote, this.id)
          .subscribe({
            next: (note) => {
              this.checkoutForm.reset();
              this.noteService.notifyNewNoteSaveEdit(note);
              this.isEdit = false;
            },
            error: (error) => alert('Algo errado na inserção! ' + error),
          });
      } else {
        this.noteService.postNotes(this.checkoutForm.value.textNote).subscribe({
          next: (note) => {
            this.checkoutForm.reset();
            this.noteService.notifyNewNoteAdded(note);
          },

          error: (error) => alert('Algo errado na inserção! ' + error),
        });
      }
    }
  }
  get textNote() {
    return this.checkoutForm.get('textNote');
  }
}
