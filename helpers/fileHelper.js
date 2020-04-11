const fs = require('fs');

const path = 'data/data.json';

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
        const initialdata = JSON.stringify([]);
        fs.writeFile(path, initialdata, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('initial database created...');
            }
        });
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
