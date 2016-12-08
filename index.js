#!/usr/bin/env node

'use strict';

const co = require('co');
const fs = require('fs');
const path = require('path');
const ncp = require('copy-paste');
const program = require('commander');
const googleTTS = require('google-tts-api');
const urlshortener = require('./urlshortener.js')
const pkg = require('./package.json');

function save() {
  fs.writeFileSync(
    path.resolve(__dirname, './package.json'),
    JSON.stringify(pkg, null, 2) + '\n'
  );
}

function setLang(lang) {
  pkg.config.lang = lang;
  save();
}

function setApiKey(apiKey) {
  pkg.config.apiKey = apiKey;
  save();
}

program
  .usage('<sentence>')
  .version(pkg.version)
  .option('-l, --lang <language>', 'setup language (default is "en")', setLang)
  .option('-k, --api-key <api_key>', 'setup Google API Key to shorten URL', setApiKey)
  .parse(process.argv);

// show help info if input is empty
if (process.argv.length <= 2) {
  program.help();
}

// check args
if (program.args.length === 0) {
  process.exit();
}

// start
co(function * () {
  const lang = pkg.config.lang;
  const apiKey = pkg.config.apiKey;
  const sentence = program.args[0];

  let url = yield googleTTS(sentence, lang);
  if (typeof apiKey === 'string' && apiKey.length > 0) {
    url = yield urlshortener(apiKey, url);
  }

  // show url
  console.log(url);

  // copy url to system clipboard
  ncp.copy(url);
})
.catch(console.error);
