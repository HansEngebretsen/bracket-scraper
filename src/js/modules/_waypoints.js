/*
=======
  Waypoints integration

  Instatiating the waypoints library for scrolling functions
  Check out http://imakewebthings.com/waypoints/guides/getting-started/ for documentation on waypoints.

=======
*/

(function($) {
  var Waypoints = function(){
    this.elements = {
        viewable        : $('.inview'),
        wHeight         : $(window).height()
    }
  }


Waypoints.prototype.viewable = function(e){
  var elements = this.elements.viewable;
  elements.addClass('opaque');
  var fadein = function(name){
    $name = $(name);
    $name.removeClass('opaque');
    $name.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
      $name.removeClass('opaque');
    });
  }
  // Different offset depending on direction
  elements.waypoint(function(direction) {
    if (direction === 'down') {
      fadein(this.element);
    }
  }, {
    offset: '88%'
  });
}

Waypoints.prototype.init = function(e){
  var mqTablet = window.matchMedia( "( min-width: 620px )"); // Media query for intro slide and navscroll
  if (mqTablet.matches){
    this.viewable();
  }
}

 // Instantiation
  new Waypoints().init(); // attach waypoints to global
})(jQuery || {});