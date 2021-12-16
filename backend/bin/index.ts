import app from '../src/app';

import * as dotenv from 'dotenv';

dotenv.config();

const PORT: string = process.env['PORT'] || '3000';
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));