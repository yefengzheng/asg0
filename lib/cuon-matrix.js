
class Vector3 {
  constructor(elements) {
    this.elements = elements || [0, 0, 0];
  }

  add(v) {
    return new Vector3([
      this.elements[0] + v.elements[0],
      this.elements[1] + v.elements[1],
      this.elements[2] + v.elements[2],
    ]);
  }

  sub(v) {
    return new Vector3([
      this.elements[0] - v.elements[0],
      this.elements[1] - v.elements[1],
      this.elements[2] - v.elements[2],
    ]);
  }

  mul(scalar) {
    return new Vector3([
      this.elements[0] * scalar,
      this.elements[1] * scalar,
      this.elements[2] * scalar,
    ]);
  }

  div(scalar) {
    return new Vector3([
      this.elements[0] / scalar,
      this.elements[1] / scalar,
      this.elements[2] / scalar,
    ]);
  }

  magnitude() {
    return Math.sqrt(
      this.elements[0] ** 2 + this.elements[1] ** 2 + this.elements[2] ** 2
    );
  }

 normalize() {
   const mag = this.magnitude();
   return this.div(mag);
 }

 static dot(v1, v2) {
   return (
     v1.elements[0] * v2.elements[0] +
     v1.elements[1] * v2.elements[1] +
     v1.elements[2] * v2.elements[2]
   );
 }

 static cross(v1, v2) {
   const [x1, y1, z1] = v1.elements;
   const [x2, y2, z2] = v2.elements;
   return new Vector3([
     y1 * z2 - z1 * y2,
     z1 * x2 - x1 * z2,
     x1 * y2 - y1 * x2,
   ]);
 }
}
