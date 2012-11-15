var Resp = (function($){

  var cfg = {
  };

  var fn = {
    'changeOrientation' : function(e) {
      e.preventDefault();
      var $device = $('.show .device'),
          portrait = !$device.find('> div').toggleClass('landscape').attr('class').match(/landscape/),
          $iframe = $device.find('iframe').removeClass('show');

      setTimeout( function() {
        $iframe.addClass('show');
      }, 500 );
    },
    'changePage': function(e) {
      e.preventDefault();
      var $a = $(this),
          $li = $a.parent(),
          $ul = $li.parent();

      // remove active state
      $ul.find('.active').removeClass('active');
      $a.addClass('active');

      fn.showPage( $li.index() );
    },
    'showPage': function(index) {
      $('#pages .page')
        .removeClass('show')
        .slice(index, index + 1)
        .addClass('show');
    },
    'loadLocation': function() {
      var url = document.location.hash
                  .replace(/#/, '')
                  .replace(/^.*\/\//, '');
      if(url.length) {
        url = 'http://' + url;
        fn.setLocation( url );
        fn.setValue( '#url', url );
      }
    },
    'setValue': function(id, val) {
      $(id).val( val );
    },
    'getValue': function(id) {
      return $(id).val();
    },
    'changeLocation': function(e) {
      e.preventDefault();
      var url = $('#url').val();

      fn.removeIframe();
      fn.setLocation( url );
    },
    'setLocation': function(url) {
      var $devices = $('#pages .device');
      $devices.append(['<iframe src="', url , '" class="show"></iframe>'].join(''));
    },
    'removeIframe': function() {
      $('#pages .device').find('iframe').remove();
    },
    'showBody': function() {
      $('body').addClass('loaded');
    },
    'shareUrl': function() {
      var url = fn.getValue('#url')
                  .replace(/http:\/\//, '');
      url = ['http://localhost/resp#', url].join('');

      window.prompt( "Copy to clipboard: Ctrl+C, Enter:", url);
    }
  };

  var methods = {
  }

  var listeners = {
    'changeOrientation' : function() {
      $('#changeOrientation').click( fn.changeOrientation )
    },
    'changePage': function() {
      $('#device-select .device a').click( fn.changePage );
    },
    'changeLocation': function() {
      $('form').submit( fn.changeLocation );
    },
    'documentReady' : function() {
      $(document).ready( fn.showBody );
      $(document).ready( fn.loadLocation );
      $('#share').click( fn.shareUrl );
    }
  }

  function init() {

    listeners.changeOrientation();
    listeners.changePage();
    listeners.changeLocation();
    listeners.documentReady();

  }; // init

  init();

  return {
    config: cfg
  };

})(jQuery);
