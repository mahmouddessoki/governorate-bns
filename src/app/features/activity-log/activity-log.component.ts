import { Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { Table } from '../../shared/models/table';
import { ActivatedRoute } from '@angular/router';
import { UserActivityService } from './service/user-activity.service';
import { SharedServiceService } from './../../shared/share-service/shared-service.service';
import { PaginationComponent } from './pagination/pagination.component';
@Component({
  selector: 'app-activity-log',
  imports: [SectionHeaderComponent, TableComponent, PaginationComponent],

  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss',
})
export class ActivityLogComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  userActivityService = inject(UserActivityService);
  SharedServiceService = inject(SharedServiceService);
  pageNumber = signal(1);
  total = signal(0);
  @Input() id: string = '';
  tableHeader = signal<(keyof Table)[]>([
    'user_id',
    'user_name',
    'created_at',
    'device',
    'status',
  ]);
  tableData = signal<Table[]>([]);

  ngOnInit(): void {
    this.getData(this.pageNumber());
  }

  getData(pageNum: number) {
    this.userActivityService
      .getUserActivities(pageNum)
      .subscribe((res) => {
        this.total.set(res.pagination.last_page);
        const formattedData = res.data.map((item: any) => ({
          ...item,
          created_at: this.SharedServiceService.formatDateString(
            item['created_at']
          ),
        }));
        this.tableData.set(formattedData);
      });
  }

  getTablePagData(p:number) {
    console.log(p);
    this.getData(p)
  }
}
