
module.exports = function (bus, state) {
  bus.on('increment-n', function() {
    state.n++;
    bus.emit('render');
  });
  
  bus.on('increment-x', function() {
    state.x = (state.x+1) % 5;
    bus.emit('render');
  });
};
