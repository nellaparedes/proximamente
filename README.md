# Coming Soon Template
This is an experimental code for testing gulp, sass and mustache to generate custom Coming Soon Pages. You just have to set your company's data in config.json file and then generate your page specifying one of the available themes.

You can customize the look and feel of your page using sass and Foundation 5.

# Requirements
The following libaries are required for this app

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com/) `[sudo] npm install -g gulp`
* [Bower](http://bower.io): Run `[sudo] npm install -g bower`

# First time install
To set up the application for the first time

* Run `[sudo] npm install`
* Run `[sudo] bower install`

# Variables available

You can change the available data on config.json file to costumize your page 

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

Generate your coming soon page in a /build folder. 
* `gulp`

You can specify another folder by calling 

*`gulp build --folder RELATIVE_PATH_FOR_YOUR_APP`

If you want to specify a theme for your site (themes avilable are in demo folder):
* `gulp --theme black`


# Testing mode

If you'd like tu test or edit your page html/sass you can generate a test page first in /app subfolder

*`gulp generate`

Listen for changes in sass, config and mustache files

*`gulp watch`


To leave your source clean :)

*`gulp clean`
