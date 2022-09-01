const fs = require("fs");
const request = require('request');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const args = process.argv.slice(2);
const URL = args[0];
const PATH = args[1];

 
request(URL, (error, response, body) => {
  fs.writeFile(PATH, body, {flag: 'ax'}, err => {
    if (err) {
      rl.question('The file already exists, would you like to overwrite it? y/n  ', (answer) => {
        if(answer === 'y') {
          fs.writeFile(PATH, body, err => {
            console.log(`Downloaded and saved ${body.length} bytes to ${PATH}`);
            rl.close();
          })
        } else {
          rl.close();
        }
      })
    } else {
      console.log(`Downloaded and saved ${body.length} bytes to ${PATH}`);
      rl.close();
    }
  });
});