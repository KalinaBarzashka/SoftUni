I: Set up libraries
  1. Set up index.html with the required libraries in the script tags;
  2. Set up firebase app;
  3. Add firebase configs inside your index.html file;

** Note: If ypu are using handlebars with sammy you must include also sammy-handlebars in your index.html

II: Config sammy (if sammy is used)

Look at the docs here: http://www.sammyjs.org/

firebase DB config:
...
"rules": {
    ".read": "auth !== null",
    ".write": "auth !== null"
}
...