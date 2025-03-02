/*
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let rutinas = [
    { id: 1, nombre: "Press de banca", musculo: "Pecho", duracion: "45 min" },
    { id: 2, nombre: "Sentadillas", musculo: "Piernas", duracion: "50 min" },
    { id: 3, nombre: "Dominadas", musculo: "Espalda", duracion: "40 min" }
];

app.get("/", (req, res) => {
    res.send("Servidor de Rutinas de Gym online 💪🔥");
});

// Obtener todas las rutinas
app.get("/rutinas", (req, res) => {
    res.json(rutinas);
});

// Agregar una nueva rutina
app.post("/rutinas", (req, res) => {
    const { nombre, musculo, duracion } = req.body;
    if (!nombre || !musculo || !duracion) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const nuevaRutina = {
        id: rutinas.length > 0 ? Math.max(...rutinas.map(r => r.id)) + 1 : 1,
        nombre,
        musculo,
        duracion
    };

    rutinas.push(nuevaRutina);
    res.status(201).json(nuevaRutina);
});

// Actualizar una rutina
app.put("/rutinas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nombre, musculo, duracion } = req.body;

    const rutina = rutinas.find(r => r.id === id);
    if (!rutina) {
        return res.status(404).json({ mensaje: "Rutina no encontrada" });
    }

    if (nombre) rutina.nombre = nombre;
    if (musculo) rutina.musculo = musculo;
    if (duracion) rutina.duracion = duracion;

    res.json({ mensaje: "Rutina actualizada", rutina });
});

// Eliminar una rutina por ID
app.delete("/rutinas/:id", (req, res) => {
    const id = Number(req.params.id);
    const rutinaExistente = rutinas.some(rutina => rutina.id === id);

    if (!rutinaExistente) {
        return res.status(404).json({ mensaje: "Rutina no encontrada" });
    }

    rutinas = rutinas.filter(rutina => rutina.id !== id);
    res.json({ mensaje: "Rutina eliminada", rutinas });
});

// Iniciar el servidor
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`💪 Servidor de gym corriendo en http://localhost:${PORT}`);
});
*/

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



