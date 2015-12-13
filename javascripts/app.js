var mappingTemplate = require("api-gateway-mapping-template");

var needRender = false;

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 30);
  };

document.addEventListener('DOMContentLoaded', function() {
  var mainloop = function() {
    requestAnimationFrame(mainloop);
    if (needRender) {
      render();
      needRender = false;
    }
  };

  var templateNode = document.querySelector('#template');
  var payloadNode = document.querySelector('#payload');
  var resultNode = document.querySelector('#result');
  var render = function() {
    var template = templateNode.value;
    var payload = payloadNode.value;
    var result = mappingTemplate(template, payload);
    resultNode.innerText = result;
  };

  templateNode.value = '"$input.path(\'$\')"';
  payloadNode.value = 'api gateway';
  needRender = true;

  document.addEventListener('keyup', function(evt) {
    evt.preventDefault();
    needRender = true;
  });

  mainloop();
});