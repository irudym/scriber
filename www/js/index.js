/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var start_touch_x = 0;
var start_touch_y = 0;
var panel_width = 0;

function main()
{
    var menu_panel = new Panel("menu", 254, $(".panel-left"));
    var main_panel = new Panel("main", 1024, $(".panel-main"));
    var notes_panel = new Panel("notes", 1024, $(".panel-notes"));

    var panelsManager = new PanelsManager();

    panelsManager.add_panel(menu_panel, 254);
    panelsManager.add_panel(main_panel, "full");


    $(".panel-left-toggle").click(function(e) {
        console.log("Button click");
        var size = menu_panel.get_panel_width();
        if(menu_panel.get_width()>0) size = 0;
        menu_panel.set_width(size);
        main_panel.set_left_margin(size);
    });

    $(window).on("touchstart", function(ev) {
        var e = ev.originalEvent;
        start_touch_x = e.touches[0].screenX;
        start_touch_y = e.touches[0].screenY;
        panel_width = menu_panel.get_width();

        //set panel transitions to 0 seconds to avoid inertia
        menu_panel.set_transition(0);
        main_panel.set_transition(0);
    });

    $(window).on("touchmove", function(ev) {
        var e = ev.originalEvent;

        //slide left panel
        if($(".panel-left").width()>0) {
            new_width = panel_width - (start_touch_x - e.touches[0].screenX);
            if(new_width > menu_panel.get_panel_width()) new_width = menu_panel.get_panel_width();
            if(new_width < 0)  new_width = 0;

            menu_panel.set_width(new_width);
            main_panel.set_left_margin(new_width);

            $(".panel-pos").text(width);
        }
    });

    $(window).on("touchend", function(ev) {
        var e = ev.originalEvent;
        width = $(".panel-left").width();
        if(width >menu_panel.get_panel_width()/2) width = menu_panel.get_panel_width(); else width = 0;

        //set panel transitions to 0 seconds to avoid inertia
        menu_panel.set_transition(0.4);
        main_panel.set_transition(0.4);

        menu_panel.set_width(width);
        main_panel.set_left_margin(width);
    });
}


$(document).ready(function() {
    var app = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            app.receivedEvent('deviceready');
            main();
        },
        // Update DOM on a Received Event
        receivedEvent: function (id) {
            //var parentElement = document.getElementById(id);
            //var listeningElement = parentElement.querySelector('.listening');
            //var receivedElement = parentElement.querySelector('.received');

            //listeningElement.setAttribute('style', 'display:none;');
            //receivedElement.setAttribute('style', 'display:block;');

            //console.log('Received Event: ' + id);
        }
    };

    console.log("Initialize application");
    app.initialize();
    main();
});