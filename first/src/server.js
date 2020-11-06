// Pega o valor de dentro do pacote de 'express' e trás para a constante
const express = require('express');

// Pega o valor da constante de express e chama sua função
const app = express();
// Constante para guardar o dados de carro
const cars = [];

// Define qual formato de receber e enviar dados
app.use(express.json());

// Rota para pegar TODOS os carros
app.get('/cars', (req, res) => {
  return res.json(cars);
});

// Rota para criar carro
app.post('/cars', (req, res) => {
  const { model, brand, year } = req.body;
  const car = {
    model: model,
    brand: brand,
    year: year
  };

  // Joga valor para o array
  cars.push(car);

  return res.status(201).json();
});

// Roda o servidor em sua porta
app.listen(3000, () => {
  console.log('Rodando na porta 3000');
});
