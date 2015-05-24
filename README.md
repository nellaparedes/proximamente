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

# Variables available

* name (name of your company)
* title (meta title)
* description (meta description)
* logo (URL four your logo)
* message (coming soon message for your clients)
* phone
* address
* email
* social
	* twitter
	* facebook
	* instagram

# Generating your coming soon page
After setting the config.json:

Generate your coming soon page in the /app folder. 
* gulp

If you want to specify a theme for your site:
* gulp --theme black


Listen for changes in sass, config and mustache files

*gulp watch

Generate your dist application in a /build folder. 

*gulp build 

You can specify another folder by calling 

*gulp build --folder RELATIVE_PATH_FOR_YOUR_APP

To leave your source clean :)

*gulp clean


