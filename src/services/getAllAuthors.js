import { getConnection } from '../db/context.js'

const getAllAuthors = async () => {
  try {
    const connection = await getConnection()
    const query = await connection.request().query(
      `
        SELECT id, nombre, alias, fechaNacimiento
        FROM Autores; 
      `
    )
    return query.recordset
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { getAllAuthors }
