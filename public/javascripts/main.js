var brain = {};
var debug = false;

$(function() {
  if(document.location.href.indexOf('debug=true') > -1) {
    debug = true;
    $('.debug').show();
  }
  brain.neuronator = Neuronator();
  brain.neuronator.getNodeList();
  brain.neuronator.pingNode(1, 1);
  
  $('.result li').hover(
    function() {
      $(this).find('a').show();
    },
    function() {
      $(this).find('a').hide();
    }
  );
});