var Neuronator = function() {
  var debug_box_send = $('.debug p.send');
  var debug_box_receive = $('.debug p.receive');
  
  var randomizeNode = function() {
    var node_id = Math.ceil(Math.random()*node_list.length);
    return node_id;
  };
  
  var stripBadTagsAndAttributes = function(data) {
    var whitelist = ["src", "autoplay", "style"];
    var clean_data = $(data);
    clean_data.each(function() {
      var attributes = this.attributes;
      $.each(attributes, function(i, n) {
        var attribute = attributes[i];
        $.inArray(attribute.name, whitelist) == -1 ? clean_data.removeAttr(attr.name) : '';
      });
    });
    clean_data.find('style').remove();
    return clean_data;
  };
  
  var self = {
    getNodeList: function() {
      var result = $(".result");
      var node_frame = $("<li data-id='' class='free'><a href='' target='_blank'></a><p></p></li>");
      $.each(node_list, function(i, n) {
        var sibling_node_frame = node_frame.clone();
        sibling_node_frame.find('a').attr('href', node_list[i].personal_url).text(node_list[i].author);
        sibling_node_frame.attr('data-id', node_list[i].id);
        result.append(sibling_node_frame);
      });
    },
    pingNode: function(ping_state, node_id) {    
      try {
        var node_reference = parseInt(node_id, 10) - 1;
        var free_nodes = $('.result li.free');
      
        console.log('node reference ' + node_reference);
      
        var url_send = node_list[node_reference].url + "/generate?callback=?";
        var url_receive = node_list[node_reference].url + "/pong?callback=?";
      
        free_nodes.find('img, p, audio, video').remove();
      
        debug ? debug_box_send.text('pinging node ... ' + node_list[node_reference].url + ' ' + node_id) : '';

        console.log('send url ' + url_send);
        console.log('ping node id ' + node_id);
      
        $.getJSON(url_send, { ping: ping_state }, function(data) {
          var result = stripBadTagsAndAttributes(data.result);
          
          $('.result li[data-id="' + node_id + '"]').addClass('busy').removeClass('free').html(result);
          $.getJSON(url_receive, function(d) {
            pong_state = parseInt(d.result, 10);
            isNaN(pong_state) ? pong_state = 0 : '';
            brain.neuronator.pongNode(pong_state, node_list[node_reference].id, node_list[node_reference].time);
            debug ? debug_box_receive.text("node_id, ping value = " + node_list[node_reference].id + ", " + pong_state + " : " + node_list[node_reference].time + " ms") : '';
          });
        });
      } catch(err) {
        console.log('node server down ' + err.description);
      }
    },
    updatePingNode: function(ping_state) {
      brain.neuronator.pingNode(ping_state, randomizeNode());
    },
    pongNode: function(pong_state, node_id, time) {
      $('.result li[data-id="' + node_id + '"]').removeClass('busy').addClass('free');
      console.log('pong state ' + pong_state);
      console.log('pong node id ' + node_id);
      
      setTimeout("brain.neuronator.updatePingNode(pong_state)", time);
    }
  };
  
  return self;
};