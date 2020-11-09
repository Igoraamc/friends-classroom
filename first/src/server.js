// Pega o valor de dentro do pacote de 'express' e trás para a constante
const express = require('express');
// Pega a função 'v4' de dentro do pacote 'uuid'
const { v4: uuid } = require('uuid');

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
    id: uuid(),
    model: model,
    brand: brand,
    year: year
  };

  // Joga valor para o array
  cars.push(car);

  return res.status(201).json();
});

app.put('/cars/:id', (req, res) => {
  // Pega o 'id' da URL
  const { id } = req.params;
  const { model, brand, year } = req.body;

  // Pega o index do carro e joga dentro da constante 'carIndex'
  const carIndex = cars.findIndex(car => car.id == id);

  // Checa se o carro foi encontrado
  if (carIndex < 0) {
    return res.status(400).json({ message: 'Unable to find the choosen ID' });
  }

  // Atualiza o carro passando seu index
  cars[carIndex] = {
    id: id,
    model: model,
    brand: brand,
    year: year
  };

  return res.status(200).json(cars[carIndex]);
});

app.delete('/cars/:id', (req, res) => {
  // Pega o 'id' da URL
  const { id } = req.params;

  // Pega o index do carro e joga dentro da constante 'carIndex'
  const carIndex = cars.findIndex(car => car.id == id);

  // Checa se o carro foi encontrado
  if (carIndex < 0) {
    return res.status(400).json({ message: 'Unable to find the choosen ID' });
  }

  // Retira o carro do array a partir do seu index
  cars.splice(carIndex, 1);
  return res.status(200).json();
});

// Roda o servidor em sua porta
app.listen(3000, () => {
  console.log('Rodando na porta 3000');
});
