var brain = {};

$(function() {
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