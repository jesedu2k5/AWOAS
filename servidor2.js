const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos =[
    { id: 1, tarea: 'Realizar una API'},
    { id: 2, tarea: 'Crear una cuenta de GitHub'},
    { id: 3, tarea: 'Realizar pruebas de la API en Postman'},
    { id: 4, tarea: 'Acabar la tarea de Cindy'},
    { id: 5, tarea: 'Acabar el ejercicio de Trujillo'}
];
//Obtener todas las tareas
app.get('/todos/', (req, res) => {
    res.json(todos);
});
//Obtener las tareas por ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tareas = todos.find(t => t.id === id);
    if(tareas) {
        res.json(tareas);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});
//Crear un estudiante
app.post('/todos', (req, res) => {
    const nuevaTarea = {
        id: todos.length + 1,
        nombre: req.body.tarea
    };
    todos.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});
//Actualizar una tarea
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tareas = todos.find( t => t.id === id);
    if(tareas) {
        tareas.tarea = req.body.nombre;
        res.json(tareas);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});
//Borrar tarea
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        todos.splice(index, 1);
        res.send('Tarea eliminada');
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});
//Inicia el servidor
app.listen(PORT,() => {
    console.log('Servidor corriendo en http://localhost:$PORT');
})