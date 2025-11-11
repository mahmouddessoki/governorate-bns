import { Component, OnInit, afterRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// flowbite
import { initFlowbite } from 'flowbite';

// global spinner
import { NgxSpinnerComponent } from 'ngx-spinner';
// toaster

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'governorate';
  constructor() {
    afterRender(() => {
      initFlowbite(); // reinitialize Flowbite components
    });
  }

  ngOnInit(): void {

  }
}
