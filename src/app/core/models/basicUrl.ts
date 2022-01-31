import { environment } from '../../../environments/environment.prod';

let url = '';

if (environment.production) {
  url = 'https://nameless-anchorage-78678.herokuapp.com/api';
} else {
  url = 'http://localhost:3000/api';
}

export const basicUrl = url;
