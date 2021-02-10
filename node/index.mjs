'use strict';
/**
SERVER MAIN FILE
**/
process.env.NODE_ENV = process.env.NODE_ENV || process.env.NODE_DEV;
// Import Modules
import App from "./app.mjs";
new App();