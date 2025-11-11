import { Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { Table } from '../../shared/models/table';
import { ActivatedRoute } from '@angular/router';
import { UserActivityService } from './service/user-activity.service';
import { SharedServiceService } from './../../shared/share-service/shared-service.service';
@Component({
  selector: 'app-activity-log',
  imports: [SectionHeaderComponent, TableComponent],

  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss',
})
export class ActivityLogComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  userActivityService = inject(UserActivityService);
  SharedServiceService = inject(SharedServiceService);
  pageNumber = signal(1);
  perPage = signal(10);
  @Input() id: string = '';
  tableHeader = signal<(keyof Table)[]>(['user_id', 'user_name', 'created_at', 'device', 'status']);
  tableData = signal<Table[]>([])


  ngOnInit(): void {

    this.userActivityService.getUserActivities(this.perPage(), this.pageNumber()).subscribe(res => {
      console.log('User activities:', res);
      console.log('User activities:', res.data);
      const formattedData = res.data.map((item: any) => ({
        ...item,
        'created_at': this.SharedServiceService.formatDateString(item['created_at']),
      }));
      this.tableData.set(formattedData);
    });
  }
}
