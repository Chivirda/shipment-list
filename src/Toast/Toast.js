let Toast = function(element, config) {
  let _this = this
  let _element = element
  let  _config = {
        autohide: true,
        delay: 2000
      }

  for(let prop in config) {
    _config[prop] = config[prop]
  }

  Object.defineProperty(this, 'element', {
    get: function() {
      return _element
    }
  })

  Object.defineProperty(this, 'config', {
    get: function() {
      return _config
    }
  })
  
  _element.addEventListener('click', function(e) {
    if(e.target.classList.contains('toast__close')) {
      _this.hide()
    }
  })
}

Toast.prototype = {
  show: function() {
    let _this = this
    this.element.classList.add('toast_show')
    if(this.config.autohide) {
      setTimeout(function() {
        _this.hide()
      }, this.config.delay)
    }
  },
  hide: function() {
    this.element.classList.remove('toast_show')
  }
}

Toast.create = function(text, color) {
  let fragment = document.createDocumentFragment()
  let toast = document.createElement('div')
  let toastClose = document.createElement('button')

  toast.classList.add('toast')
  toast.style.backgroundColor = `rgba(${parseInt(color.substr(1, 2), 16)}, ${parseInt(color.substr(3, 2), 16)}, ${parseInt(color.substr(5, 2), 16)}, 0.5)`
  toast.textContent = text
  toastClose.classList.add('toast__close')
  toastClose.setAttribute('type', 'button')
  toastClose.textContent = 'x'
  toast.appendChild(toastClose)
  fragment.appendChild(toast)

  return fragment
}

Toast.add = function(params) {
  let config = {
    text: 'Успешно скопировано.',
    color: '#28a745',
    autohide: true,
    delay: 2000
  }

  if(params !== undefined) {
    for(let i in params) {
      config[i] = params[i]
    }
  }
  
  if(!document.querySelector('.toasts')) {
    let container = document.createElement('div')
    
    container.classList.add('toasts')
    container.style.cssText = 'position: fixed; bottom: 10%; right: 15px; width: 250px;'
    document.body.appendChild(container)
  }
  
  document.querySelector('.toasts').appendChild(Toast.create(config.text, config.color))
  
  let toasts = document.querySelectorAll('.toast')
  let toast = new Toast(toasts[toasts.length - 1], {autohide: config.autohide, delay: config.delay})
  
  toast.show()

  return toast
}

export default Toast