interface IPaginationDTO {
  currentPage: number;
  perPage: number;
}

export interface PaginationDTO extends IPaginationDTO { }

export class PaginationDTO {
  constructor(body: IPaginationDTO) {
    this.currentPage = body.currentPage;
    this.perPage = body.perPage;
  }

  static create(body: IPaginationDTO) {
    return new PaginationDTO(body);
  }
}
