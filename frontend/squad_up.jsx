import React from 'react'
import ReactDom from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')
    ReactDom.render(<h1>Hello From React</h1>, root)
})