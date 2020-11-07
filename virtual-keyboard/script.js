let input = document.querySelectorAll('.use-keyboard-input');
let keyLayout;

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
    capslock: false,
    shift: false,
    lang: 'en',
    start: 0,
    end: 0,
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
    input.forEach(element => {
      element.addEventListener ('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    const keyLayoutEn = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'ru',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '\\',
      'done', 'keyboard', 'mic', 'arrLeft', 'space', 'arrRight', 'sound'
    ];
  
    const keyLayoutRu = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'en',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '\\',
      'done', 'keyboard', 'mic', 'arrLeft', 'space', 'arrRight', 'sound'
    ];
  
    const keyShiftEn = [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
      'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'ru',
      'caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'enter',
      'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '|',
      'done', 'keyboard', 'mic', 'arrLeft', 'space', 'arrRight', 'sound'
    ];
  
    const keyShiftRu = [
      'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
      'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'en',
      'caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
      'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '/',
      'done', 'keyboard', 'mic', 'arrLeft', 'space', 'arrRight', 'sound'
    ];

    let currentKeys;
    let currentInsertLineBreak;

    if(!this.properties.shift && this.properties.lang !== 'en') {
      currentKeys = keyLayoutRu;
      currentInsertLineBreak = ['backspace', 'en', 'enter', '\\'];
    }

    if (this.properties.shift && this.properties.lang !== 'en') {
      currentKeys = keyShiftRu;
      currentInsertLineBreak = ['backspace', 'en', 'enter', '/'];
    }

    if(!this.properties.shift && this.properties.lang === 'en') {
      currentKeys = keyLayoutEn;
      currentInsertLineBreak = ['backspace', 'ru', 'enter', '\\'];
    }

    if(this.properties.shift && this.properties.lang === 'en') {
      currentKeys = keyShiftEn;
      currentInsertLineBreak = ['backspace', 'ru', 'enter', '|'];
    }

    //create HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    currentKeys.forEach (key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = currentInsertLineBreak.indexOf(key) !== -1;

      //add atributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener ('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length -1);
            this._triggerEvent('oninput');
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
        case 'en':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.setAttribute('id', 'lang');

          if (this.properties.lang === 'en') {
            keyElement.innerHTML = 'EN';
          } else {
            keyElement.innerHTML = 'RU';
          }

         
          keyElement.addEventListener('click', () => {
            this._toggleLang();
            this._triggerEvent('oninput');
          });

        break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');
          keyElement.id = 'caps';

          keyElement.addEventListener ('click', () => {
            this._toggleCapsLock();

            const caps = document.getElementById('caps');
            caps.classList.toggle('keyboard__key--active', this.properties.caps);
            
            this._triggerEvent('oninput');
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

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_up');
          keyElement.id = 'shift';

          keyElement.addEventListener('click', () => {
            this._toggleShift();

            const shift = document.getElementById('shift');
            shift.classList.toggle('keyboard__key--active', this.properties.shift);

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

        case 'mic':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_voice');

          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle('keyboard__key--active');
            console.log('click micro')
          });

        break;

        case 'arrRight':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_right');

          keyElement.addEventListener('click', () => {
            console.log('click arrow right')
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

      default:
        keyElement.textContent = key.toLowerCase();

        keyElement.addEventListener ('click', () => {
          if (this.properties.capslock && this.properties.shift){
            this.properties.value += key.toLowerCase();
          } else if (this.properties.capslock || this.properties.shift) {
            this.properties.value += key.toUpperCase();
          } else {
            this.properties.value += key.toLowerCase();
          }
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
        if (this.properties.capslock && !this.properties.shift) {
          key.textContent = key.textContent.toUpperCase();
        } else if (this.properties.capslock && this.properties.shift) {
          key.textContent = key.textContent.toLowerCase();
        } else if (!this.properties.capslock && this.properties.shift) {
          key.textContent = key.textContent.toUpperCase();
        } else { 
          key.textContent = key.textContent.toLowerCase();
        }
      }
    }
  }, 

  _toggleLang() {
    this.properties.lang = this.properties.lang === 'en' ? 'ru' : 'en';

    if (this.properties.capslock) {
      this._toggleCapsLock();
    } else if (this.properties.shift) {
      this._toggleShift();
    }

    this._changeKeys();
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    this._changeKeys();

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (this.properties.shift && !this.properties.capslock) {
          key.textContent = key.textContent.toUpperCase();

        } else if (this.properties.shift && this.properties.capslock) {
          key.textContent = key.textContent.toLowerCase();

          const caps = document.getElementById('caps');
          caps.classList.add('keyboard__key--active', this.properties.caps);

        } else if (!this.properties.shift && this.properties.capslock) {
          key.textContent = key.textContent.toUpperCase();

          const caps = document.getElementById('caps');
          caps.classList.add('keyboard__key--active', this.properties.caps);

        } else { 
          key.textContent = key.textContent.toLowerCase();
        }
      }
    }
  },

  _changeKeys() {
    this.elements.keysContainer.innerHTML = '';
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
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
});

