import "reflect-metadata"
import { createConnection } from 'typeorm'

export default async function () {
  try {
    console.log('Connecting to MYSQL...')
    const connection = await createConnection()
    console.log('MYSQL connected successfully!')
  } catch (error) {
    throw error
  }
}

