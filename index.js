#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const ncp = require('copy-paste');
const program = require('commander');
const googleTTS = require('google-tts-api');
const pkg = require('./package.json');


function setLang(lang) {
  pkg.lang = lang;

  fs.writeFileSync(
    path.resolve(__dirname, './package.json'),
    JSON.stringify(pkg, null, 2) + '\n'
  );
}

program
  .usage('<sentence>')
  .version(pkg.version)
  .option('-l, --lang <language>', 'setup language (default is "en")', setLang)
  .parse(process.argv);


// show help info if input is empty
if (process.argv.length <= 2) {
  program.help();
}

// check args
if (program.args.length === 0) {
  process.exit();
}

googleTTS(program.args[0], pkg.lang)
  .then(function (url) {
    console.log(url);

    // copy url to system clipboard
    ncp.copy(url);
  })
  .catch(console.error);
