// Get the button
let mybutton = document.getElementById("myBtn");
console.log(mybutton)
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    //mybutton.style.display = "block";
    mybutton.style.display = "none"
  }
}

