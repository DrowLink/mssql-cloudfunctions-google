const mssql = require("mssql");

// Configuration Data for SQL Server Connection
const config = {
  user: 'username',
  password: 'password',
  server: 'ipserver',
  database: 'database_name',
  port: port,
  options: {
    encrypt: false // Use only on windows Azure connections
  }
};

// Function to perform a query to the SQL Server database
async function querySqlServer(queryString) {
  try {
    // Connection to SQL Server
    await mssql.connect(config);
    console.log("Successful connection to SQL Server");

    // Make the query
    const result = await mssql.query(queryString);

    // Print the results
    console.log("Query results:", result);

    return result.recordset; // return results of query
  } catch (err) {
    console.error('Error connecting to SQL Server:', err);
    return null; // return null in case of error
  } finally {
    // Close connection
    await mssql.close();
    console.log("Closed sql connection");
  }
}

// Ejemplo de uso: realizar una consulta y manejar los resultados
async function runQuery() {
  const queryString = `SELECT * FROM vw_account_statment`; // Aquí reemplaza 'tu_tabla' por el nombre de la tabla que deseas consultar
//const queryString = `SELECT * FROM vw_account_statment WHERE cardcode = '1801'`;
  const results = await querySqlServer(queryString);
  if (results) {
    console.log("Returned rows:", results.length);
    // Puedes procesar los resultados aquí
  } else {
    console.log("Queries results cannot be accesible");
  }
}

// Llamar a la función para ejecutar la consulta
runQuery();