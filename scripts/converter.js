const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');
const glob = require("glob");

const [folder] = process.argv.splice(2);
const pattern = path.resolve(__dirname, '..', `${folder}/*.srt`);

glob(pattern, function (error, files) {
    if (error) throw new Error(error);

    for (let i = 1; i < files.length; i++) {
        const file = files[i];
        const extname = path.extname(file);
        const _temp = file.replace(extname, `.extra${extname}`);

        const converter = iconv.decodeStream('GB2312');
        const reader = fs.createReadStream(file);
        const writer = fs.createWriteStream(_temp);
        reader.pipe(converter).pipe(writer);
    }
});