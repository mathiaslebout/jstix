# jstix
JavaScript XML binding using Polymer observe-js as a binding library

# why jstix
jstix is born from the need to bind XML text nodes to model instances so that when the model is changed, the binded text node is updated.

# example
Some XML document is loaded from a REST api and need to be edited.
Each text node in the XML document is potentially editable.
An ExtJS panel displays data from a store that loads editable XML text nodes as model instances.
jstix allows you to automatically bind model instances to their corresponding XML text nodes, so that changes done in the panel update the XML document.