const express = require('express') //crear variable para express y pedir el paquete 

const app = express() //llama a express

//rutas para acceder
//Callback function, 2 parametros: request(cliente) y respond(devuelve la app)
app.get('/',(req,res) =>{
    res.send('Holis ')
})

app.listen(3000, ()=>(
    console.log("Node está corriendo en el puerto 3000")
))

