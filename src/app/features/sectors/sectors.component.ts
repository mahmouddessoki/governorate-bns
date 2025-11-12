import {
  Component,
  computed,
  input,
  OnInit
} from '@angular/core';
import { SectionComponent } from "../../shared/components/ui/section/section.component";
import { infoRes } from '../../shared/models/info';

@Component({
  selector: 'app-sectors',
  imports: [ SectionComponent],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.scss',
})
export class SectorsComponent implements OnInit {
  sectors = input.required<infoRes>();
  mainSectors = computed(()=>this.sectors().data)

  ngOnInit() {
    console.log(this.mainSectors());
  }


}
