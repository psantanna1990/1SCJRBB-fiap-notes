import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './@types/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl: string;

  private newNoteSource = new Subject<Note>();
  newNoteProvider = this.newNoteSource.asObservable();

  private editNote = new Subject<Note>();
  editNoteProvider = this.editNote.asObservable();

  private saveEditNoteSource = new Subject<Note>();
  saveEditNoteProvider = this.saveEditNoteSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://fiap-notes-api.herokuapp.com';
  }

  notifyNewNoteAdded(note: Note) {
    this.newNoteSource.next(note);
  }

  getNotes() {
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  removeNote(noteId: number) {
    return this.http.delete(`${this.apiUrl}/notes/${noteId}`);
  }

  postNotes(textNote: string) {
    return this.http.post<Note>(`${this.apiUrl}/notes`, { text: textNote });
  }

  putNotes(text: string, id: number) {
    return this.http.put<Note>(`${this.apiUrl}/notes/${id}`, { text: text });
  }

  notifyNewNoteEdit(note: Note) {
    this.editNote.next(note);
  }

  notifyNewNoteSaveEdit(note: Note) {
    this.saveEditNoteSource.next(note);
  }
}
