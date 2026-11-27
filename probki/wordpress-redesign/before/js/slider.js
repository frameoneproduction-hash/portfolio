/* BuildPro slider 1.0 */
var cur = 0;
function slide(n) {
  var s = document.querySelectorAll('.slide');
  s[cur].className = 'slide';
  cur = (cur + n + s.length) % s.length;
  s[cur].className = 'slide active';
}
setInterval(function () { slide(1); }, 4000);
