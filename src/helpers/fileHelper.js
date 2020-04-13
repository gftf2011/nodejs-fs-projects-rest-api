const fs = require('fs');

const path = './src/data/data.json';

const fileExists = () => {
    try {
        if (fs.existsSync(path)) {
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const createDatabase = () => {
    if (!fileExists()) {
        fs.mkdirSync('./src/data', { recursive: true });
        fs.writeFileSync(path, JSON.stringify([]));
    } else {
        console.log('database already exists...');
    }
}

const fileRead = () => {
    return fs.readFileSync(path);
}

const fileWrite = (res, data, sender) => {
    const jsondata = JSON.stringify(data, null, 2);

    fs.writeFile(path, jsondata, (err) => {
        if (err) {
            sender(res, 500, { message: 'could not persist data!' });
        } else {
            sender(res, 200, data);
        }
    });
}

module.exports = {
    createDatabase,
    fileWrite,
    fileRead
};
