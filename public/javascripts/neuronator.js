var Neuronator = function() {
  var node_list = [
    {
      "id": 1,
      "url": "http://love-hate.heroku.com",
      "root": "/",
      "receive": "/pong",
      "send": "/generate",
      "author": "jen",
      "personal_url": "http://ednapiranha.com",
      "tags": "emotion"
    }
  ];
  
  var self = {
    getNodeList: function() {
      var result = $(".result");
      var node_frame = $("<li data-id=''><iframe src=''></iframe><a href='' target='_blank'></a></li>");
      $.each(node_list, function(i, n) {
        var sibling_node_frame = node_frame.clone();
        sibling_node_frame.find('a').attr('href', node_list[i].personal_url).text(node_list[i].author);
        sibling_node_frame.find('iframe').attr('src', node_list[i].url + node_list[i].root);
        sibling_node_frame.attr('data-id', node_list[i].id);
        result.append(sibling_node_frame);
      });
    },
    pingNode: function() {
      var ping_state = 1;
      var debug_box_send = $('.debug p.send');
      var debug_box_receive = $('.debug p.receive');
      
      $('.result').everyTime(3000, function(i) {
        $.each(node_list, function(i, n) {
          var url = node_list[i].url + node_list[i].send + "?callback=?";
          debug ? debug_box_send.text('pinging node ... ' + node_list[i].url + ' ' + i) : '';
          
          $('.result li[data-id="' + node_list[i].id + '"] img').remove();
          
          $.getJSON(url, { ping: ping_state }, function(data) {
            $('.result li[data-id="' + node_list[i].id + '"]').append(data.result);
            
            $.getJSON(node_list[i].url + node_list[i].receive + "?callback=?", function(data) { 
              ping_state = parseInt(data.result, 10); 
              
              debug ? debug_box_receive.text(ping_state) : '';
            });
          });
        });
      });
    }
  };
  
  return self;
};