const { PORT = 3000 } = process.env;

module.exports = {
  port: PORT,
  mongodbLink: 'mongodb://127.0.0.1/mestodb',
};
