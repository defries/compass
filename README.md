# Flagship Compass

[![devDependency Status](https://david-dm.org/FlagshipWP/compass/dev-status.svg)](https://david-dm.org/FlagshipWP/compass#info=devDependencies)

The most advanced WordPress Starter theme ever created.

__Contributors:__ [Robert Neu](https://github.com/robneu), [Gary Jones](https://github.com/GaryJones)  
__Requires:__ WordPress 4.0  
__Tested up to:__ WordPress 4.1.1  
__License:__ [GPL-2.0+](http://www.gnu.org/licenses/gpl-2.0.html)  

Compass will revolutionize your theme development workflow by removing all the guesswork and letting you focus on the fun stuff. Built using the latest and greatest web development tools like Grunt, Sass, Bourbon, and Hybrid Core.

## Requirements

| Prerequisite        | How to Check  | How to Install
| ------------------- | ------------- | ------------- |
| PHP >= 5.2.4        | `php -v`      | [php.net](http://php.net/manual/en/install.php) |
| Composer >= 1.0.x   | `composer -V` | [getcomposer.org](https://getcomposer.org/download/) |
| Node.js 0.12.x      | `node -v`     | [nodejs.org](http://nodejs.org/) |
| Grunt CLI >= 0.1.13 | `grunt -V`    | `npm install -g grunt-cli` |
| Bower >= 1.3.12     | `bower -v`    | `npm install -g bower` |

For more detailed installation instructions, visit the [installation](https://github.com/FlagshipWP/compass/wiki/Installing-Compass) section of our Wiki.

## Learn How to Use Compass

Compass is designed to be a boilerplate for your own custom WordPress themes. To learn how to integrate Compass into your workflow, visit the [Compass Wiki](https://github.com/FlagshipWP/compass/wiki) and our [community forum](http://community.flagshipwp.com/category/compass). If you find any bugs, issues, or have questions, please open an issue or create a thread on the forum. Thanks for giving Compass a look! We can't wait to see what you build with it.

### Project Structure

    ├── assets
    │   ├── bower (added by build task)
    │   ├── composer (added by build task)
    │   └── flagship
    │       ├── fonts
    │       ├── icons
    │       ├── images
    │       ├── js
    │       ├── scss
    │       └── templates
    ├── comment
    ├── config
    │   ├── config
    │   └── tasks
    ├── content
    │   ├── archive
    │   └── singular
    ├── css (added by build task)
    ├── dist (added by package task)
    ├── font (added by build task)
    ├── hybrid-core (pulled in as dependency)
    ├── images (added by build task)
    ├── includes
    │   └── vendor (added by build task)
    │       └── flagship-library (pulled in as dependency)
    ├── js (added by build task)
    ├── languages (added by build task)
    ├── logs (added by build task)
    ├── menu
    ├── sidebar
    └── tmp (added by build task)

## Contributing

We're open to any and all feedback about the project and we're actively looking for contributors. You can submit code changes here on GitHub by opening a pull request. If you'd like to submit ideas, please open an issue or create a thread on our [community forum](http://community.flagshipwp.com/category/compass). If you would like to translate Compass into your language, we have a [public Transifex project](https://www.transifex.com/projects/p/flagship-compass/) set up where you can request team access.
