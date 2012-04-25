/*global _ jQuery*/

var app = {
    mem: []

  , clearNext: false

  , display: (function() { return $('.display'); }())

  , compute: function() {
      var i, combined, result;
      app.clearNext = true;

      if (!_.isNumber(app.mem[0])) { app.mem.unshift(0); }
      if (!_.isNumber(_.last(app.mem))) { app.mem.pop(); }

      for (i = 0; i < app.mem.length; i++) {
        combined = null;

        if (app.mem[i] == '*') {
          combined = app.mem[i - 1] * app.mem[i + 1];
        }

        if (app.mem[i] == '/') {
          combined = app.mem[i - 1] / app.mem[i + 1];
        }

        if (combined) {
          app.mem = _.first(app.mem, i - 1).concat(combined, _.rest(app.mem, i + 2));
        }
      }

      for (i = 0; i < app.mem.length; i++) {
        combined = null;

        if (app.mem[i] == '+') {
          combined = app.mem[i - 1] + app.mem[i + 1];
        }

        if (app.mem[i] == '-') {
          combined = app.mem[i - 1] - app.mem[i + 1];
        }

        if (combined) {
          app.mem = _.first(app.mem, i - 1).concat(combined, _.rest(app.mem, i + 2));
        }
      }

      result = app.mem[0];
      app.mem = [];
      return result;
    }

  , equals: function() {
      app.mem.push(Number(app.display.val()));
      app.display.val(app.compute());
    }

  , clear: function() {
      app.clearNext = true;
      app.mem = [];
      app.display.val(0);
    }

  , number: function(num) {
      if (app.clearNext) {
        app.clearNext = false;
      } else {
        num = app.display.val() + num;
      }

      app.display.val(num);
    }

  , operator: function(op) {
      app.mem.push(Number(app.display.val()));
      app.mem.push(op);
      app.clearNext = true;
    }

  , handlers: {
        13: 'equals'
      , 99: 'clear'

      , 46: function() { app.number('.'); }
      , 48: function() { app.number(0); }
      , 49: function() { app.number(1); }
      , 50: function() { app.number(2); }
      , 51: function() { app.number(3); }
      , 52: function() { app.number(4); }
      , 53: function() { app.number(5); }
      , 54: function() { app.number(6); }
      , 55: function() { app.number(7); }
      , 56: function() { app.number(8); }
      , 57: function() { app.number(9); }

      , 43: function() { app.operator('+'); }
      , 45: function() { app.operator('-'); }
      , 42: function() { app.operator('*'); }
      , 47: function() { app.operator('/'); }
    }

  , init: function() {
      $('html').keypress(function(ev) {
        var handler = app.handlers[ev.which];
        if (!handler) { return; }
        if (!_.isFunction(handler)) { handler = app[handler]; }

        ev.preventDefault();
        handler();
      });

      $('button.btn').click(function(ev) {
        var key = $.Event('keypress');
        key.which = $(ev.target).data('key');

        $('html').trigger(key);
      });

      app.clear();
    }
};

jQuery(function() { app.init(); });
