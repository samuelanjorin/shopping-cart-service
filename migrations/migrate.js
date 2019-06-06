import sequelize from '../config/database'
import fs from 'fs'
import path from 'path'
import logger from '../utils/errors/errorlogger'

const dir = path.join(__dirname, './db.sql')
const createTableSql = fs.readFileSync(dir).toString()
sequelize.query(createTableSql, { raw: true }).then(() => {
  logger.info('Table Created Successful')
}).catch(error => {
  logger.error('Error- Creating Table', error)
})
