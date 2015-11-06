# jstix
JavaScript XML binding using Polymer observe-js as a binding library

# Why jstix
jstix is born from the need to bind XML text nodes to model instances so that when the model is changed, the binded text node is updated.

# Use case
Some XML document is loaded from a REST api and need to be edited.

Each text node in the XML document is potentially editable.

An ExtJS panel displays data from a store that loads editable XML text nodes as model instances.

jstix allows you to automatically bind model instances to their corresponding XML text nodes, so that changes done in the panel update the XML document.

# Usage
```javascript
var jstix = new Jstix(xml);
jstix.process(callbackFn, path);
```
Where:
- xml is an XML string or DOM Document to be edited
- callbackFn is a function that uses the XML node passed as parameter to create an object
- path is a string representing the path to the value of the XML node in the object returned by the function

# API
The Jstix class exposes:
```javascript
{
    // Processes all XML nodes in the document
    process: function(callbackFn, path) {},
    // Get the XML DOM Document 
    getDoc: function() {},
    // Releases all resources 
    release: function() {}
}
```

# Example
```javascript
var createRecord = function(node) {
    var record = null;
    var name = null;
    var value = null;
    switch(node.nodeType) {
    case 3:
        var name = node.parentNode.nodeName;
        var value = node.nodeValue;
        break;
    }
    if (name && value) {
        record = {
            value: value,
        };
        store.push(record);        
    }
    return record;
}; 
    
var sSource = "<a><b>hey!<\/b><\/a>";
var store = [];
      
var jstix = new Jstix(sSource);
jstix.process(createRecord, 'value');
```
Please read the full example [here](https://github.com/mathiaslebout/jstix/blob/master/examples/test.html)