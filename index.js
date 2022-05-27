const express = require('express');
const path = require('path');
const logger = require('./middleware/logger.js');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();

// Init middleware
// app.use(logger);

// Handebars Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: 'false' }));

// Set a static folder
// app.use(
// 	express.static(path.join(__dirname, "public"), { extensions: ["html"] })
// );

// Homepage route
app.get('/', (req, res) =>
	res.render('index', {
		title: 'Member App',
		members,
	})
);

// Members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port # ${PORT}.`));
