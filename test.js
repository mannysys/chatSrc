/**
 * Created by zhoujialin on 2016/3/25.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');



var pai = function(){
    //��superagentȥץȡ
    superagent.get('http://www.douyu.com/chongbo')
        .end(function(err, sres){
            //���������
            if(err){
                return next(err);
            }
            superagent.get('javascript:function test(){ var con = document.getElementById("chat_line_list"); console.log(con);} test()')
                .end(function(err, sres){
                    if(err){
                        return next(err);
                    }

                    console.log(sres);

                });


        });


}

pai();



