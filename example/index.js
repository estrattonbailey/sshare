import sshare from '../package/dist/index.js'
import twitter from '../package/dist/sharers/twitter.js'
import facebook from '../package/dist/sharers/facebook.js'
import email from '../package/dist/sharers/email.js'

import {
  twitter as tw,
  facebook as fb,
  gmail
} from './icons.js'

document.addEventListener('DOMContentLoaded', e => {
  sshare({
    context: [].slice.call(document.querySelectorAll('.js-sharable')),
    transitionSpeed: 200
  })([
    url => `<a href="${twitter(url)}" target="_blank">${tw}</a>`,
    url => `<a href="${facebook(url)}" target="_blank">${fb}</a>`,
    url => `<a href="${email(url)}">${gmail}</a>`,
  ])
})
