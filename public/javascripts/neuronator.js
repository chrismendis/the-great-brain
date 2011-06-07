var Neuronator = function() {
  var node_list = [
    {
      "node": {
        "id": 1,
        "url": "http://love-hate.heroku.com",
        "root": "/",
        "get": "/pong",
        "post": "/generate",
        "author": "jen",
        "personal_url": "http://ednapiranha.com",
        "tags": "emotion"
      }
    }
  ];
  
  var self = {
    getNodeList: function() {
      var result = $(".result");
      $.each(node_list, function(idx, n) {
        var node_frame = $("<li data-id=''><iframe src=''></iframe></li>");
        node_frame.find('iframe').attr('src', n.node.url + n.node.root);
        node_frame.attr('data-id', n.node.id);
        result.append(node_frame);
      });
    },
    pingNode: function() {
      var ping_state = 1;
      $.each(node_list, function(idx, n) {
        console.log('pinging node ...', n.node.url);
        $.post(n.node.url + n.node.post, { ping: ping_state }, function(data) {
          console.log(data);
          $('.result li[data-id="' + n.node.id + '"]').html(data);
          sleep(2000);
          var pong = $.get(n.node.get, function(data) {
            ping_state = parseInt(data, 10);
            console.log("pong state ", ping_state);
          });
        });
      });
    }
  };
  
  return self;
};