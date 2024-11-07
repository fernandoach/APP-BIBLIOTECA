import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const deleteAuthorById = async (id) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('idAutor', mssql.Int, id)
      .query(
        `
          DELETE FROM Prestamos 
          WHERE idLibro IN 
          (SELECT id FROM Libros WHERE idAutor = @idAutor);

          DELETE FROM Libros
          WHERE idAutor = @idAutor;

          DELETE FROM Autores
          WHERE id = @idAutor;  
        `
      )

    return query
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { deleteAuthorById }
