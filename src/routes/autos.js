const {Router, json} = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const https = require('https');


const url = 'https://ledesmapi.onrender.com/api/autos';

https.get(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    // Ahora `data` contiene el contenido del archivo desde la URL
    fs.writeFileSync('src/sample.json', data, 'utf-8');
    
    
    // Puedes leer el archivo local si es necesario
    const contenido = fs.readFileSync('src/sample.json', 'utf-8');
    console.log(contenido);
  });

});


const nuevoContenido = fs.readFileSync('src/sample.json', 'utf-8');


let autos = JSON.parse(nuevoContenido);



router.get('/', (req,res) => {
    res.json(autos);
});


router.post('/', (req, res) => {
    const {pos, carro, stock} = req.body;
    if (pos && carro && stock){
        const id = autos.length +1;
        const newAuto = {...req.body, id};
        autos.push(newAuto);
        
        const nuevoContenido = JSON.stringify(autos);
        fs.writeFileSync('src/sample.json', nuevoContenido, 'utf-8');
        res.json(nuevoContenido);
        
        
    } else{
        res.send('Wrong request');
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    _.each(autos, (carro, i) =>{
        if (carro.id == id) { 

            autos.splice(i, 1);

            const nuevoContenido = JSON.stringify(autos);
            fs.writeFileSync('src/sample.json', nuevoContenido, 'utf-8');
            res.json(nuevoContenido);

        }/* else{
            res.send('Wrong request');
        } */
    });
    
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {pos, carro, stock} = req.body;
    if (pos && carro && stock){
        _.each(autos, (auto, i) => {
            if (auto.id == id) {
                auto.pos = pos;
                auto.carro = carro;
                auto.stock = stock;

                const nuevoContenido = JSON.stringify(autos);
                fs.writeFileSync('src/sample.json', nuevoContenido, 'utf-8');
                res.json(nuevoContenido);
            }
        });
    }else{
        res.status(500).json({error: 'error'});
    }
});



module.exports = router;