it("should return null if the node doesn't have child node", function () {
  var parent = document.createElement('div');

  proclaim.strictEqual(parent.lastElementChild, null);
});

it("should return null if the parent node only has text child node", function () {
  var parent = document.createElement('div'),
      newContent = document.createTextNode('Hi there, how are you doing today?');
  parent.appendChild(newContent);

  proclaim.strictEqual(parent.lastElementChild, null);
});

it("should return null if the parent node only has comment child node", function () {
  var parent = document.createElement('div'),
      newComment = document.createComment('This is a comment in the document.');
  parent.appendChild(newComment);

  proclaim.strictEqual(parent.lastElementChild, null);
});

it("should return the first child element", function () {
  var parent = document.createElement('div'),
      h2 = document.createElement('h2'),
      p1 = document.createElement('p'),
      p2 = document.createElement('p'),
      p3 = document.createElement('p'),
      newComment = document.createComment('This is a comment in the document.');
  parent.appendChild(h2);
  parent.appendChild(p1);
  parent.appendChild(p2);
  parent.appendChild(p3);
  parent.appendChild(newComment);

  proclaim.strictEqual(parent.lastElementChild, p3);
});
