import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {


  totalPages = input.required<number>();
  currentPageChange = output<number>();
  currentPage = signal(1)


  ngOnInit(){
    console.log(this.totalPages());
  }

  makeArr(len:number) {
    return Array.from({length:len})
  }

  setCurrentPage(e:MouseEvent,pageNum:number){
    e.preventDefault()
    this.currentPage.set(pageNum)
    this.emitPageNumber(this.currentPage())

  }

  getPrev(e:MouseEvent){
    e.preventDefault()
    if(this.currentPage() > 1) {
      this.currentPage.update((v)=>v-1);
      this.emitPageNumber(this.currentPage());
    }

  }
  getNext(e:MouseEvent){
    e.preventDefault();
    if(this.currentPage() < this.totalPages()) {

      this.currentPage.update((v)=>v+1);
      this.emitPageNumber(this.currentPage());
    }


  }

  emitPageNumber(pNum:number){
    this.currentPageChange.emit(pNum)
    console.log(this.currentPage());
  }

}
