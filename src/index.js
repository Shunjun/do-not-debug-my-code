/*
 * @Author 舜君
 * @LastEditTime 2022-02-17 14:35:47
 * @Description
 */
"use strict";

var callController = (() => {
  var isFirstCall = true;

  return function (context, fn) {
    var rfn = isFirstCall
      ? function () {
          if (fn) {
            const res = fn.apply(context, arguments);
            fn = null;
            return res;
          }
        }
      : function () {};

    isFirstCall = false;

    return rfn;
  };
})();

(function () {
  callController(this, function () {
    const getGlobalObject = Function(
      "return (function() " + "{}.const" + 'ructor("return this")( )' + ");"
    );

    const that = getGlobalObject();

    var devtools = function () {};
    devtools.toString = function () {
      devToolsOpened();
      return "-";
    };

    that.setInterval(() => {
      if (console.profile && console.profileEnd) {
        console.profile(devtools);
        console.profileEnd(devtools);
        if (console.clear) {
          console.clear();
        }
      }
    }, 1000);
  })();
})();

function devToolsOpened() {
  document.body.innerHTML = "";

  debugProtection();
}

var debugProtection = (() => {
  let start = false;
  return function () {
    function debuggerProtection(counter) {
      if (counter > 300) {
        return function (arg) {}
          .constructor("while (true) {}")
          .apply("counter");
      } else {
        (function () {
          return true;
        }
          .constructor("de" + "bu" + "gger")
          .call("action"));
      }

      requestAnimationFrame(() => debuggerProtection(++counter));
    }

    try {
      if (!start) {
        start = true;
        debuggerProtection(0);
      }
    } catch (y) {}
  };
})();
