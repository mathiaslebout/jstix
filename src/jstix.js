(function (global) {
    'use strict';

    var observers = [];
    
    var loadXml = function (xmlStr) {
        var oParser = new global.DOMParser();
        return oParser.parseFromString(xmlStr, "text\/xml");
    };
    
    function Jstix(xml) {
        this.xml_ = xml;
        this.xmlDoc_ = typeof xml === 'string' ? null : xml;
    }
    
    function processNode(node) {
        var object = this.callback_(node);
        if (object) {
            var jstix_observer = new PathObserver(object, this.path_);
            jstix_observer.open(function(newValue, oldValue) {
                if (node.nodeValue) {
                    node.nodeValue = newValue;
                }
            });
            observers.push(jstix_observer);
        }
        for (var i = 0; i < node.childNodes.length; i ++) {
            processNode.call(this, node.childNodes[i]);
        }
    }
        
    Jstix.prototype = {
        process: function (callback, path) {
            this.callback_ = callback;
            this.path_ = path;
            
            this.xmlDoc_ = this.xmlDoc_ || loadXml(this.xml_);
            
            if (this.xmlDoc_) {
                processNode.call(this, this.xmlDoc_.documentElement);
            }
        },
        
        getDoc: function() {
            return this.xmlDoc_;
        },
        
        release: function() {
            observers.forEach(function (observer) {
               observer.close(); 
            });
        },
    };
    
    // Export the Jstix object for **Node.js**, with backwards-compatibility
    // for the old `require()` API. Also ensure `exports` is not a DOM Element.
    // If we're in the browser, export as a global object.
    
    var expose = global;

    if (typeof global.exports !== 'undefined' && !global.exports.nodeType) {
        if (typeof global.module !== 'undefined' && global.module.exports) {
            exports = global.module.exports;
        }
        expose = exports;
    }
    
    expose.Jstix = Jstix;
    

})(typeof global !== 'undefined' && global && typeof module !== 'undefined' && module ? global : this || window);