import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SurveyFormComponent } from './app/components/survey-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SurveyFormComponent],
  template: `
    <app-survey-form></app-survey-form>
  `,
})
export class App {}

bootstrapApplication(App);
