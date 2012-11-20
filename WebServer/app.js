var express = require('express'),
    http = require('http'),
    path = require('path'),
    config = require('../config'),

    // Third Party
    hbs = require('hbs');

var app = express();

////////////////////////////////////////////////
// Express Configuration
////////////////////////////////////////////////
app.configure(function(){
  app.set('port', config.port || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', hbs.__express);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

////////////////////////////////////////////////
// Handlebars
////////////////////////////////////////////////
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

////////////////////////////////////////////////
// Router
////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.render('login', { title: 'TEN Console' });
});

app.all('/login', function(req, res) {
  res.render('login', { title: 'TEN Console' });
});

app.all('/dashboard', function(req, res) {
  res.render('dashboard', { title: 'TEN Console' });
});

app.all('/dashboard/user', function(req, res) {
  res.render('dashboard_user', { title: 'TEN Console' });
});

app.all('/dashboard/admin', function(req, res) {
  res.render('dashboard_admin', { title: 'TEN Console' });
});

app.get('/dashboard/submission', function(req, res) {
  res.render('submission', { title: 'TEN Console' });
});

////////////////////////////////////////////////
// HTTP Server
////////////////////////////////////////////////
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
