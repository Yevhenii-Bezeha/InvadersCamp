import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(field: string, id: string) {
    super(404, `${field} with id ${id} not found`);
  }
}

export default NotFoundException;
