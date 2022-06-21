const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

const GoStumble = (code, auth) => new Promise((resolve, reject) => {

    fetch(`http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/${code}`, {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    console.log(`
███████ ████████ ██    ██ ███    ███ ██████  ██      ███████         
██         ██    ██ FADLAN KULL🥶🥶   ██ ████  ████ ██   ██ ██      ██           
███████    ██    ██    ██ ██ ████ ██ ██████  ██      █████          
     ██    ██    ██    ██ ██  ██  ██ ██   ██ ██      ██            
███████    ██     ██████  ██      ██ ██████  ███████ ███████    

By : ${chalk.red('@dkmpostor & @FadlanKull')} - ${chalk.blue('https://sociabuzz.com/fadlana')}

Features :

1. ${chalk.magenta('Push Crown + Trophy')}
2. ${chalk.magenta('Push Trophy Only')}
`);

    const feature = rs.question('[+] Enter feature needed : ');
    const auth = rs.question('[+] Tempel Kode Auth : ');
    console.log('');

    if (feature == '1') {

        while (true) {

            var code = '3';
            const result = await GoStumble(code, auth);
            if (!result) {

                console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Kode Auth Anda Expired !`));
                break;

            } else if (result.includes('User')) {

                const data = JSON.parse(result);
                const username = data.User.Username;
                const country = data.User.Country;
                const trophy = data.User.SkillRating;
                const crown = data.User.Crowns;
                
                console.log(chalk.green(`\r[ ${moment().format('HH:mm:ss')} ] Nama : ${username} | Country : ${country} | ${chalk.blue(`Trophy : ${trophy}`)} | ${chalk.green(`Crown : ${crown}`)}`));
                

            } else if (result == 'BANNED') {

                console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Akun anda Kena band 😘😘!`));
                break;
                
            } else if (result == 'SERVER_ERROR') {

                continue;
                
            }
        }
        
    } else if (feature == '2') {

        while (true) {

            var code = '2';
            const result = await GoStumble(code, auth);
            if (!result) {

                console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Kode Auth Anda Sudah Expired !`));
                break;

            } else if (result.includes('User')) {

                const data = JSON.parse(result);
                const username = data.User.Username;
                const country = data.User.Country;
                const trophy = data.User.SkillRating;
                
                console.log(chalk.green(`\r[ ${moment().format('HH:mm:ss')} ] Nama : ${username} | Country : ${country} | ${chalk.blue(`Trophy : ${trophy}`)}`));
                
            } else if (result == 'BANNED') {

                console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Akun Anda Kena Band😘😘 !`));
                break;
                
            } else if (result == 'SERVER_ERROR') {

                continue;
                
            }
        }

    } else {

        console.log(chalk.red('[!] Features not available !'));

    }
    

})();
