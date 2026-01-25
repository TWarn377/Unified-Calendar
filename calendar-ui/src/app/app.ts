import { Component, signal } from '@angular/core';
import { CoreModule } from './features/core/core-module';
import { CalendarModule } from './features/calendar/calendar.module';

@Component({
  selector: 'app-root',
  imports: [CalendarModule, CoreModule],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('calendar');
}
