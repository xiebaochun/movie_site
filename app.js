var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie')
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc');

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment=require('moment');
app.listen(port);

console.log('start port' + port);

//index page
app.get('/',function(req,res){
  Movie.fetch(function(err, movies){
      if(err) {
        console.log(err);
      }
      console.log(movies);
      res.render('index',{
       title: 'imooc 首页',
       movies: movies
     }); 
  });
});

app.get('/admin/movie',function(req,res){
   res.render('admin', {
   	 title: '后台',
       movie: {
          title: '',
          doctor: '',
          country: '',
          year: '',
          poster: '',
          flash: '',
          summary: '',
          language: ''
       }
   });
});

app.get('/movie/:id',function(req,res){
  var id = req.params.id;
  console.log("................................id");
  console.log(id);
  Movie.findById(id , function(err,movie){
    console.log('...........................movie');
    console.log(movie);
    if(err){
      console.log(err);
    }
    res.render('detail',{
       title: '详情',
       movie: movie
       //{
         //   doctor: "何塞-坡地利亚",
         //   country: '美国',
         //   title: '机械战警',
         //   year:2004,
         //   poster: 'http://r3.yking.com/572956927592375492374',
         //   language: '英语',
         //   flash: "http://player/youku.com/player.php/sid/nfslkdnfls/v.swf",
         //   summary: '烦恼是对方舒服呢红色的分量接口是的你速度发货呢收到回复您稍等呢'

         //}
     }); 
  })
   
});

app.get('/admin/update/:id',function(req,res){
  var id = req.params.id;
  if(id){
    Movie.findById(id,function(err,movie){
      res.render('admin',{
        title:'immoc 后台更新页',
         movie: movie
      });

    })
  }
})

app.post('/admin/movie/new',function(req, res){
  console.log(req.body);
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if(id != 'undefined') {
    Movie.findById(id, function(err, movie){
        if(err) {
          console.log(err);
        }
        movie = movie || {};
        _movie = _.extend(movie, movieObj)
        console.log('......................................');
        console.log(_movie);
        _movie = new Movie(_movie);
        
        _movie.save(function(err,movie){
          if(err) {
            console.log(err)
          }
           res.redirect('/movie/' + id)


        })
    })
  }
  else {
    _movie =new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      country:movieObj.country,
      language: movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      summary:movieObj.summary,
      flash:movieObj.flash
    })

    _movie.save(function(err,movie){
        if(err) {
          console.log(err)
        }
         res.redirect('/movie/' + _movie._id)


      })
  }
})

app.get('/admin/list',function(req,res){
  Movie.fetch(function(err, movies){
      if(err) {
        console.log(err);
      }
      
       res.render('list',{
       	 title: '列表',
         movie: movies
       });
  });
});

// list delete movie
app.delete('/admin/list',function(req, res) {
   var id = req.query.id
   console.log(req.query)
   if(id) {
      Movie.remove({_id: id},function(err, movie) {
        if(err) {
          console.log(err);
        }
        else{
          res.json({success: 1})
        }
      })
   }
})

