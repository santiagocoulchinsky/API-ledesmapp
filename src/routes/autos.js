const {Router, json} = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const url = 'https://ledesmapi.onrender.com/api/autos';

/* const nuevoContenido = fs.readFileSync('src/sample.json', 'utf-8'); */
const lista = fs.readFileSync(url, 'utf-8');
let autos = JSON.parse(nuevoContenido);
let prod = JSON.parse(lista);


router.get('/', (req,res) => {
    /* res.json(autos); */
    res.json(prod);
});


router.post('/', (req, res) => {
    const {pos, carro, stock} = req.body;
    if (pos && carro && stock){
        /* const id = autos.length +1; */
        const id = prod.length +1;
        const newAuto = {...req.body, id};
        
        /* autos.push(newAuto); */
        prod.push(newAuto);
        
        /* const nuevoContenido = JSON.stringify(autos); */
        const nuevoContenido = JSON.stringify(prod);
        fs.writeFileSync('src/sample.json', nuevoContenido, 'utf-8');
        fs.writeFileSync('src/sample.json', lista, 'utf-8');
        /* res.json(nuevoContenido); */
        res.json(lista);
        
        
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
            /* fs.writeFileSync(url, nuevoContenido, 'utf-8'); */
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
                /* fs.writeFileSync(url, nuevoContenido, 'utf-8'); */
                res.json(nuevoContenido);
            }
        });
    }else{
        res.status(500).json({error: 'error'});
    }
});



module.exports = router;