type SortOption = 'date' | 'title';
type OrderBy = 'asc' | 'desc';
type Page = string;
type QueryWord = string;

type QueryParam = {
  orderBy?: OrderBy;
  sorted?: SortOption;
  q?: QueryWord;
  page?: Page;
};

export type { SortOption, OrderBy, Page, QueryWord, QueryParam };
