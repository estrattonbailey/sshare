# sshare
A tiny, accessible, Medium-like share dialog in about ~2.2kb gzipped. [Demo](http://estrattonbailey.com/sshare) here.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

<img src="https://raw.githubusercontent.com/estrattonbailey/sshare/master/screenshot.png" style="width: 620px; margin: 2em 0;"/>

## Install
```bash
npm i sshare --save
```

## Usage 
```javascript
import sshare from 'sshare'

/**
 * Import sharers or create your own
 */
import twitterURL from 'sshare/sharers/twitter.js'
import facebookURL from 'sshare/sharers/facebook.js'
import emailURL from 'sshare/sharers/email.js'

sshare({
  context: [].slice.call(document.querySelectorAll('.js-sharable')),
  transitionSpeed: 200
})([
  url => `<a href="${twitterURL(url)}" target="_blank"><img src="twitter.svg"/></a>`,
  url => `<a href="${facebookURL(url)}" target="_blank"><img src="facebook.svg"/></a>`,
  url => `<a href="${emailURL(url)}"><img src="email.svg"/></a>`,
])
```

## Example
To run the example, clone this repo, then:
```bash
# move into example dir
cd srraf/example
# install deps
npm i
# compile JS
npm run js:build # or js:watch
# serve index.html and update with changes
live-server 
```

MIT License
