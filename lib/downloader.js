const { exec } = require('child_process');
const logger = require('./logger');

module.exports = (options, result) => {
    let op = '';
    if (options.name) {
        options.name = options.name.replace(/\/|:|"|\*|<|>|≥|≤|\?|\\|\|/g, '')
    }
    switch (options.engine) {
        case 'you-get':
            // if (options.name) {
            //     op += ` -O ${options.name}`;
            // }
            // if (options.path) {
            //     exec(`mkdir downloads/${options.path}`);
            //     op += ` -o downloads/${options.path}`;
            // }

            // exec(`you-get ${op} ${options.url} >> logs/you-get.log`, (err, stdout, stderr) => {
            //     if (err) {
            //         logger.error(`stderr: ${JSON.stringify(options)}, ${stderr}`);
            //         return;
            //     }
            
            //     logger.info(`stdout: ${JSON.stringify(options)}`);
            // });

            exec(`cd /home/kiana/sm100g/bilibili && ./download.sh ${options.url}`, (err, stdout, stderr) => {
                if (err) {
                    logger.error(`stderr: ${JSON.stringify(options)}, ${stderr}`);
                    return;
                }
            
                logger.info(`stdout: ${JSON.stringify(options)}`);
            });
            break;
        case 'wget':
            op += '-a logs/wget.log';
            if (options.name) {
                if (options.path) {
                    exec(`mkdir downloads/${options.path}`);
                    op += ` -O downloads/${options.path}/${options.name}`;
                } else {
                    op += ` -O downloads/${options.name}`;
                }
            } else if (options.path) {
                op += ` -P downloads/${options.path}/`;
            }

            exec(`wget ${op} ${options.url}`, (err, stdout, stderr) => {
                if (err) {
                    logger.error(`stderr: ${JSON.stringify(options)}, ${stderr}`);
                    return;
                }
            
                logger.info(`stdout: ${JSON.stringify(options)}`);
            });
            break;
        default:
            result.code = 3;
            result.msg = 'unsupported engine';
    }
}
