const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const data = fs.readFileSync('data/data.json');
const projects = JSON.parse(data);

let lastindex = projects[projects.length - 1].id;

const server = http.createServer((req, res) => {
    const urlparse = url.parse(req.url, true);

    if (urlparse.pathname === '/projects' && req.method === 'GET') {
        const search = urlparse.search;

        if (search) {
            const [, query] = urlparse.search.split('?');
            const data = querystring.parse(query);
            const project = projects.filter(project => project.id == data.id);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(project, null, 2));
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(projects, null, 2));
    } else if (urlparse.pathname === '/projects' && req.method === 'POST') {
        req.on('data', data => {
            const jsondata = JSON.parse(data);
            const title = jsondata.title;

            if (!title) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'no title in body request!' }, null, 2));
            } else {
                projects.push({id: ++lastindex, title, tasks: [] });

                fs.writeFile('data/data.json', JSON.stringify(projects, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: 'could not persist data!' }, null, 2));
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(projects, null, 2));
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
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: 'no task found in body request!' }, null, 2));
                    } else {
                        projects.forEach((project, index) => {
                            if (project.id == id) {
                                projects[index].tasks.push(task);
                            }
                        });

                        fs.writeFile('data/data.json', JSON.stringify(projects, null, 2), (err) => {
                            if (err) {
                                res.writeHead(500, {'Content-Type': 'application/json'});
                                res.end(JSON.stringify({ message: 'could not persist data!' }, null, 2));
                            } else {
                                res.writeHead(200, {'Content-Type': 'application/json'});
                                res.end(JSON.stringify(projects, null, 2));
                            }
                        });
                    }
                } else {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: 'no id parameter!' }, null, 2));
                }
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'no query parameter!' }, null, 2));
            }
        });
    }
});

server.listen(8000);
