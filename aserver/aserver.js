const express = require("express");
const cors = require("cors");
const mysql = require("mysql")
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'estudiantesweb',
    password: 'admin12345',
    database: 'cursoweb',
    port: 3306
})
connection.connect(err=>{
   // if(err) throw err;
    console.log("conectado a mysql")
})

const app = express();
app.use(cors());
app.use(express.json());


app.post("/P-person",(req,res)=>{
    const{ name, last_name, identification, email, phone } = req.body;
    newPerson = { name, last_name, identification, email, phone };
    connection.query('INSERT INTO student (name, last_name, identification, email, phone) VALUES(?,?,?,?,?)',
        [name, last_name, identification, email, phone], (err,result)=>{
            //if(err) throw err; 
            
            res.json({mensaje:"Person added"});

        });
    
});

app.get("/G-persons", (req,res)=>{
    connection.query('SELECT * FROM student', (err,result)=>{
        res.send(result)

    })
    
})
app.put('/U-person/:id', (req,res)=>{ 
    const {id} = req.params;
    const{email} = req.body;
    connection.query('UPDATE student set email where id = ?',
        [email, id], (err,result) =>{
            res.json({mensaje: "cambio concretado"})

        })

})
 

app.get("/",(req,res) => {
    res.send("Servidor online")
})
app.listen(3001, () => {console.log("El servidor esta corriendo por el puerto 3000")
})