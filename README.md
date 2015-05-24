# Coming Soon Template
This is a experimental code for testing gulp, sass and mustache to generate custom Coming Soon Pages. You just have to set your company's data in config.json file and then generate your page specifying one of the available themes.

You can customize the look and feel of your page using sass and Foundation 5.

# Requirements
The following libaries are required for this app
* Node.js
* Gulp
* Bower

# First time install
To set up the application for the first time
* npm install
* bower install

# Generating your coming soon page
After setting the config.json:

* gulp
Generate your coming soon page in the /app folder. 

If you want to specify a theme for your site:
* gulp --theme black

*gulp watch
Listen for changes in sass, config and mustache files

*gulp build 
Generate your dist application in a /build folder. You can specify another folder by calling 
*gulp build --folder RELATIVE_PATH_FOR_YOUR_APP

*gulp clean
To leave your source clean :)

