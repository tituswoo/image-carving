(function(window) {
  'use strict';

  var _tools = [];

  window.tooling = {
    register: function(tool) {
      _tools.push(tool);
    },
    use: function(toolName) {
      var tool = _tools.filter(function(tool) {
        return tool.name === toolName;
      });

      if (tool.length > 0) {
        return tool[0].fn;
      } else {
        throw new Error('TOOL ' + toolName + ' COULD NOT BE FOUND!');
      }
    }
  };
})(window);
