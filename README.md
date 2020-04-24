<h1 align="center">
  <img alt="Imagem da Logo do Framework node.js" src="https://www.pinclipart.com/picdir/big/102-1024697_related-wallpapers-node-js-logo-png-clipart.png" height="120" /><br><br> Node Project Management API
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/gftf2011/nodejs-fs-projects-rest-api">
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gftf2011/nodejs-fs-projects-rest-api">
  
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/gftf2011/nodejs-fs-projects-rest-api">

  <img alt="Codacy grade" src="https://img.shields.io/codacy/grade/b37f8e24805143d08bb2b674e5255ef7">
  
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gftf2011/nodejs-fs-projects-rest-api">

  <img alt="GitHub forks" src="https://img.shields.io/github/forks/gftf2011/nodejs-fs-projects-rest-api">

  <img alt="Github stars" src="https://img.shields.io/github/stars/gftf2011/nodejs-fs-projects-rest-api">

  <img alt="License" src="https://img.shields.io/github/license/gftf2011/nodejs-fs-projects-rest-api">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/gftf2011/nodejs-fs-projects-rest-api">
</p>

<p align="center">
  <a href="#smiley-purpose">Purpose</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#car-run-the-application">Run the application</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#airplane-application-routes">Application routes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :smiley: Purpose

<p align="center">
  This project was built with intention to explore node.js internal modules, which means no Express. So, to fulfill this purpose, the most known modules were used! Among them are the 'fs' - (File System) module from node.js that is used to store our data, in the project it's not used any database management system like Postgres, Oracle OR MongoDB!
</p>

## :rocket: Technologies

- [yarn](https://classic.yarnpkg.com/lang/en/)
- [node.JS](https://nodejs.org/en/)

## :car: Run the application

1.  node.js installation [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

2.  YARN installation [https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/)

3.  Clone project in your PC :computer:

4.  Open the project with a text editor and run 'yarn' to download the dependencies

5.  Postman download [https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/)

6.  Run 'yarn dev' to use the <strong>endpoints<strong/>

## :airplane: Application routes

-  <strong>`GET /projects :`<strong/> <i>Endpoint responsible to read all projects<i/>
-  <strong>`GET /projects?id=`<strong/><em>`number`<em><strong>`:`<strong/> <i>Endpoint responsible to retrieve a specific project given its `id`<i/><br/><br/>
<em>`number : `<em/> Represents the `id` passed in the query string<br/><br/>
-  <strong>`POST /projects :`<strong/> <i>Endpoint responsible to create a project receiving in the request body the project's `title`<i/><br/><br/>
Request body example below
```json
{
  "title": "Project 1"
}
```
-  <strong>`POST /projects/tasks?id=`<strong/><em>`number`<em/><strong>`:`<strong/> <i>Endpoint responsible to create a task to a specific project given its `id`, also its passed through the request body the `task` for the project<i/><br/><br/>
<em>`number : `<em/> Represents the `id` passed in the query string<br/><br/>
Request body example below

```json
{
  "task": "task 1"
}
```
-  <strong>`PUT /projects?id=`<strong/><em>`number`<em/><strong>`:`<strong/> <i>Endpoint responsible to update a specific project's title given its `id`, also its passed through the request body the new project's `title`<i/><br/><br/>
<em>`number : `<em/> Represents the `id` passed in the query string<br/><br/>
Request body example below
```json
{
  "title": "Project 2"
}
```
-  <strong>`DELETE /projects?id=`<strong/><em>`number`<em/><strong>`:`<strong/> <i>Endpoint responsible to remove a specific project given its `id`.<i/><br/>
<em>`number : `<em/> Represents the `id` passed in the query string <br/>

## :memo: License
This project is under the MIT license. See the [LICENSE](https://github.com/gftf2011/nodejs-fs-projects-rest-api/blob/master/LICENSE) for more information.

---

Made with ♥ by Gabriel Ferrari Tarallo Ferraz :wave: [Get in touch!](https://www.linkedin.com/in/gabriel-ferrari-tarallo-ferraz-7a4218135/)
