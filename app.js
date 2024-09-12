const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');
const db = require('./models');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.send('Welcome to the admin panel. Please go to /login to login.');
});

// Middleware de autenticação
function isAuthenticated(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Rota para página de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Rota para fazer login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: { username } });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.redirect('/users');
  } else {
    res.redirect('/login');
  }
});

// Rota para criar usuário (admin)
app.get('/users/create', isAuthenticated, (req, res) => {
  res.render('createUser');
});

app.post('/users/create', isAuthenticated, async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  await db.User.create({ username, password: hashedPassword, isAdmin: isAdmin === 'on' });
  res.redirect('/users');
});

// Rota para listar usuários
app.get('/users', isAuthenticated, async (req, res) => {
  const users = await db.User.findAll();
  res.render('listUsers', { users });
});

// Rota para alterar usuário
app.get('/users/edit/:id', isAuthenticated, async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  res.render('editUser', { user });
});

app.post('/users/edit/:id', isAuthenticated, async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

  await db.User.update(
    { username, password: hashedPassword, isAdmin: isAdmin === 'on' },
    { where: { id: req.params.id } }
  );

  res.redirect('/users');
});

// Rota para remover usuário
app.post('/users/delete/:id', isAuthenticated, async (req, res) => {
  await db.User.destroy({ where: { id: req.params.id } });
  res.redirect('/users');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
