var express = require('express'),
    bodyParser = require('body-parser'),
    jade = require('jade'),
    app = express(),
    mysql = require('mysql'),
    connect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'rememberall'
    }),
    server,
    count_words = 0;

app.disable('x-powered-by');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


connect.query('SELECT COUNT(1) AS `count_words` FROM `exercise_word`', function(err, rows, fields){
    if(err) throw err;
    count_words = rows[0].count_words;
    console.log(count_words);
});
var getRandomId = function(_count_words){
    return Math.round(1 + Math.random() * _count_words) - 1
};

app.get("/words", function(req, res) {
    connect.query('SELECT * FROM `exercise_word` WHERE id=' + getRandomId(count_words), function(err, rows){
        console.log(rows[0].value);
        res.json(rows[0]);
    });
});
app.get('/lesson', function(req, res){
    connect.query('SELECT name, content FROM `30_day_workout_program_memory` WHERE name='+'\"'+"День 1"+'\"', function(err, rows, fields){

        if(err) throw err;
            res.json({
                page: rows[0].name,
                content: rows[0].content
            });

        });
    });
app.get('/menu', function(req, res){
    connect.query('SELECT name FROM `30_day_workout_program_memory`', function(err, rows, fields){
        if(err) throw err;
        res.json({
            pages: rows
        });
    });
});
app.get('/menu/:page', function(req, res){
    connect.query('SELECT name, content FROM `30_day_workout_program_memory` WHERE name='+'\"'+req.params.page+'\"', function(err, rows, fields){
        if(err) throw err;
        res.json({
            page: rows[0].name,
            content: rows[0].content
        });
    });
});

app.get('*', function(req, res){
    console.log('route: *');
    res.render('404.jade', { page: '404 Not Found' });
});

server = app.listen(3000, function(){
    console.log('listening on port 3000');
});