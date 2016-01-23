/*globals desc, task, jake, fail, complete, directory*/
"use strict";
(function(){
  desc('Default Build and Test.');
  task('default', ["lint", "test", "build"], function (params) {
    console.log('This is the default build task.');
  });

  desc('Lint all files.');
  task('lint', function(params){
    var lint = require("./tools/linter.js");

    var nodeJSFiles = new jake.FileList();
    nodeJSFiles.include("**/*.js");
    nodeJSFiles.exclude("node_modules");

    lintFiles(lint, nodeJSFiles, nodeJSLintOptions(), "node js");

    console.log('Lint Completed.');
  });

  desc('Test');
  task('test', function(params){
    console.log('Test completed.');
  });

  desc('Build');
  task('build', function(params){
    console.log('Build completed.');
  });


  /* HELPERS */

  function lintFiles(lint, fileList, options, descr){
    var passed = lint.lintFileList(fileList.toArray(), options, {});
    if (!passed) {
      fail("Lint "+ descr +" failed");
    }
  }

  function clientJSLintOptions(){
    return {
      bitwise:true,
      curly:false,
      eqeqeq:true,
      forin:true,
      immed:true,
      latedef:'nofunc',
      newcap:true,
      noarg:true,
      noempty:true,
      nonew:true,
      regexp:true,
      undef:true,
      strict:true,
      trailing:true,
      node:true
    };
  }

  function nodeJSLintOptions(){
    return clientJSLintOptions();
  }
}());
