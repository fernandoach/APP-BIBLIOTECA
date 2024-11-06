import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const getAuthorById = async (id) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('id', mssql.Int, id)
      .query(
        `
          SELECT id, nombre, alias, fechaNacimiento
          FROM Autores
          WHERE id=@id;
        `
      )
    return query.recordset
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { getAuthorById }
