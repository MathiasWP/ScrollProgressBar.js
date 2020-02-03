(function (window) {
  "use strict";

  function defineScrollProgressBar() {
    // CREATING OPTION LIST FOR SCROLLPROGRESSBAR
    var init_options = {
      color: "#ffa453",
      opacity: 1,
      placement: "top",
      size: "10px",
      zIndex: 9999
    };

    // CREATING SCROLLPROGRESSBAR CLASS
    function ScrollProgressBar(options) {

      // CHANGING THE INIT OPTION VALUES WITH THE ONES THE USER HAS TYPED IN. MY 'POLYFILL' FOR DOING IT WITH A SPREAD OPERATOR + TELLING IF USER HAS USED INVALID OPTION

      for (var option in options) {


        if (init_options.hasOwnProperty(option) === false) {

          throw new Error('\n "' + option + '" IS NOT A VALID OPTION FOR SCROLLPROGRESSBAR.');

        }


        else if (option === "color" && typeof options[option] !== "string") {

          throw new Error('\n color MUST BE A STRING ("#ffa453", "rgba(255,255,255)", "blue" etc...)');

        }


        else if (
          option === "opacity" &&
          (parseInt(options[option]).length !== options[option].length
            || typeof (options[option] !== ("string" || "number"))
            || 1 < parseInt(options[option])
            || parseInt(options[option]) < 0)
        ) {

          throw new Error("\n opacity MUST ONLY BE AN INTEGER OR STRING BETWEEN 0-1");

        }


        else if (option === "placement" && ["top", "left", "right", "bottom"].filter(function (pl) { pl === options[option]; }).length === 0) {

          throw new Error("\n placement MUST EITHER BE TOP, LEFT, RIGHT OR BOTTOM");

        }


        else if (option === "size" && typeof options[option] !== "string") {

          throw new Error('\n size MUST BE A STRING ("12px", "5rem", "8em" etc...)');

        }


        else if (
          option === "zIndex" &&
          (parseInt(options[option]).length !== options[option].length
            || typeof (options[option] !== ("string" || "number")))
        ) {

          throw new Error("\n zIndex MUST ONLY BE AN INTEGER OR STRING");

        }


        else if (option !== init_options.option) {

          init_options[option] = options[option];

        }
      }
      this.options = init_options;
    }

    // START FUNCTION
    ScrollProgressBar.prototype.start = function () {

      var _html = document.documentElement || document.querySelector("html") || document.getElementsByTagName("HTML")[0];


      var _body = document.body || document.querySelector("body") || document.getElementsByTagName("BODY")[0];


      var _head = document.head || document.querySelector("head") || document.getElementsByTagName("head")[0];


      // CREATING SCROLLPROGRESSBAR
      var _scrolledBar = document.createElement("span");


      // GIVING SCROLLPROGRESSBAR A RANDOM ID
      var _id = ("_scrollbar" + Math.random()).replace(".", ""); // A LOT OF WAYS TO DO THIS. I JUST THOUGHT THIS WAS A FUN ONE.

      _scrolledBar.id = _id;


      // CREATING STYLESHEET FOR STYLING PROGRESSBAR
      var _styleSheet = document.createElement("style");

      _styleSheet.type = "text/css";


      // INIT STYLING OF THE PROGRESS BAR
      var css =
        "#" +
        _id +
        "{" +
        " transition: transform 0.08s;" +
        " -ms-transition: transform 0.08s;" +
        " -wekbit-transition: transform 0.08s;" +
        " position: fixed; z-index: " +
        this.options.zIndex +
        " !important;" +
        " background-color: " +
        this.options.color +
        ";" +
        " opacity: " +
        this.options.opacity +
        ";";


      // CREATING VARIABLES USED FOR CALCULATION
      var _scrolled,
        _screenWidth,
        _screenHeight,
        _docHeight,
        _percentage,
        timeoutResize,
        timeoutScroll;


      // SETTING SCROLLED VARIABLE EQUAL TO HOW FAR THE USER HAS SCROLLED IN THE DOCUMENT
      _scrolled = window.pageYOffset || (_html || document.body.parentNode || document.body).scrollTop;


      // SETTING SCREENWIDTH EQUAL TO THE WIDTH OF VIEWPORT
      _screenWidth = window.innerWidth || _html.clientWidth || _body.clientWidth;


      // SETTING SCREENHEIGHT EQUAL TO THE HEIGHT OF VIEWPORT
      _screenHeight = window.innerHeight || _html.clientHeight || _body.clientHeight;


      // SETTING HEIGHT EQUAL TO THE FULL HEIGHT OF THE DOCUMENT (SUBTRACTING THE _screenHeight FROM _docHeight BECAUSE _scrolled IS CALCULATED FROM TOP OF VIEWPORT WHILE _dochHeight IS CALCULATED FROM BOTTOM)
      _docHeight =
        Math.max(
          _body.scrollHeight,
          _body.offsetHeight,
          _html.clientHeight,
          _html.scrollHeight,
          _html.offsetHeight
        ) - _screenHeight;


      // PERCENTAGE SCROLLED
      _percentage = _scrolled / _docHeight;


      // SETTING THE WIDTH OF PROGRESS BAR EQUAL TO LENGTH SCROLLED (USING scaleX FOR PERFORMANCE - INSTEAD OF CHANGING THE WIDTH FOR EXAMPLE)
      _scrolledBar.style.transform = "scaleX(" + _scrolled / _docHeight + ")";


      if (this.options.placement === "top" || this.options.placement === "bottom") {

        css += "width: 100%;";

        css += "height: " + this.options.size + ";";

        css += "left: 0;";

        css += "transform-origin: left;";

        // PLACING SCROLLPROGRESSBAR WHERE USER HAS DECIDED
        this.options.placement === "top"
          ? (css += "top: 0;")
          : (css += "bottom: 0;");

        // SETTING THE INIT LENGTH OF SCROLLPROGRESSBAR
        _scrolledBar.style.transform = "scaleX(" + _percentage + ")";
      }

      else if (this.options.placement === "left" || this.options.placement === "right") {

        css += "height: 100%;";

        css += "width: " + this.options.size + ";";

        css += "top: 0;";

        css += "transform-origin: top;";

        // PLACING SCROLLPROGRESSBAR WHERE USER HAS DECIDED
        this.options.placement === "left"
          ? (css += "left: 0;")
          : (css += "right: 0;");

        // SETTING THE INIT LENGTH OF SCROLLPROGRESSBAR
        _scrolledBar.style.transform = "scaleY(" + _percentage + ")";
      }


      // GIVING THE STYLESHEET A CLOSING BRACKET FOR THE SCROLLPROGRESSBAR STYLING
      css += "}";


      // SETTING STYLESHEET CSS
      _styleSheet.innerHTML = css;


      // APPENDING STYLESHEET TO HEAD TAG
      _head.appendChild(_styleSheet);


      // APPENDING BAR TO BODY
      _body.appendChild(_scrolledBar);


      /*
      UPDATING CALCULATION-VARIABLES ON RESIZE AND ON SCROLL + SETTING CORRECT LENGTH ON SCROLLBAR
      CREDIT TO CHRIS FERDINANDI FOR DEBOUNCING-SETUP (https://gomakethings.com/event-listener-performance-with-vanilla-js/)
      */

      // JS AND SCOPES :)
      var this_ = this;


      // RESIZE FUNCTION
      window.addEventListener("resize", function () {

        if (!timeoutResize) {

          timeoutResize = setTimeout(function () {

            timeoutResize = null;

            _scrolled = window.pageYOffset || (_html || document.body.parentNode || document.body).scrollTop;

            _screenWidth = window.innerWidth || _html.clientWidth || _body.clientWidth;

            _screenHeight = window.innerHeight || _html.clientHeight || _body.clientHeight;

            _docHeight =
              Math.max(
                _body.scrollHeight,
                _body.offsetHeight,
                _html.clientHeight,
                _html.scrollHeight,
                _html.offsetHeight
              ) - _screenHeight;

            // UPDATING PERCENTAGE
            _percentage = _scrolled / _docHeight;

            if (this_.options.placement === "top" || this_.options.placement === "bottom") {
              _scrolledBar.style.transform = "scaleX(" + _percentage + ")";
            }
            else if (this_.options.placement === "left" || this_.options.placement === "right") {
              _scrolledBar.style.transform = "scaleY(" + _percentage + ")";
            }
          }, 66);
        }
      },
        false
      );

      // SCROLL FUNCTION
      document.addEventListener("scroll", function () {

        if (timeoutScroll) {
          window.cancelAnimationFrame(timeoutScroll);
        }

        timeoutScroll = window.requestAnimationFrame(function () {

          _scrolled = window.pageYOffset || (_html || document.body.parentNode || document.body).scrollTop;

          _percentage = _scrolled / _docHeight;

          if (this_.options.placement === "top" || this_.options.placement === "bottom") {
            _scrolledBar.style.transform = "scaleX(" + _percentage + ")";
          }
          else if (this_.options.placement === "left" || this_.options.placement === "right") {
            _scrolledBar.style.transform = "scaleY(" + _percentage + ")";
          }
        });
      });
    };

    return ScrollProgressBar;
  }

  // DEFINING SCROLLPROGRESSBAR
  if (typeof ScrollProgressBar === "undefined" || typeof ScrollProgressBar === undefined || typeof ScrollProgressBar === null) {

    window.ScrollProgressBar = defineScrollProgressBar();

  }

})(window);
