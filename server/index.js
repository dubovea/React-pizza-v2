const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const merchant_model = require('./merchant_model');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

app.get('/', (req, res) => {
  const oFilter = req.query;
  merchant_model
    .getPizzas(oFilter)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/count', (req, res) => {
  const oFilter = req.query;
  merchant_model
    .getPizzasCount(oFilter)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/pizza_types/:id', (req, res) => {
  merchant_model
    .getPizzaTypes(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/pizza_sizes/:id', (req, res) => {
  merchant_model
    .getPizzaSizes(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/categories', (req, res) => {
  merchant_model
    .getCategories()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/sorters', (req, res) => {
  merchant_model
    .getSortCategories()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
