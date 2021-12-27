class SuccessResponse {
  status: number;
  message: string;
  data: any[] | object;

  constructor(status: number, message: string, data: any[] | object) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default SuccessResponse;
