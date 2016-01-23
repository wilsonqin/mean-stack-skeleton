// Utility for linting javascript source with jshint

"use strict";

var JSHINT = require("jshint").JSHINT;
var fs = require("fs");

function lintCode(sourceCode, options, globals, description) {
  description = description ? description + " " : "";
  var pass = JSHINT(sourceCode, options, globals);
  if (pass) {
    console.log(description + "ok");
  }
  else {
    console.log(description + "failed");
    JSHINT.errors.forEach(function(error) {
      console.log(error.line + ": " + error.evidence.trim());
      console.log("\t" + error.reason);
    });
  }
  return pass;
}

function lintFile(filename, options, globals) {
  var code = fs.readFileSync(filename, "utf8");
  return lintCode(code, options, globals, filename);
}

exports.lintFileList = function(fileList, options, globals) {
  var pass = true;
  fileList.forEach(function(filename) {
    pass = lintFile(filename, options, globals) && pass;
  });
  return pass;
};