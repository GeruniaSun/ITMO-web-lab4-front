import { Component } from '@angular/core';
import { DotsService } from '../dots.service';
import {Dot} from '../dot';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dot-table',
  imports: [
    NgForOf
  ],
  templateUrl: './dot-table.component.html',
  standalone: true,
  styleUrl: './dot-table.component.sass'
})

export class DotTableComponent {
  dots: Dot[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private dotsService: DotsService) {
    this.loadPage(0)
  }

  loadPage(page: number) {
    this.dotsService.getPage(page).subscribe(
      (response) => {
        this.dots = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.log("у этого юзера не нашлись точечки")
        this.dots = []
      }
    );
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.loadPage(this.currentPage + 1);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Формируем строку в нужном формате
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
}
