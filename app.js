var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
//io.on('connection', function(socket){
//
//});




app.get('/', function(req, res, next){


    //用superagent去抓取
    superagent.get('http://www.douyu.com/chongbo')
        .end(function(err, sres){
          //常规错误处理
          if(err){
            return next(err);
          }
          // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
          // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
          // 剩下就都是 jquery 的内容了
          var $ = cheerio.load(sres.text);
          var items = [];
          //$('.c_cont #chat_line_list').each(function(idx, element){
          //  var $element = $(element);
          //  console.log($element);
          //  items.push({
          //    text: $element.text()
          //  });
          //});

          res.send(sres.text);




        });




});











//http.listen(3000,function(){
//  console.log('正在监听3000端口');
//});



// view engine setup
app.engine('html',engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
