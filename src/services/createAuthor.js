import { getConnection } from '../db/context.js'
import mssql from 'mssql'
const createAuthor = async (nombre, alias, fechaNacimiento) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('nombre', mssql.VarChar, nombre)
      .input('alias', mssql.VarChar, alias)
      .input('fechaNacimiento', mssql.Date, fechaNacimiento)
      .query(
        `
          INSERT INTO Autores(nombre, alias, fechaNacimiento)
          VALUES(@nombre, @alias, @fechaNacimiento);
        `
      )
    return query
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { createAuthor }
