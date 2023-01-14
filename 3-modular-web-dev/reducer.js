
module.exports = function (state, bus) {
  state.visitors = 0;
  state.x = 0;

  bus.on('set-visitors', function(n) {
    state.visitors = n;
    bus.emit('render');
  });
  
  bus.on('increment-x', function() {
    state.x = (state.x+1) % 5;
    bus.emit('render');
  });
};
