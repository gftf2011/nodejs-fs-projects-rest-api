const fs = require('fs');

const path = '../data/data.json';

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

const fileWrite = (res, data, failure, success) => {
    const jsondata = JSON.stringify(data, null, 2)
    fs.writeFile(path, jsondata, (err) => {
        if (err) {
            failure(res, 500, { message: 'could not persist data!' });
        } else {
            success(res, 200, data);
        }
    });
}

const fileHelper = () => {
    return ({
        fileExists,
        fileWrite
    });
}