var brain = {};

$(function() {
  brain.neuronator = Neuronator();
  brain.neuronator.getNodeList();
  brain.neuronator.pingNode();
});