/*
 * References: http://alexmarandon.com/articles/web_widget_jquery/
 * Trouble shoot: http://stackoverflow.com/questions/4389404/loading-jquery-ui-with-getscript
 * Slider used: http://bxslider.com/examples
 * Shadow effects: http://www.paulund.co.uk/creating-different-css3-box-shadows-effects
 *
 * Usage:
 * Add the following code in the html
 *
 * ------------------------------------------------------------------------------------------------
 * <script src="http://localhost:3000/assets/blogger-widget.js" type="text/javascript"></script>
 * <div id="organizer-events-widget-container" data-organizer-id="4fcaf3708621ff1666000003"
 *      data-description-length="150" data-no-css="false"
 *      class="box effect6" style="height: 80px; width: 300px;"></div>
 * ------------------------------------------------------------------------------------------------
 *
 * */
(function() {
// Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined) {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else {
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict();
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        // Load image slider library
        //jQuery.getScript(host + "assets/event-widget/all.js", function() {
            jQuery(document).ready(function($) {
                $(".blogger-jquery-widget").each(function(index) {
                    var widget = $(this);
                    /******* Load CSS *******/
                    // if($(this).data('no-css') != true)
                    //     addCss(host + "assets/event-widget.css");

                    var jsonp_url = "http://jitu-blog.blogspot.com/feeds/posts/default?alt=json-in-script&callback=?";
                    $.getJSON(jsonp_url, function(data) {
                        var root = $('<ul/>');
                        $.each(data.feed.entry, function(i, item){
                            var item_str = '<li><div>' +
                                '<span>' + item.title.$t + '</span>'+
                                '</div></li>';
                            $(item_str).appendTo(root);
                        });
                        root.appendTo(widget);
                        // alert($(this).html());
                        // root.bxSlider({
                        //     auto: true,
                        //     easing: 'easeInQuint',
                        //     speed: 1000
                        // });

                        // adjustArrow($);
                    });

                });
            });
        //});
    }

    function addCss(url) {
        var css_link = jQuery("<link>", {
            rel: "stylesheet",
            type: "text/css",
            href: url
        });
        css_link.appendTo('head');
    }
    
    // function adjustArrow($) {
    //     element = $(".blogger-jquery-widget");
    //     var top = element.height() / 2 - (element.find(".bx-prev").first().height()/2);
    //     element.find(".bx-prev").css("top", top);
    //     element.find(".bx-next").css("top", top);
    // }

    function trimText(text, length) {
        text = text || "";
        length = parseInt(length);
        return text.length > length ? (text.substring(0,length) + "...") : text;
    }
})(); // We call our anonymous function immediately