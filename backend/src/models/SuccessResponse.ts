class SuccessResponse {
  status: number;
  message: string;
  data: any[] | object;
  totalCount?: number;

  constructor(
    status: number,
    message: string,
    data: any[] | object,
    count?: number
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.totalCount = count;
  }
}

export default SuccessResponse;
