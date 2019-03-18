import React from 'react'
import { Button } from 'reactstrap'

function redirect() {
  window.open('https://andrew-davis.net')
}

function Credit() {
  return (
    <Button onClick={redirect}>Made with <span role="img" aria-label="heart emoji">💖</span> by Andrew Davis (atd285)</Button>
  )
}
export default Credit;