import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { CalendarEvent } from '../models/calendar-event.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.html',
  styleUrl: './add-event.less',
  standalone: false
})
export class AddEvent {
  newEvent: CalendarEvent = {
    id: -1,
    title: '',
    categoryId: -1,
    isImportant: false,
    location: undefined,
    url: undefined,
    details: '',
    startDate: new Date(),
    endDate: new Date(),
  };

  eventForm: FormGroup | undefined = undefined;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      objective: ['', Validators.required],
      category: ['', Validators.required],
      isImportant: ['', Validators.required],
      location: [''],
      url: [''],
      details: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  
}
