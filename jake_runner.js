/*
 * Wrapper for Jake (in leiu of npm global install)
 */

/*globals desc, task, jake, fail, complete, directory*/
"use strict";

require('jake');

jake.run.apply(jake);