let categoryName;

function setup() {
  createCanvas(800, 300);

  categoryName = createInput("cat");
  categoryName.position(10, height);

  button = createButton("Draw");
  button.mousePressed(requestCategory);
  button.position(150, height);

  requestCategory();
}

function requestCategory() {
  loadJSON(
    `http://localhost:8080/drawing/${encodeURI(categoryName.value())}`,
    drawCategory,
    (err) => alert("no such drawing")
  );
}

function drawCategory(data) {
  clear();
  if (data.code == 404) {
    alert("No such drawing");
    return;
  }
  noFill();
  data.drawing.forEach(([xs, ys]) => {
    beginShape();
    xs.forEach((x, i) => vertex(x, ys[i]));
    endShape(CLOSE);
  });
}

function draw() {
  rect(0, 0, 10, 10);
}
