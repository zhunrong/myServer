import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default async function () {
  console.log('Connecting to MYSQL...');
  await createConnection();
  console.log('MYSQL connected successfully!');
}
