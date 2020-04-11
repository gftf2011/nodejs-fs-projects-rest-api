const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const data = fs.readFileSync('data/data.json');

let projects = JSON.parse(data);
let lastindex = projects[projects.length - 1].id;

const sendResponse = (res, status, data) => {
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
    const urlparse = url.parse(req.url, true);

    if (urlparse.pathname === '/projects' && req.method === 'GET') {
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

                fs.writeFile('data/data.json', JSON.stringify(projects, null, 2), (err) => {
                    if (err) {
                        sendResponse(res, 500, { message: 'could not persist data!' });
                    } else {
                        sendResponse(res, 200, projects);
                    }
                });
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

                        fs.writeFile('data/data.json', JSON.stringify(projects, null, 2), (err) => {
                            if (err) {
                                sendResponse(res, 500, { message: 'could not persist data!' });
                            } else {
                                sendResponse(res, 200, projects);
                            }
                        });
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

                        fs.writeFile('data/data.json', JSON.stringify(projects, null, 2), (err) => {
                            if (err) {
                                sendResponse(res, 500, { message: 'could not persist data!' });
                            } else {
                                sendResponse(res, 200, projects);
                            }
                        });
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

            fs.writeFile('data/data.json', JSON.stringify(projects, null, 2), (err) => {
                if (err) {
                    sendResponse(res, 500, { message: 'could not persist data!' });
                } else {
                    sendResponse(res, 200, projects);
                }
            });
        } else {
            sendResponse(res, 200, projects);
        }
    }
});

server.listen(8000);
