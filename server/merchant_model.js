const knex = require('knex');
require('dotenv').config();
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
});

const getPizzas = (filterStr) => {
  console.log(filterStr.orderBy);
  return new Promise(function (resolve, reject) {
    db('pizzas')
      .orderBy(filterStr.orderBy)
      // .where((builder) => builder.where('rating', 9))
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
const getPizzaTypes = (pizza_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT * FROM pizza_types WHERE pizza_id=${pizza_id}`, (error, results) => {
      if (error) {
        reject(error);
      }
      if (!results) {
        return resolve([]);
      }
      const sQuery = results.rows.map((o) => `id=${o.type_id}`).join(' OR ');
      pool.query(`SELECT * FROM types WHERE ${sQuery}`, (error, results) => {
        if (error) {
          reject(error);
        }
        if (!results) {
          return resolve([]);
        }
        resolve(results.rows);
      });
    });
  });
};
const getPizzaSizes = (pizza_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT * FROM pizza_sizes WHERE pizza_id=${pizza_id}`, (error, results) => {
      if (error) {
        reject(error);
      }
      if (!results) {
        return resolve([]);
      }

      const sQuery = results.rows.map((o) => `id=${o.size_id}`).join(' OR ');
      pool.query(`SELECT * FROM sizes WHERE ${sQuery}`, (error, results) => {
        if (error) {
          reject(error);
        }
        if (!results) {
          return resolve([]);
        }
        resolve(results.rows);
      });
    });
  });
};

module.exports = {
  getPizzas,
  getPizzaTypes,
  getPizzaSizes,
};
