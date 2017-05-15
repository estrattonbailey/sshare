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

const share = sshare({
  context: '.js-sharable',
  transitionSpeed: 200
}, [
  highlightedText => `<a href="${twitterURL(highlightedText)}" target="_blank"><img src="twitter.svg"/></a>`,
  highlightedText => `<a href="${facebookURL(highlightedText)}" target="_blank"><img src="facebook.svg"/></a>`,
  highlightedText => `<a href="${emailURL(highlightedText)}"><img src="email.svg"/></a>`,
])

share.destroy() // removes all markup and listeners
```

The generated markup for the above looks like this:
```html
<div class="sshare is-tacked is-active" aria-label="Share Dialog" aria-hidden="false" tabindex="0">
  <div class="sshare__inner">
    <a href="...shareurl..." target="_blank"><img src="twitter.svg"/></a>
    <a href="...shareurl..." target="_blank"><img src="facebook.svg"/></a>
    <a href="...shareurl..."><img src="email.svg"/></a>
  </div>
</div>
```
And the CSS from the demo looks like this:
```scss
.sshare {
  position: absolute;
  visibility: hidden;
  top: 0;
  left: 0;
  opacity: 0;
  transition-property: transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(.24,.82,.35,1);
}
.sshare:focus {
  outline: 0;
}
.sshare.is-tacked {
  visibility: visible;
}
.sshare.is-active {
  opacity: 1;
}
.sshare.is-hiding {
  opacity: 0;
}
.sshare__inner {
  display: flex;
  background: white;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0,0,0,0.2);
}
.sshare__inner::before {
  content: '';
  display: block;
  position: absolute;
  left: 0; right: 0; bottom: 0;
  margin: auto;
  width: 10px;
  height: 10px;
  transform: translateY(40%) rotate(45deg);
  background-color: white;
}
.sshare__inner a {
  position: relative;
  width: 35px;
  height: 35px;
  line-height: 35px;
  color: black;
}
.sshare__inner a:hover {
  color: $theme;
}
.sshare__inner a:focus {
  color: $theme;
  outline: 0;
}
.sshare__inner a svg {
  display: block;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  margin: auto;
  width: 14px;
  height: 14px;
}
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
