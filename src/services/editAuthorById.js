import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const editAuthorById = async (id, nombre, alias, fechaNacimiento) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('id', mssql.Int, id)
      .input('nombre', mssql.VarChar, nombre)
      .input('alias', mssql.VarChar, alias)
      .input('fechaNacimiento', mssql.Date, fechaNacimiento)
      .query(
        `
          UPDATE Autores
          SET nombre=@nombre, alias=@alias, fechaNacimiento=@fechaNacimiento
          WHERE id=@id;
        `
      )
    return query
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { editAuthorById }
