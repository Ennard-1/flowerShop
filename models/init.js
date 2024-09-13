const db = require('.');

db.sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(error => {
  console.error('Error syncing database:', error);
});
