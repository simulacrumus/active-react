export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface Page<T> {
  content: T[];
  page: PageInfo;
}

export class PageModel<T> implements Page<T> {
  content: T[];
  page: PageInfo;

  constructor(data: Page<T>) {
    this.content = data.content;
    this.page = data.page;
  }

  get hasNext(): boolean {
    return this.page.number + 1 < this.page.totalPages;
  }

  get isEmpty(): boolean {
    return this.page.totalElements === 0;
  }
}

// export { PageModel };
// export type { Page, PageInfo };
