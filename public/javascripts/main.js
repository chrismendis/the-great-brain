var brain = {};
var debug = false;

$(function() {
  if(document.location.href.indexOf('debug=true') > -1) {
    debug = true;
    $('.debug').show();
  }
  brain.neuronator = Neuronator();
  brain.neuronator.getNodeList();
  brain.neuronator.pingNode();
  
  $('.result li').hover(
    function() {
      $(this).find('a').show();
    },
    function() {
      $(this).find('a').hide();
    }
  );
});