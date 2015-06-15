//Файл для инициализации базы данных из файла

var mysql = require("mysql"),
    fs = require("fs");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mnemoland'
});

var arrWords;

fs.readFile("words_list.txt", function(err, data){
    arrWords = data.toString().split("\n");
    for(var i = 0; i < arrWords.length; i++){
        connection.query('INSERT INTO `exercise__word` (value) VALUES (' + "\""+arrWords[i]+"\"" + ')', function(err){
            if(err){
                throw err;
            }
        });
        console.log(arrWords[i]);
    }
});

//fs.readFile("words_list.txt", function(err, data){
//    arr = data.toString().split("\n");
//    for(var i = 0; i < arr.length; i++){
//        connection.query('INSERT INTO `exercise__word` (value) VALUES (' + "\""+arr[i]+"\"" + ')', function(err, rows, fields){
//            if(err){
//                throw err;
//            }
//        });
//    }
//});


//connection.connect(function(err){
//    if(err){
//        console.log("Ошибка подключения");
//        throw err;
//    }
//});

//connection.end();

//function readLines(input, func) {
//    var remaining = '';
//    var i = 0;
//    input.on('data', function(data) {
//        remaining += data;
//        var index = remaining.indexOf('\n');
//        while (index > -1) {
//            i++;
//            var line = remaining.substring(0, index);
//            remaining = remaining.substring(index + 1);
//            arrayWords[i] = line;
//            //func(line, i);
//            index = remaining.indexOf('\n');
//        }
//    });
//
//    input.on('end', function() {
//        if (remaining.length > 0) {
//            //func(remaining);
//        }
//    });
//}
//
//function func(data, i) {
//    arrayWords[i] = data;
//    //console.log(data);
//    //if(w && w != oldW){
//    //    connection.query('INSERT INTO `exercise__word` (value) VALUES (' + "\""+w+"\"" + ')', function(err, rows, fields){
//    //        if(err){
//    //            throw err;
//    //        }
//    //    });
//    //    oldW = w;
//    //}
//    //console.log(w);
//    //connection.query('INSERT INTO `exercise__word` (value) VALUES (' + data + ')', function(err, rows, fields){
//    //    if(err){
//    //        console.log(err);
//    //        throw err;
//    //    }
//    //});
//}
//
//var input = fs.createReadStream('words_list.txt');
//readLines(input, func);
////console.log(arrayWords[0]);

//for(var i = 0; i < arrayWords.length; i++){
    //connection.query('INSERT INTO `exercise__word` (value) VALUES (' + "\""+arrayWords[i]+"\"" + ')', function(err, rows, fields){
    //    if(err){
    //        throw err;
    //    }
    //});
//}

//if(w && w != oldW){
//    connection.query('INSERT INTO `exercise__word` (value) VALUES (' + "\""+w+"\"" + ')', function(err, rows, fields){
//        if(err){
//            throw err;
//        }
//    });
//}
//connection.query('INSERT INTO `exercise__word` (value) VALUES (' + "\""+w+"\"" + ')', function(err, rows, fields){
//    if(err){
//        throw err;
//    }
//});

