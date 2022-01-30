import { environment } from '../../../environments/environment.prod';

let url = '';

if (environment.production) {
  url = 'http://localhost:3000/api';
} else {
  url = 'https://nameless-anchorage-78678.herokuapp.com';
}

export const basicUrl = url;
