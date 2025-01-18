// DrawRectangle.js
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }
  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');
  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set a blue color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
  v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(ctx, v1, "red");
  document.getElementById('draw-button').addEventListener('click', () => {
        handleDrawEvent(ctx);
    });
  document.getElementById("operation-button").addEventListener("click", () => {
        handleDrawOperationEvent(ctx);
  });
}

function drawVector(ctx, v, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;

  ctx.moveTo(centerX, centerY);

  // Scale the vector coordinates by 20
  const scaledX = v.elements[0] * 20;
  const scaledY = v.elements[1] * 20;

  // Draw the line representing the vector
  ctx.lineTo(centerX + scaledX, centerY - scaledY);

  // Render the path
  ctx.stroke();
}

function handleDrawEvent(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Fill a rectangle with the color

    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);

    const v1 = new Vector3([x1, y1, 0]);
    drawVector(ctx, v1, "red");
    const v2 = new Vector3([x2, y2, 0]);
    drawVector(ctx, v2, "blue");
}

function handleDrawOperationEvent(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Fill a rectangle with the color

  const x1 = parseFloat(document.getElementById('x1').value);
  const y1 = parseFloat(document.getElementById('y1').value);
  const z1 = parseFloat(document.getElementById('z1').value);
  const x2 = parseFloat(document.getElementById('x2').value);
  const y2 = parseFloat(document.getElementById('y2').value);
  const z2 = parseFloat(document.getElementById('z2').value);
  const scalar = parseFloat(document.getElementById("scalar").value) || 1;
  const operation = document.getElementById("func-select").value;

  const v1 = new Vector3([x1, y1, z1]);
  const v2 = new Vector3([x2, y2, z2]);
  drawVector(ctx, v1, "red");
  drawVector(ctx, v2, "blue");

  let result1, result2;
  switch (operation) {
    case "add":
      result1 = v1.add(v2);
      drawVector(ctx, result1, "green");
      break;

    case "sub":
      result1 = v1.sub(v2);
      drawVector(ctx, result1, "green");
      break;

    case "mul":
      result1 = v1.mul(scalar);
      result2 = v2.mul(scalar);
      drawVector(ctx, result1, "green");
      drawVector(ctx, result2, "green");
      break;

    case "div":
      result1 = v1.div(scalar);
      result2 = v2.div(scalar);
      drawVector(ctx, result1, "green");
      drawVector(ctx, result2, "green");
      break;

    case "magnitude":
      console.log(`Magnitude of v1: ${v1.magnitude().toFixed(9)}`);
      console.log(`Magnitude of v2: ${v2.magnitude().toFixed(9)}`);
      break;

    case "normalize":
      result1 = v1.normalize();
      result2 = v2.normalize();
      drawVector(ctx, result1, "green");
      drawVector(ctx, result2, "green");
      break;

    case "angle":
      const angle = angleBetween(v1, v2);
      console.log(`Angle between v1 and v2: ${angle.toFixed(2)} degrees`);
      break;

    case "area":
      const area = areaTriangle(v1, v2);
      console.log(`Area of triangle spanned by v1 and v2: ${area.toFixed(2)}`);
      break;
    }
  }

function angleBetween(v1, v2) {
  const dotProduct = Vector3.dot(v1, v2);
  const magnitude1 = v1.magnitude();
  const magnitude2 = v2.magnitude();
  const cosTheta = dotProduct / (magnitude1 * magnitude2);
  const clampedCosTheta = Math.max(-1, Math.min(1, cosTheta));
  const angleInRadians = Math.acos(clampedCosTheta);
  const angleInDegrees = (angleInRadians * 180) / Math.PI;
  return angleInDegrees;
}

function areaTriangle(v1, v2) {
  const crossProduct = Vector3.cross(v1, v2);
  const areaParallelogram = crossProduct.magnitude();
  const areaTriangle = areaParallelogram / 2;
  return areaTriangle;
}
