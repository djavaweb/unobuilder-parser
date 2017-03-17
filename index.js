class HTMLParser {
  constructor(markup) {
    const state = {
      none: {},
      hover: {},
      active: {},
      focus: {}
    }
    this.markup = markup
    this.result = {
      dataObject: {
        class: {},
        style: {},
        attrs: {},
        domProps: {}
      },
      cssProperties: {
        large: state,
        medium: state,
        small: state,
        tiny: state
      },
      childNodes: [],
      id: '',
      tagName: '',
      domType: '',
      selected: false,
      kind: undefined,
      label: undefined,
      requiredParent: false
    }
    this.attrExclude = [
      'id',
      'class',
      'style',
      'kind',
      'label',
      'editable',
      'required-parent',
      'root'
    ]

    return this.parse()
  }

  parse () {
    const node = document.createElement('div')
    node.innerHTML = this.markup
    .replace(/(\t|^\s+|\s+$)(?![^<]*>|[^<>]*<\/)/gm, '')
    .replace(/[\n|\r|\t]/g, '')
    const target = node.firstChild

    const recursive = element => {
      let result = element.nodeValue
      if (element.nodeName !== '#text') {
        result = this.getAll(element)
      }

      if (this.hasChild(element)) {
        for (let i = 0; i < element.childNodes.length; i++) {
          const child = element.childNodes[i]
          result.childNodes.push(recursive(child))
        }
      }

      if (result) {
        return result
      }
    }

    return recursive(target)
  }

  hasChild (element) {
    return element.childNodes.length > 0
  }

  getAll (target, except = []) {
    const result = Object.assign({}, this.result)
    if (target.nodeName !== '#text') {
      result.id = 'babab'
      result.dataObject.style = this.getStyle(target)
      result.dataObject.class = this.getClass(target)
      result.dataObject.attrs = this.getAttrs(target)
      result.dataObject.attrs['data-uno-id'] = result.id
      result.kind = this.getSpecialAttr('kind', target)
      result.label = this.getSpecialAttr('label', target)
    }
    return result
  }

  getStyle (element) {
    const styles = {}
    var computedStyle = window.getComputedStyle(element, null);
    for (let prop in element.style) {
      const hasProperty = element.style.hasOwnProperty(prop)
      const style = element.style[prop]
      if (hasProperty && style !== '' && isNaN(parseInt(prop))) {
        styles[prop] = element.style[prop]
      }
    }
    return styles
  }

  getClass (element) {
    const classes = {}
    this._toArray(element.classList).forEach(item => {
      classes[item] = true
    })
    return classes
  }

  getAttrs (element) {
    const attrs = {}
    this._toArray(element.attributes).forEach(item => {
      if (!this.attrExclude.includes(item.localName)) {
        attrs[item.localName] = item.value
      }
    })
    return attrs
  }

  getSpecialAttr (attr, element) {
    const value = element.getAttribute(attr)
    if (value) {
      return value
    }
  }

  _toArray (value) {
    return [].slice.call(value)
  }
}

module.exports = HTMLParser