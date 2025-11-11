import { Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { Table } from '../../shared/models/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-log',
  imports: [SectionHeaderComponent, TableComponent],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss',
})
export class ActivityLogComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  @Input() id: string = '';
  tableHeader = signal<(keyof Table)[]>([
    'last updated',
    'status',
    'customer name',
    'subject',
    'ticket id',
  ]);
  tableData = signal<Table[]>([
    {
      'last updated': 'Jan 5, 2025',
      status: 'open',
      'customer name': 'ahmed mohamed',
      subject: 'good',
      'ticket id': '#003',
    },
    {
      'last updated': 'Jan 5, 2025',
      status: 'open',
      'customer name': 'ahmed mohamed',
      subject: 'good',
      'ticket id': '#003',
    },
    {
      'last updated': 'Jan 5, 2025',
      status: 'open',
      'customer name': 'ahmed mohamed',
      subject: 'good',
      'ticket id': '#003',
    },
    {
      'last updated': 'Jan 5, 2025',
      status: 'resolved',
      'customer name': 'ahmed mohamed',
      subject: 'good',
      'ticket id': '#003',
    },
  ]);
  ngOnInit(): void {
    console.log(this.id, 'aaaaaaaaaa');
  }
}
