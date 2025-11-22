import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartDataService } from '../../../../features/display-data/service/chart-data.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  cardRoute = input<string>();
  pageType = input<string>('');
  private readonly chartDataService = inject(ChartDataService);
  constructor() {
    console.log('Card Component initialized with route:', this.cardRoute());
    console.log('Card Component initialized with pageType:', this.pageType());
  }

  changePageType() {
    this.chartDataService.pageType.set(this.pageType());
    console.log('Page Type changed to:', this.pageType());
  }
}
