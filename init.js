const db = require('./models');

db.sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(error => {
  console.error('Error syncing database:', error);
});
