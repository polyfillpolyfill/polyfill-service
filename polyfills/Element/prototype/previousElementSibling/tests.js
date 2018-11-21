it("should return null if the node is the only child of its parent node", function () {
  var parent = document.createElement('div'),
      p = document.createElement('p');
  parent.appendChild(p);

  proclaim.strictEqual(p.previousElementSibling, null);
});

it("should return null if the node only has text sibling", function () {
  var parent = document.createElement('div'),
      p = document.createElement('p');
      text = document.createTextNode('Hi there, how are you doing today?');
  parent.appendChild(text);
  parent.appendChild(p);

  proclaim.strictEqual(p.previousElementSibling, null);
});

it("should return null if the node only has comment sibling", function () {
  var parent = document.createElement('div'),
      p = document.createElement('p');
      comment = document.createComment('This is a comment in the document.');
  parent.appendChild(comment);
  parent.appendChild(p);

  proclaim.strictEqual(p.previousElementSibling, null);
});

it("should return the first child element", function () {
  var parent = document.createElement('div'),
      h2 = document.createElement('h2'),
      p1 = document.createElement('p'),
      p2 = document.createElement('p'),
      p3 = document.createElement('p'),
      text = document.createTextNode('Hi there, how are you doing today?'),
      comment = document.createComment('This is a comment in the document.');
  parent.appendChild(h2);
  parent.appendChild(p1);
  parent.appendChild(p2);
  parent.appendChild(text);
  parent.appendChild(comment);
  parent.appendChild(p3);

  proclaim.strictEqual(p3.previousElementSibling, p2);
});
