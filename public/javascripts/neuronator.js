var Neuronator = function() {
  var node_list = [
    {
      "node": {
        "id": 1,
        "url": "http://love-hate.heroku.com",
        "root": "/",
        "receive": "/pong",
        "send": "/generate",
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
        var url = n.node.url + n.node.send + "?callback=?";
        console.log(url);
        $.ajax({
          type: 'GET',
          url: url,
          data: { ping: ping_state },
          success: function(data) {
            alert(data);
            $('.result li[data-id="' + n.node.id + '"]').append(data);
          },
          error: function(data, statusText) {
            console.log(statusText);
          },
          dataType: "jsonp"
        });
      });
    }
  };
  
  return self;
};