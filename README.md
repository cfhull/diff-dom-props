# diff-dom-props
diff-dom-props is a helper library that diffs two dom nodes and updates the dom with the changes

## Usage
`npm i -S @cfhull/diff-dom-props`

```
import updateElement from '@cfhull/diff-dom-props'

// Set up existing DOM
const oldDOM = document.createElement('div')
oldDOM.innerHTML = 'This is some old text'
document.body.appendChild(oldDOM)

// Create a new DOM
const newDOM = document.createElement('div')
oldDOM.innerHTML = 'This is some new text'

// Update old DOM with new DOM
updateElement(oldDOM.parentElement, newDOM, oldDOM)
```
