(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");
  var navButtons = document.querySelectorAll("#nav li button");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.children[0].setAttribute('aria-selected', true);

    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.children[0].setAttribute('aria-selected', false);
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}



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