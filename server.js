const express = require('express'); //crear variable para express y pedir el paquete 
const mongoose = require('mongoose'); 
const Product = require('./models/productModel')
const app = express() //llama a express

app.use(express.json())

//rutas para acceder
//Callback function, 2 parametros: request(cliente) y respond(devuelve la app)
app.get('/',(req,res) =>{
    res.send('Holis ')
})

app.get('/blog',(req,res) =>{
    res.send('Holis blog ')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//modificar

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){ //si no se puede encontrar el producto en la base de datos
            return res.status(404).json({message: `No se pudo encontrar ningun producto con el id: ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//eliminar

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `No se pudo encontrar ningun producto con el id: ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.
connect('mongodb+srv://admin:admin123@tpapi.1hb257e.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=> {
    console.log('conectado a Mongo')
    app.listen(3000, ()=>(
        console.log("Node está corriendo en el puerto 3000")
    ));

}).catch(()=> {
    console.log(error)
})
