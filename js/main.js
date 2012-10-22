

$(document).ready(
  function() {
    $('.note').click(function(){ N.next(); });
    //$('body').doubletap(function() { N.go('main') })
  }
);

N = {
  show: function(page) {
    $('.npage').addClass('hidden');
    $('#'+page).removeClass('hidden');
    $('#menu').removeClass('hidden');
    $('#menutoggle').addClass('hidden');
  },
  
  edit: function() {
  
    var loaded = N.data.load('note');
    if (loaded) {
      $('#ntext').val(loaded);
    }
  
    N.show('edit');
    return false;
  },
  
  adjust: function() {
    var fontSize = 72;
        var ourText = $('.note span');

        var maxHeight = $('.note').height();
        var maxWidth = $('.note').width();
        var textHeight;
        var textWidth;
        
        do {
            ourText.css('font-size', fontSize);
            textHeight = ourText.height();
            textWidth = ourText.width();
            console.log(maxHeight, maxWidth, textHeight, textWidth);
            fontSize = fontSize - 1;
        } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
  },
  
  save: function() {
    N.data.save('note', $('#ntext').val());
    N.run();
    return false;
  },
  
  run: function() {
    N.counter = 0;
    N.show('run');
    N.current = N.data.load('note');
    N.current = N.current.split("\n");
    N.current.push(' ~ end ~ ');

    N.go();
    
    return false;
  },
  
  go: function() {
    $('#menutoggle').removeClass('hidden');
    $('#menu').addClass('hidden');
    $('#run .note').html('<span>'+N.current[N.counter]+'</span>');
    N.adjust();
  },
  
  current: [],
  counter: 0,
  
  next: function() {
    if (undefined !== N.current[N.counter+1]) {
      N.counter++;
      N.go();
    } else {
      //N.show('end');
    }
  },
  
  prev: function() {
    if (undefined !== N.current[N.counter-1]) {
      N.counter--;
      N.go();
    } else {
      N.show('main');
    }
  },
  
  data: {
    tojson:   [],
    
    has: function() {
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
        return false;
      }
    },
    
    save: function(key, data) {
      console.log('data.save called with key: ', key);
      if (N.data.isJson(key)) data = JSON.stringify(data);
      localStorage.setItem(key, data);
      return N;
    },
    
    load: function(key) {
      console.log('data.load called with key: ', key);
      var ret = localStorage.getItem(key);
      if (N.data.isJson(key)) return JSON.parse(ret);
      return ret;
    },
    
    delete: function(key) {
      localStorage.removeItem(key);
      return N;
    },
    
    clear: function() {
      localStorage.clear();
      return N;
    },
    
    isJson: function(key) {
      tl = N.data.tojson.length;
      for (var i = 0; i < tl; i++) {
        if (key == N.data.tojson[i]) return true;
      }
      return false;
    }
  }, // END data
};
