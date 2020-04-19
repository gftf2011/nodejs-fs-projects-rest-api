const http = require('http');
const url = require('url');
const querystring = require('querystring');

const fileHelper = require('./helpers/fileHelper.js');

fileHelper.createDatabase();

const data = fileHelper.fileRead();

let projects = JSON.parse(data);
let lastindex = projects.length === 0 ? 0 : projects[projects.length - 1].id;

const sendResponse = (res, status, data) => {
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'content-type');

    const urlparse = url.parse(req.url, true);

    if (urlparse.pathname === '/projects' && req.method === 'OPTIONS') {
        sendResponse(res, 200, true);
    }
    else if (urlparse.pathname === '/projects' && req.method === 'GET') {
        const search = urlparse.search;

        if (search) {
            const [, query] = urlparse.search.split('?');
            const data = querystring.parse(query);
            const project = projects.filter(project => project.id == data.id);

            if (project.length > 0) {
                sendResponse(res, 200, project);
            } else {
                sendResponse(res, 400, { message: 'could not find project!' });
            }
        } else {
            sendResponse(res, 200, projects);
        }
    } else if (urlparse.pathname === '/projects' && req.method === 'POST') {
        req.on('data', data => {
            const jsondata = JSON.parse(data);
            const title = jsondata.title;

            if (!title) {
                sendResponse(res, 400, { message: 'no title in body request!' });
            } else {
                projects.push({id: ++lastindex, title, tasks: [] });

                fileHelper.fileWrite(res, projects, sendResponse);
            }
        });
    } else if (urlparse.pathname === '/projects/tasks' && req.method === 'POST') {
        req.on('data', data => {
            const search = urlparse.search; 
        
            if (search) {
                const [, query] = urlparse.search.split('?');
                const id = querystring.parse(query).id;

                if (id) {
                    const jsondata = JSON.parse(data);
                    const task = jsondata.task;

                    if (!task) {
                        sendResponse(res, 400, { message: 'no task found in body request!' });
                    } else {
                        projects.forEach((project, index) => {
                            if (project.id == id) {
                                projects[index].tasks.push(task);
                            }
                        });

                        fileHelper.fileWrite(res, projects, sendResponse);
                    }
                } else {
                    sendResponse(res, 400, { message: 'no id parameter!' });
                }
            } else {
                sendResponse(res, 400, { message: 'no query parameter!' });
            }
        });
    } else if (urlparse.pathname === '/projects' && req.method === 'PUT') {
        req.on('data', data => {
            const search = urlparse.search; 
        
            if (search) {
                const [, query] = urlparse.search.split('?');
                const id = querystring.parse(query).id;

                if (id) {
                    const jsondata = JSON.parse(data);
                    const title = jsondata.title;

                    if (!title) {
                        sendResponse(res, 400, { message: 'no title found in body request!' });
                    } else {
                        projects.forEach((project, index) => {
                            if (project.id == id) {
                                projects[index].title = title;
                            }
                        });

                        fileHelper.fileWrite(res, projects, sendResponse);
                    }
                } else {
                    sendResponse(res, 400, { message: 'no id parameter!' });
                }
            } else {
                sendResponse(res, 400, { message: 'no query parameter!' });
            }
        });
    } else if (urlparse.pathname === '/projects' && req.method === 'DELETE') {
        const search = urlparse.search;

        if (search) {
            const [, query] = urlparse.search.split('?');
            const data = querystring.parse(query);

            projects = projects.filter(project => project.id != data.id);

            fileHelper.fileWrite(res, projects, sendResponse);
        } else {
            sendResponse(res, 400, { message: 'no query parameter!' });
        }
    } else {
        sendResponse(res, 404, { message: 'service not found!' });
    }
});

server.listen(8000);
