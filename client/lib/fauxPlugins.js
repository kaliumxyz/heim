/* eslint-disable react/no-danger */

import React from 'react'
import moment from 'moment'


const roomStylesheets = {
  thedrawingroom: 'thedrawingroom',
  lovenest: 'thedrawingroom',
  has: 'thedrawingroom',
  adventure: 'monospace',
  chess: 'monospace',
  monospace: 'monospace',
  space: 'norman',
  sandersforpresident: 'sandersforpresident',
  xkcd: 'xkcd',
}

export default function initPlugins(roomName) {
  /* Custom stylesheets */
  // Add a new .less file in gadgets/ and amend the table above to create a new one.
  const stylesheet = roomStylesheets[roomName]
  if (stylesheet) {
    Heim.hook('page-bottom', () => (
      <link key="custom-style" rel="stylesheet" type="text/css" href={'/static/' + stylesheet + '.css'} />
    ))
  }

  /* Per-room customizations */
  if (roomName === 'space') {
    const Embed = require('./ui/Embed').default

    Heim.hook('main-sidebar', () => (
      <div key="norman" className="norman">
        <p>norman</p>
        <Embed kind="imgur" imgur_id="UKbitCO" />
      </div>
    ))
  }

  if (roomName === 'music' || roomName === 'youtube' || roomName === 'rmusic' || roomName === 'listentothis') {
    require('./gadgets/YoutubeTV').install()
  }

  if (roomName === 'adventure' || roomName === 'chess' || roomName === 'monospace') {
    Heim.chat.setRoomSettings({collapse: false})
  }

  if (roomName === 'sandersforpresident') {
    Heim.hook('main-pane-top', () => {
      const MessageText = require('./ui/MessageText').default
      return (
        <div key="sanders-top-bar" className="secondary-top-bar"><MessageText onlyEmoji content=":us:" /> Welcome to the <a href="https://reddit.com/r/sandersforpresident" target="_blank" rel="noreferrer noopener">/r/SandersForPresident</a> live chat! Please <a href="https://www.reddit.com/r/SandersForPresident/wiki/livechat" target="_blank" rel="noreferrer noopener">read our rules</a>.</div>
      )
    })
  }

  if (roomName === 'xkcd') {
    Heim.hook('main-pane-top', () => (
      <div key="xkcd-top-bar" className="secondary-top-bar"><span className="motto" title="All problems are solvable by being thrown at with bots">Omnes qu&aelig;stiones solvuntur eis iactandis per machinis</span></div>
    ))
  }

  /* Alternate themes */
  if (uiwindow.location.hash.substr(1) === 'spooky') {
    Heim.hook('page-bottom', () => (
      <link key="spooky-theme" rel="stylesheet" type="text/css" href="/static/theme-spooky.css" />
    ))
  }

  if (uiwindow.location.hash.substr(1) === 'darcula') {
    Heim.hook('page-bottom', () => (
      <link key="darcula-theme" rel="stylesheet" type="text/css" href="/static/theme-darcula.css" />
    ))
  }

  /* Anniversary gadget */
  const now = moment()
  if (now.month() === 11 && (now.date() === 13 || now.date() === 14)) {
    Heim.hook('page-bottom', () => (
      <link key="anniversary-style" rel="stylesheet" type="text/css" href="/static/anniversary.css" />
    ))
  }
}
