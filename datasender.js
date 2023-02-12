const fs = require("fs")

const settings = {
    auto_delete: true
}

/**
* Change the settings of datasender
* @param {string} auto_delete - true/false (Default: true)
*/
function setup(auto_delete) {
    settings.auto_delete = auto_delete;
};

/**
* Delete a data saved.
* @param {string} name - Name of the Data
*/
function deleteImport(name) {
    if (fs.existsSync(`node_modules/datasender/datasender/${name.replaceAll('.', '')}.json`)) {
        fs.unlink(`node_modules/datasender/datasender/${name.replaceAll('.', '')}.json`, function() { return false; });
        return true;
    } else {
        return console.error(`ERROR "importCode": Does not exist any data with that name.`)
    }
}

/**
* Export something for others codes.
* @param {string} name - Name of the Data
* @param {any} content - Content of the Data
*/
function exportCode(name, content) {
    if (name && typeof name === 'string') {
        if (fs.existsSync(`node_modules/datasender/datasender/${name.replaceAll('.', '')}.json`)) return console.error(`ERROR "createFile": Already exists a data with this name.`);
        fs.writeFile(`node_modules/datasender/datasender/${name.replaceAll('.', '')}.json`, JSON.stringify(content), function (err) { if (err) return console.log(err); });
        return true;
    } else { return console.error('ERROR "exportCode": Importation Name is not defined.') }
}

/**
* Import something external for your code.
* @param {string} name - Name of the Data
*/
function importCode(name) {
    if (fs.existsSync(`node_modules/datasender/datasender/${name.replaceAll('.', '')}.json`)) {
        let data = fs.readFileSync(`node_modules/datasender/datasender/${name.replaceAll('.', '')}.json`)
        data = JSON.parse(data);
        if (settings.auto_delete) deleteImport(name);
        return data;
    } else {
        return console.error(`ERROR "importCode": Does not exist any data with that name.`)
    }
}

/**
* Create a listener when detect data sended.
* @param {string} name - Name of the Data
* @param {function} code - Function that will execute when detected
* @param {number} timer - Timer that will check the Data (in MS)
*/
function listener(name, code, timer) {
    setTimeout(() => {
        if (fs.existsSync(`node_modules/datasender/datasender/${name.replaceAll('.', '')}.json`)) {
            let data = fs.readFileSync(`node_modules/datasender/datasender/${name.replaceAll('.', '')}.json`)
            if (settings.auto_delete) deleteImport(name);
            return code(JSON.parse(data));
        } else {
            listener(name, code, timer);
        } 
    }, timer || 2000)
}

module.exports = { setup, importCode, exportCode, deleteImport, listener };