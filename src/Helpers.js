
const Helpers = {

    // Convert a DOM node list to a regular array.
    nodeListToArray: function (nodeList) {
        let result = [];
        for (const node of nodeList) {
            result.push(node);
        }
        return result;
    },

    // Perform a function over every element of a html node collection.
    nodeListForEach: function (nodeList, fn) {
        return nodeListToArray(nodeList).map(fn);
    },

    // Try to find the first child element with a particular node name.
    // Return undefined if not found.
    getChildElementByName: function (node, name) {
        const nameUpper = name.toUpperCase();
        const filteredNodes = nodeListToArray(node.children).filter(
            childNode => childNode.nodeName.toUpperCase() === nameUpper
        );
        return filteredNodes.length ? filteredNodes[0] : undefined;
    },

    // 10 => -10 .. 9
    random: function (n) {
        return Math.floor(Math.random() * n * 2 - n)
    },

    // 10 => -10 .. -1, 1 .. 10
    randomNoZero: function (n) {
        const res = Math.floor(Math.random() * n * 2 - n)
        return res !== 0 ? res : n
    }
}

