var Neuronator = function() {
  var pong_assign_path = "/pong";
  
  var debug_box_send = $('.debug p.send');
  var debug_box_receive = $('.debug p.receive');
  
  var node_list = [
    {
      "id": 1,
      "url": "http://love-hate.heroku.com",
      "root": "/",
      "receive": "/pong",
      "send": "/generate",
      "author": "jen1",
      "personal_url": "http://ednapiranha.com",
      "tags": "image"
    },
    {
      "id": 2,
      "url": "http://hollow-robot-198.heroku.com",
      "root": "/",
      "receive": "/pong",
      "send": "/generate",
      "author": "jen2",
      "personal_url": "http://ednapiranha.com",
      "tags": "text"
    },
    {
      "id": 3,
      "url": "http://glowing-sky-477.heroku.com",
      "root": "/",
      "receive": "/pong",
      "send": "/generate",
      "author": "jen3",
      "personal_url": "http://ednapiranha.com",
      "tags": "audio"
    },
    {
      "id": 4,
      "url": "http://glowing-sky-477.heroku.com",
      "root": "/",
      "receive": "/pong",
      "send": "/generate",
      "author": "jen4",
      "personal_url": "http://ednapiranha.com",
      "tags": "audio"
    },
    {
      "id": 5,
      "url": "http://glowing-sky-477.heroku.com",
      "root": "/",
      "receive": "/pong",
      "send": "/generate",
      "author": "jen5",
      "personal_url": "http://ednapiranha.com",
      "tags": "audio"
    },
    {
      "id": 6,
      "url": "http://hollow-robot-198.heroku.com",
      "root": "/",
      "receive": "/pong",
      "send": "/generate",
      "author": "jen6",
      "personal_url": "http://ednapiranha.com",
      "tags": "text"
    }
  ];
  
  var randomizeNode = function() {
    var node_id = Math.ceil(Math.random()*node_list.length);
    return node_id;
  };
  
  var self = {
    getNodeList: function() {
      var result = $(".result");
      var node_frame = $("<li data-id=''><iframe src=''></iframe><a href='' target='_blank'></a><p></p></li>");
      $.each(node_list, function(i, n) {
        var sibling_node_frame = node_frame.clone();
        sibling_node_frame.find('a').attr('href', node_list[i].personal_url).text(node_list[i].author);
        sibling_node_frame.find('iframe').attr('src', node_list[i].url + node_list[i].root);
        sibling_node_frame.attr('data-id', node_list[i].id);
        result.append(sibling_node_frame);
      });
    },
    pingNode: function(ping_state, node_id) {    
      var node_reference = parseInt(node_id, 10) - 1;
      console.log('node reference ' + node_reference);
      var url_send = node_list[node_reference].url + node_list[node_reference].send + "?callback=?";
      var url_receive = node_list[node_reference].url + node_list[node_reference].receive + "?callback=?";
      
      $('.result li img, .result li p').remove();
      
      debug ? debug_box_send.text('pinging node ... ' + node_list[node_reference].url + ' ' + node_id) : '';
      $('.result li[data-id="' + node_list[node_reference].id + '"] img').remove();
      $('.result li[data-id="' + node_list[node_reference].id + '"] p').remove();
      console.log('send url ' + url_send);
      console.log('ping node id ' + node_id);
      $.getJSON(url_send, { ping: ping_state }, function(data) {
        $('.result li[data-id="' + node_id + '"]').append(data.result);
        $.getJSON(url_receive, function(d) {
          console.log('receive url ' + url_receive);
          pong_state = parseInt(d.result, 10);
          brain.neuronator.pongNode(pong_state, node_list[node_reference].id);
          debug ? debug_box_receive.text("node_id, ping value = " + node_list[node_reference].id + ", " + ping_state) : '';
        });
      });
    },
    updatePingNode: function(ping_state) {
      brain.neuronator.pingNode(ping_state, randomizeNode());
    },
    pongNode: function(pong_state, node_id) {
      pong_state = parseInt(pong_state, 10);
      console.log('pong state ' + pong_state);
      console.log('pong node id ' + node_id);
      brain.neuronator.updatePingNode(pong_state);
    }
  };
  
  return self;
};