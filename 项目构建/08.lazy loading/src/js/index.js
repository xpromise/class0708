
document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: "module1", webpackPrefetch: true */'./module1').then(({default: add}) => {
    console.log(add(2, 2));
  });
};

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
