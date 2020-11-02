const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: '',
    capslock: false
  },

  init () {
    //create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    //setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    //add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    //automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach(element => {
      element.addEventListener ('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'ru',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '/',
      'done', 'keyboard', 'mic', 'arrLeft', 'space', 'arrRight', 'sound'
    ];

    //create HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach (key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'ru', 'en', 'enter', '/'].indexOf(key) !== -1;
    
      //add atributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');;

          keyElement.addEventListener ('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length -1);
            this._triggerEvent('oninput');
          });

          break;

          case 'caps':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('keyboard_capslock');
  
            keyElement.addEventListener ('click', () => {
              this._toggleCapsLock();
              keyElement.classList.toggle('keyboard__key--active', this.properties.capslock);
            });
  
          break;

          case 'enter':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('keyboard_return');
  
            keyElement.addEventListener ('click', () => {
              this.properties.value += '\n';
              this._triggerEvent('oninput');
            });
  
          break;

          case 'space':
            keyElement.classList.add('keyboard__key--extra-wide');
            keyElement.innerHTML = createIconHTML('space_bar');
  
            keyElement.addEventListener ('click', () => {
              this.properties.value += ' ';
              this._triggerEvent('oninput');
            });
  
          break;

          case 'done':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
            keyElement.innerHTML = createIconHTML('check_circle');
  
            keyElement.addEventListener ('click', () => {
              this.close();
              this._triggerEvent('onclose');
            });
  
          break;

          case 'keyboard':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('keyboard_hide');

            keyElement.addEventListener ('click', () => {
              this.close();
              this._triggerEvent('onclose');
            });

          break;

          case 'tab':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('keyboard_tab');

            keyElement.addEventListener('click', () => {
              this.properties.value += '    ';
              this._triggerEvent ('oninput');
            });

          break;

          case 'ru':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = 'RU';

            keyElement.addEventListener('click', () => {
              console.log('click language')
            });

          break;

          case 'shift':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('keyboard_arrow_up');

            keyElement.addEventListener('click', () => {
              keyElement.classList.toggle('keyboard__key--active');
              console.log ('click shift');
            });

          break;

          case '/':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = '/';

            keyElement.addEventListener('click', () => {
              this.properties.value += '/';
              this._triggerEvent ('oninput');
            });

          break;

          case 'mic':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('keyboard_voice');

            keyElement.addEventListener('click', () => {
              keyElement.classList.toggle('keyboard__key--active');
              console.log('click micro')
            });

          break;

          case 'arrLeft':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('keyboard_arrow_left');

            keyElement.addEventListener('click', () => {
              console.log('click arrow left')
            });

          break;

          case 'sound':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('volume_up');

            keyElement.addEventListener('click', () => {
              keyElement.classList.toggle('keyboard__key--active');
              console.log('click sound')
            });

          break;

          case 'arrRight':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('keyboard_arrow_right');

            keyElement.addEventListener('click', () => {
              console.log('click arrow right')
            });

          break;


          default:
            keyElement.textContent = key.toLowerCase();
  
            keyElement.addEventListener ('click', () => {
              this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase();
              this._triggerEvent('oninput');
            });
  
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'))
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capslock = !this.properties.capslock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  }, 

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  }
};

window.addEventListener('DOMContentLoaded', function() {
  Keyboard.init();
})