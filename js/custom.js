(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

var message = document.querySelector('#title-message');
var i = 1;
var timerId = setInterval(function() {
  message.textContent =
    "You receive " + i +" message on forum";
  i++;
}, 4000);


setTimeout(function() {
  clearInterval(timerId);
}, 10000);

/* ------- Tabs ------- */

var tabs = document.querySelectorAll('.tab-button');
var panels = document.querySelectorAll('.tab-pane');
var keys = {
  end: 35,
  home: 36,
  left: 37,
  right: 39
};
var direction = {
  37: -1,
  39: 1
};

tabs.forEach(function (tab, index) {
  tab.addEventListener('click', clickEventListener);
  tab.addEventListener('keydown', keydownEventListener);
  tab.addEventListener('keyup', keyupEventListener);

  tab.index = index;
});

function clickEventListener (event) {
  var tab = event.currentTarget;
  activateTab(tab, false);
}

function keydownEventListener (event) {
  var key = event.keyCode;

  switch (key) {
    case keys.end:
      event.preventDefault();
      activateTab(tabs[tabs.length - 1]);
      break;
    case keys.home:
      event.preventDefault();
      activateTab(tabs[0]);
      break;
    }
}

function keyupEventListener (event) {
  var key = event.keyCode;

  switch (key) {
    case keys.left:
    case keys.right:
      switchTabOnArrowPress(event);
      break;
  }
}

function switchTabOnArrowPress (event) {
  var pressed = event.keyCode;

  tabs.forEach(function (tab) {
    tab.addEventListener('focus', focusEventHandler);
  });

  if (direction[pressed]) {
    var target = event.target;
    if (target.index !== undefined) {
      if (tabs[target.index + direction[pressed]]) {
        tabs[target.index + direction[pressed]].focus();
      }
      else if (pressed === keys.left) {
        tabs[tabs.length - 1].focus();
      }
      else if (pressed === keys.right) {
        tabs[0].focus();
      }
    }
  }
}

function activateTab (tab, setFocus) {
  setFocus = setFocus || true;
  deactivateTabs();

  tab.removeAttribute('tabindex');

  tab.setAttribute('aria-selected', 'true');
  tab.classList.add('is-active');
  document.getElementById(tab.getAttribute('aria-controls')).classList.add("is-active");

  if (setFocus) {
    tab.focus();
  }
}

function deactivateTabs () {
  tabs.forEach(function (tab) {
    tab.setAttribute('tabindex', '-1');
    tab.setAttribute('aria-selected', 'false');
    tab.removeEventListener('focus', focusEventHandler);
    tab.classList.remove('is-active');
  });

  panels.forEach(function (pane) {
    pane.classList.remove('is-active');
  });
}

function focusEventHandler (event) {
  var target = event.target;
  setTimeout(checkTabFocus, 300, target);
}

function checkTabFocus (target) {
  focused = document.activeElement;
  if (target === focused) {
    activateTab(target, false);
  }
}

/* ------- Expando ------- */
var menuItems = document.querySelectorAll('.navbar-item');

function addListeners() {
  menuItems.forEach(function (item) {
    item.addEventListener('click', toggleMenu);
  });
}

function removeListeners() {
  menuItems.forEach(function (item) {
    item.removeEventListener('click', toggleMenu);
  });
}

if (window.innerWidth <= 1087) {
  addListeners();
}

window.addEventListener('resize', function(){
  if (window.innerWidth > 1087) {
    removeListeners();
  } else {
    menuItems.forEach(function () {
      addListeners();
    });
  }
}, true);

function deactivateMenu(currentitem) {
  menuItems.forEach(function (item) {
    if(currentitem.id !== item.id){
      item.classList.remove('is-open');
      item.setAttribute('aria-expanded', false);
    }
  })
}

function toggleMenu(event) {
  event.preventDefault();
  var item = event.currentTarget;
  item.classList.toggle('is-open');
  if(item.classList.contains('is-open')){
    item.setAttribute('aria-expanded', true);
  } else {
    item.setAttribute('aria-expanded', false);
  }
  deactivateMenu(item);
}



/* ------- Form Validation ------- */

window.users =[{username:'Masha'}];

const config = {
  form: document.querySelectorAll('#contactUsForm')[0],
  users: window.users,
  isFormValid: true,
  userNameNotAvalible: document.querySelectorAll('#userNameNotAvalible')[0],
  errorMessage: ''
};

function getUsers() {
  return config.users ? config.users : []
}

function validateForm(event) {
  event.preventDefault();
  const { username, firstName, lastName, address, phone, yearBirth } = this.elements;
  let user = {};

  /* --- Validate User Name --- */
  if(isUserNameAvalible(username.value, getUsers()) && username.value){
    user.username = username.value;
    removeError(username)
  } else {
    config.errorMessage = 'This username is not available';
    getError(username, config.errorMessage);
    config.isFormValid = false;
  }

  /* --- Validate phone --- */
  validateFieldwithPattern(phone, '/^\d{11}$/');

  /* --- Validate address --- */
  validateField(address);

  config.isFormValid ? config.users.push(user): setFocus();
}

function validateField(elem) {
  if(elem.value) {
    user[elem] = elem.value;
    removeError(elem);
  } else {
    getError(elem);
    config.isFormValid = false;
  }
}

function validateFieldwithPattern(elem, pattern) {
  if(elem.value && elem.value.match(pattern)) {
    user[elem] = elem.value;
    removeError(elem);
  } else {
    getError(elem);
    config.isFormValid = false;
  }
}


function isUserNameAvalible(username, users) {
  const usersNames = users.map(user => user.username);
  return !usersNames.includes(username);
}

function getError(element, message) {
  const invalidEl = element.parentNode.querySelector(`#error-${element.id}`);

  if(message) {
    invalidEl.innerHTML = message;
  }

  invalidEl.classList.remove('visuallyhidden');
  element.setAttribute('aria-invalid', 'true');
  element.classList.add('is-danger');
  invalidEl.parentNode.classList.add('is-danger');
}

function removeError(element) {
  const invalidEl  = element.parentNode.querySelector(`#error-${element.id}`);

  invalidEl.classList.add('visuallyhidden');
  element.setAttribute('aria-invalid', 'false');
  element.classList.remove('is-danger');
  invalidEl.parentNode.classList.remove('is-danger');
}

function setFocus() {

}

config.form.addEventListener('submit', validateForm);