/*
 * grunt-inline-yytemp
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('inline_yytemp', 'Inject external temp to your js.', function () {

    var _ = require('underscore');

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {

      // Concat specified files.
      var src=file.src.filter(function (filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            } else {
                return true;
            }
        }).map(function (filepath) {
        
            var html = grunt.file.read(filepath),
                destination = file.dest || filepath;

            var names = filepath.split('/') 
            names.shift();

            var parts = filepath.split('/');
            parts.pop();

            //读取外链模板文件__inline("./index.js")
            var html=html.replace(/__inline\([\'\"]([^\(\)]*)[\'\"]\)/g,function(match, jsUrl){

                var tempUrl = parts.join('/') + '/' + jsUrl;

                if (!grunt.file.exists(tempUrl)) {
                    grunt.log.warn('temp file "' + tempUrl + '" not found.');
                    return '<!-- temp file couldnt found: ' + tempUrl + ' -->';
                } else {

                    var temp = grunt.file.read(tempUrl);

                    if(temp.indexOf('<%')!=-1){
                        var temp = _.template(grunt.file.read(tempUrl)).source;
                    }

                    return temp
                }  
            })


            //读取内联模板__inlineTemp('<div><%=ddd%></div>');
            var html=html.replace(/__inlineTemp\([\'\"](.*)[\'\"]\)/g,function(match, jsTemp){
                if(jsTemp.indexOf('<%')!=-1){
                        var content =jsTemp
                            .split('\\n')
                            .map(function (line) {return line.trim();})
                            .join('')
                            .replace(/\"/gi, '\\\"')
                            .replace(/\'/gi, '\\\'')
                            .trim();

                        var jsTemp = _.template(content).source;
                    }      
               return jsTemp;  

            })


            //替换函数
            /*_.template(bbb,{list:data})
                bbb({list:data})
              _.template(bbb,{list:data})
                bbb()

            */
            var html=html.replace(/_\.template\((.*)\)/g,function(match, fnTemp){
                var index=fnTemp.indexOf(",");
                var fnName; 
                if(index!=-1){
                    var fn=fnTemp.slice(0,index),
                        args=fnTemp.slice(index+1).trim(); 

                    fnName=fn+'('+ args +')';    
                }else{
                    fnName=fnTemp;
                }

                return fnName
            })


            return {name: names.join("/"), content: html};

        });

        src.forEach(function (item, i, src) {
            grunt.file.write(file.dest + item.name , item.content);
        });    


    });
  });

};
