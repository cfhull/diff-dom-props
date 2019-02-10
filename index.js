export default function updateElement(parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    parent.appendChild(
      createElement(newNode)
    )
  } else if (!newNode) {
    parent.removeChild(
      parent.childNodes[index]
    )
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index]
    )
  } else if (newNode.nodeType) {
    updateProps(
      parent.childNodes[index],
      newNode.props,
      oldNode.props,
    )
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    node1.type !== node2.type
}

function updateProps(el, newProps, oldProps = {}) {
  const props = Object.assign({}, newProps, oldProps)
  Object.keys(props).forEach(name => {
    if (!newProps[name]) {
      el[name] = undefined
    } else if (!oldProps[name] || newProps[name] !== oldProps[name]) {
      el[name] = newProps[name]
      el.props = newProps
    }
  })
}

function createElement(node) {
  const el = document.createElement(node.nodeType)
  Object.keys(node.props).forEach(name => {
    el[name] = node.props[name]
  })
  el.props = node.props

  node.children
    .map(createElement)
    .forEach(el.appendChild.bind(el))

  return el
}


