const { PORT = 3000 } = process.env;

module.exports = {
  port: PORT,
  mongodbLink: 'mongodb://127.0.0.1/mestodb',
};
// больше не знаю что можно сюда перенести)) что порекомендуете?
