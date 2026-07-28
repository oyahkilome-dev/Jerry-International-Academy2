const fs = require('fs');
const content = fs.readFileSync('server.ts', 'utf8');

const startStr = "app.delete('/api/admin/media/:id'";
const startIdx = content.indexOf(startStr);
if (startIdx !== -1) {
    let brackets = 0;
    let endIdx = -1;
    let started = false;
    for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '{') {
            brackets++;
            started = true;
        } else if (content[i] === '}') {
            brackets--;
            if (started && brackets === 0) {
                endIdx = i + 1;
                break;
            }
        }
    }
    if (endIdx !== -1) {
        console.log(content.substring(startIdx, endIdx));
    }
}
