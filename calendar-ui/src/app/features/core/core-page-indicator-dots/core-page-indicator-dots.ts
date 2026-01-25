import { Component, effect, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { CorePageIndicator } from '../models/core-page-indicator.model';

@Component({
  selector: 'app-core-page-indicator-dots',
  templateUrl: './core-page-indicator-dots.html',
  styleUrl: './core-page-indicator-dots.less',
  standalone: false,
})
export class CorePageIndicatorDots implements OnChanges {
  @Input() items: Array<CorePageIndicator> = [];
  @Input() maxItemsPerPage: number = 5;
  @Output() selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageCountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() currentPageIndexChange: EventEmitter<number> = new EventEmitter<number>();
  
  public itemsSignal = signal<Array<CorePageIndicator>>(this.items);
  public maxItemsPerPageSignal = signal<number>(this.maxItemsPerPage);

  public selectedIndex = signal<number>(0);
  public pageCount = signal<number>(Math.ceil(this.items.length / this.maxItemsPerPage));
  public currentPageIndex = signal<number>(0);

  constructor() {
    effect(() => {
      this.pageCount.set(Math.ceil(this.itemsSignal().length / this.maxItemsPerPageSignal()));
    });


    // Sync Outputs with internal Signals
    effect(() => {
      this.currentPageIndexChange.emit(this.currentPageIndex());
    });

    effect(() => {
      this.pageCountChange.emit(this.pageCount());
    });

    effect(() => {
      this.selectedIndexChange.emit(this.selectedIndex());
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.itemsSignal.set(this.items);
      this.pageCount.set(Math.ceil(this.items.length / this.maxItemsPerPage));
    }

    if (changes['maxItemsPerPage']) {
      this.maxItemsPerPageSignal.set(this.maxItemsPerPage);
      this.pageCount.set(Math.ceil(this.itemsSignal().length / this.maxItemsPerPage));
    }
  }

  public currentPageItems(): Array<CorePageIndicator> {
    const startIndex = this.currentPageIndex() * this.maxItemsPerPage;
    return this.itemsSignal().slice(startIndex, startIndex + this.maxItemsPerPage);
  }

  public isPreviousItemAvailable(): boolean {
    return this.selectedIndex() - 1 >= 0;
  }

  public isNextItemAvailable(): boolean {
    return this.selectedIndex() + 1 < this.itemsSignal().length;
  }

  public isPreviousPageAvailable(): boolean {
    return this.currentPageIndex() - 1 >= 0;
  }

  public isNextPageAvailable(): boolean {
    return this.currentPageIndex() + 1 < this.pageCount();
  }

  public selectItem (index: number) : void {
    console.log(`Page Count: ${this.pageCount()}, Current Page Index: ${this.currentPageIndex()}, Selected Index: ${this.selectedIndex()}`);
    this.selectedIndex.set(index);
  }

  public selectPreviousItem(): void {
    if (this.selectedIndex() % this.maxItemsPerPage === 0) {
      this.selectPreviousPage();
      this.selectItem(this.selectedIndex() + this.maxItemsPerPageSignal() - 1)
    } else {
      this.selectItem(this.selectedIndex() - 1);
    }
  }

  public selectNextItem(): void {
    if ((this.selectedIndex() + 1) % this.maxItemsPerPage === 0) {
      this.selectNextPage();
    } else {
      this.selectItem(this.selectedIndex() + 1);
    }
  }

  public selectPreviousPage(): void {
    if (this.currentPageIndex() - 1 >= 0) {
      this.currentPageIndex.set(this.currentPageIndex() - 1);
      this.selectItem(this.currentPageIndex() * this.maxItemsPerPage);
    } else {
      console.error('Page index out of bounds');
    }
  }

  public selectNextPage(): void {
    if (this.currentPageIndex() + 1 < this.pageCount()) {
      this.currentPageIndex.set(this.currentPageIndex() + 1);
      this.selectItem(this.currentPageIndex() * this.maxItemsPerPage);
    } else {
      console.error('Page index out of bounds');
    }
  }
}
