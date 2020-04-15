<h1 align="center">
  <img alt="Imagem da Logo do Framework node.js" src="https://www.pinclipart.com/picdir/big/102-1024697_related-wallpapers-node-js-logo-png-clipart.png" height="120" /><br><br> Node Project Management API
</h1>

## :rocket: Tecnologies

- [yarn](https://classic.yarnpkg.com/lang/en/)
- [node.JS](https://nodejs.org/en/)

## :car: Run the application

1.  node.js installation [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

2.  YARN installation [https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/)

3.  Clone project in your PC :computer:

4.  Open the project with a text editor and run 'yarn' to download the dependencies

5.  Postman download [https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/)

6.  Run 'yarn dev' to use the <strong>endpoints<strong/>

## :airplane: application routes

-  <strong>`GET /projects :`<strong/> <i>Endpoint responsible to read all projects<i/>
-  <strong>`GET /projects?id=`<strong/><em>`number`<em><strong>`:`<strong/> <i>Endpoint responsible to retrieve a specific project given its unique identifier<i/>
-  <strong>`POST /projects :`<strong/> <i>Endpoint responsible to create a project receiving in the request body the project's `title`<i/>
  >  Request body example below
  >  ```javascript
  >  {
  >    "title": "Project 1"
  >  }
  >  ```
