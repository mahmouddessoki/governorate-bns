import { Component, effect, input } from '@angular/core';
import { Table } from '../../../models/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  tableHead = input<(keyof Table)[]>();
  tableData = input<Table[]>([]);

  constructor() {
    effect(() => {
      console.log('Data from parent:', this.tableData());
    });
  }
}
