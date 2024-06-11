import { createPool } from 'mysql';
import mysql from 'mysql12'

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"caching_sha2_password",
    database:"workoutwizdb",
    connectionLimit:10,
}).promise();


pool.query(`select Nombre, Edad from users`, (err, result) => {
    // if(err){
    //     return console.log(err)
    // }
    // return console.log(userName)

    const userData = result;
    // Log the result of the query
    console.log('The result is:', userData);

    // Extract userName from the userData and log it separately
    const userName = userData[0].Nombre; // Assuming 'Nombre' is the column containing user names
    const userAge = userData[0].Edad; // Assuming 'Nombre' is the column containing user names
    const userName2 = userData[1].Nombre; // Assuming 'Nombre' is the column containing user names
    const userAge2 = userData[1].Edad;
    console.log('User name:', userName);
    console.log('Age:', userAge);
    console.log('User name:', userName2);
    console.log('Age:', userAge2);


})


const resultado = pool.query("SELECT * FROM users")
console.log(resultado)