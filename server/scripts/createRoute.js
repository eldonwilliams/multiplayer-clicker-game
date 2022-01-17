// Quickly creates an empty route

const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname, '../routes',process.argv[2] || 'empty.null.js'),
    fs.readFileSync(path.join(__dirname, './emptyRoute.dontuse.js')),
    {},
    (err) => {
        if (err) console.error(err);
        console.log(err ?
            `There was an error whilst creating the file ${process.argv[2]}` :
            `Files ${process.argv[2]} created successfully`);
    });