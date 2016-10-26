/**
 * Created by irudym on 25-Oct-16.
 *
 * Multipanel application library
 */


function Panel(panel_name, panel_width, html_object) {

  this.initialize = function(panel_name, panel_width, html_object) {
      this.name = panel_name;
      this.width = panel_width;
      this.object = html_object;
  };

  this.set_width = function(width) {
      console.log("Set_Width for object:  " + this.name);
      this.object.width(width);
  };

  this.get_width = function() {
      return this.object.width();
  };

  this.set_left_margin = function(margin) {
      this.object.css("margin-left", margin + "px");
  };

  this.set_transition = function(trans) {
      this.object.css("transition", trans + "s");
  };
  this.initialize(panel_name, panel_width, html_object);
}


function PanelsManager() {
    this.panels = [];

    this.add_panel = function(panel,margin) {
        panels.push({panel: panel, margin: margin});
    }
}