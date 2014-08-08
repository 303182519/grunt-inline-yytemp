# grunt-inline-yytemp

> Inject external temp to your js.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-inline-yytemp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-inline-yytemp');
```

## The "inline_yytemp" task

### Overview
In your project's Gruntfile, add a section named `inline_yytemp` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  inline_yytemp: {
    your_target: {
      files:{
      	'dist/': ['src/**/*.js']
      }
    },
  },
})
```

### Options

#### options.verbose
Type: `Boolean`
Default value: `false`

Set true to see more logs about what is happenning.

### Usage Examples

`temp.js` file:


	<%var data;%>
	<ul>
	<%for(var i=0,len=list.length;i<len&&i<15;i++){%>
	    <%
	        data=list[i];
	    %>
	    <li class="quickEnterGame<%=i%2==0?' odd':''%><%=i==0?' on':''%>" g_data="<%=data.gameId%>|TJ<%=i+1%>">
	       
	    </li>
	<%}%>
	</ul>


`target.js` file:



	var test=__inline("./temp.js");



## Release History
- 1.0.0 - Initial release

## License
Copyright (c) 2014 sahibinden.com. Licensed under the MIT license.
