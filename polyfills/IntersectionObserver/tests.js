<!DOCTYPE html>
<script src="intersectionobserver-polyfill.js"></script>
<style>
root {
  background-color: pink;
  display: block;
}
child {
  background-color: salmon;
  display: block;
}
</style>
<div id="container" style="position: relative"></div>
<div id="logger" style="white-space: pre-wrap"></div>
<script>
var testIndex = 0;

function test(callback, title) {
  if(!title) {
    title = '';
  }
  document.getElementById('container').innerHTML = '';
  document.getElementById('logger').innerHTML += 'Test ' + title + ' ' + (++testIndex) + ': ' + callback() + '\n\n';
}

function assert(a) {
  if (a) {
    return 'Passed';
  }
  return '<b>Failed</b>';
}

test(()=>{
  return assert(true);
}, 'the testing framework')

// Observing root not in the DOM.
test(()=>{
  var root = document.createElement('div');
  var io = new IntersectionObserver(function(){},{
    root: root,
  });

  var didThrow = false;
  try {
    io.observe(document.getElementById('container'));
  } catch (e) {
    didThrow = true;
  }

  io.disconnect();
  return assert(didThrow);
}, 'Observing root not in the DOM')

// Observing unrooted element.
test(()=>{
  var io = new IntersectionObserver(function(){}, {});

  var didThrow = false;
  try {
    io.observe(document.createElement('container'));
  } catch (e) {
    didThrow = true;
  }

  io.disconnect();
  return assert(didThrow);
}, 'Observing unrooted element')

// Observing child of root.
test(()=>{
  var container = document.getElementById('container');
  var root = document.createElement('root');
  container.appendChild(root);

  var io = new IntersectionObserver(
    ()=>{ console.log("This shouldn't be called since we always takeRecords."); },
    {
      root: root
    }
  );

  var child = document.createElement('child');
  root.appendChild(child);

  var didThrow = false;
  try {
    io.observe(child);
  } catch (e) {
    didThrow = true;
  }

  io.disconnect();
  return assert(!didThrow);
}, 'Observing child of root')

// takeRecords and observe already intersecting element.
test(()=>{
  var container = document.getElementById('container');
  var root = document.createElement('root');
  container.appendChild(root);

  root.style.height = "100px";
  root.style.width = "100px";

  var io = new IntersectionObserver(
    ()=>{ console.log("This shouldn't be called since we always takeRecords."); },
    {
      root: root
    }
  );

  var child = document.createElement('child');
  root.appendChild(child);

  child.style.height = "20px";
  child.style.width = "20px";
  child.style.position = "absolute";

  io.observe(child);

  var numRecords = io.takeRecords().length;
  io.disconnect();
  return assert(numRecords);
}, 'takeRecords and observe already intersecting element')

// Observe non-intersecting element.
test(()=>{
  var container = document.getElementById('container');
  var root = document.createElement('root');
  container.appendChild(root);

  root.style.height = "100px";
  root.style.width = "100px";

  var io = new IntersectionObserver(
    ()=>{ console.log("This shouldn't be called since we always takeRecords."); },
    {
      root: root,
    }
  );

  var child = document.createElement('child');
  root.appendChild(child);

  child.style.height = "20px";
  child.style.width = "20px";
  child.style.position = "absolute";
  child.style.top = "-20px";

  io.observe(child);

  var records = io.takeRecords();
  io.disconnect();
  return assert(records.length === 1 && records[0].intersectionRatio === 0);
}, 'observe non-intersecting element')

// thresholds
test(()=>{
  var container = document.getElementById('container');
  var root = document.createElement('root');
  container.appendChild(root);

  root.style.height = "100px";
  root.style.width = "100px";

  var io = new IntersectionObserver(
    ()=>{ console.log("This shouldn't be called since we always takeRecords."); },
    {
      threshold: 0.5,
      root: root,
    }
  );

  var child = document.createElement('child');
  root.appendChild(child);

  child.style.height = "20px";
  child.style.width = "20px";
  child.style.position = "absolute";

  io.observe(child);

  var output = []
  var records = io.takeRecords();
  output.push(assert(records.length == 1 && records[0].intersectionRatio === 1));

  child.style.top = "-11px";
  var records = io.takeRecords();
  output.push(assert(records.length == 1 && records[0].intersectionRatio <= 0.5));

  child.style.top = "-10px";
  var records = io.takeRecords();
  output.push(assert(records.length == 1 && records[0].intersectionRatio === 0.5));

  io.disconnect();
  return output.join('\n');
}, 'thresholds')

// multiple thresholds
test(()=>{
  var container = document.getElementById('container');
  var root = document.createElement('root');
  container.appendChild(root);

  root.style.height = "100px";
  root.style.width = "100px";

  var io = new IntersectionObserver(
    ()=>{ console.log("This shouldn't be called since we always takeRecords."); },
    {
      threshold: [0.5, 0.25],
      root: root,
    }
  );

  var child = document.createElement('child');
  root.appendChild(child);

  child.style.height = "20px";
  child.style.width = "20px";
  child.style.position = "absolute";

  io.observe(child);

  var output = []
  var records = io.takeRecords();
  output.push(assert(records.length == 1 && records[0].intersectionRatio === 1));

  child.style.top = "-11px";
  var records = io.takeRecords();
  output.push(assert(records.length == 1 && records[0].intersectionRatio <= 0.5 && records[0].intersectionRatio >= 0.25));

  child.style.top = "-16px";
  var records = io.takeRecords();
  output.push(assert(records.length == 1 && records[0].intersectionRatio <= 0.25));

  child.style.top = "-17px";
  var records = io.takeRecords();
  output.push(assert(records.length == 0));

  child.style.top = "-15px";
  var records = io.takeRecords();
  output.push(assert(records.length == 1 && records[0].intersectionRatio === 0.25));

  io.disconnect();
  return output.join('\n');
}, 'multiple thresholds')

// margins
test(()=>{
  var container = document.getElementById('container');
  var root = document.createElement('root');
  container.appendChild(root);

  root.style.height = "100px";
  root.style.width = "200px";

  var io = new IntersectionObserver(
    ()=>{ console.log("This shouldn't be called since we always takeRecords."); },
    {
      margin: "5px 10% 10% 15px",
      root: root,
    }
  );

  var child = document.createElement('child');
  root.appendChild(child);

  child.style.height = "20px";
  child.style.width = "20px";
  child.style.position = "absolute";

  io.observe(child);

  var output = []
  output.push(assert(io.takeRecords().length));

  // Stop intersecting from the top.
  child.style.top = "-25px";
  output.push(assert(io.takeRecords().length));

  // Start intersecting from the top.
  child.style.top = "-24px";
  output.push(assert(io.takeRecords().length));

  // Stop intersecting from the bottom.
  child.style.top = "110px";
  output.push(assert(io.takeRecords().length));

  // Start intersecting from the bottom.
  child.style.top = "109px";
  output.push(assert(io.takeRecords().length));

  // Stop intersecting from the left.
  child.style.left = "-35px";
  output.push(assert(io.takeRecords().length));

  // Start intersecting from the left.
  child.style.left = "-34px";
  output.push(assert(io.takeRecords().length));

  // Stop intersecting from the right.
  child.style.left = "220px";
  output.push(assert(io.takeRecords().length));

  // Start intersecting from the right.
  child.style.left = "219px";
  output.push(assert(io.takeRecords().length));

  io.disconnect();
  return output.join('\n');
}, 'margins')

</script>
