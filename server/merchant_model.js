const knex = require('knex');
const { attachPaginate } = require('knex-paginate');
attachPaginate();

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

const getPizzas = (oFilter) => {
  return new Promise(function (resolve, reject) {
    db('pizzas')
      .orderBy(oFilter.orderBy || 'rating')
      .where((builder) => {
        if (oFilter.search) {
          builder.whereILike('title', `%${oFilter.search}%`);
        }
        if (oFilter.category) {
          builder.where('category', oFilter.category);
        }
      })
      .paginate({ perPage: oFilter.perPage, currentPage: oFilter.currentPage })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
const getPizzaById = (id) => {
  return new Promise(function (resolve, reject) {
    db('pizzas')
      .where('id', id)
      .then((response) => {
        resolve(response?.[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
const getPizzasCount = (oFilter) => {
  return new Promise(function (resolve, reject) {
    db('pizzas')
      .count('id')
      .where((builder) => {
        if (oFilter.search) {
          builder.whereILike('title', `%${oFilter.search}%`);
        }
        if (oFilter.category) {
          builder.where('category', oFilter.category);
        }
      })
      .then((data) => {
        resolve(data[0]?.count);
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

const getCategories = () => {
  return new Promise(function (resolve, reject) {
    db('categories')
      .orderBy('id')
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getSortCategories = () => {
  return new Promise(function (resolve, reject) {
    db('sort_categories')
      .orderBy('id')
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const registration = ({ login, email, password }) => {
  return new Promise(function (resolve, reject) {
    db.insert([
      {
        login,
        email,
        password,
      },
    ])
      .into('users')
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        if (err.constraint === 'login') {
          reject({
            message: 'Пользователь с таким логином уже существует.',
            constraint: err.constraint,
          });
        }
        if (err.constraint === 'email') {
          reject({
            message: 'Пользователь с такой почтой уже существует.',
            constraint: err.constraint,
          });
        }
      });
  });
};

module.exports = {
  getPizzas,
  getPizzaById,
  getPizzasCount,
  getPizzaTypes,
  getPizzaSizes,
  getCategories,
  getSortCategories,
  registration,
};
