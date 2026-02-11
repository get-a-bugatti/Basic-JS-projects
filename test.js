function Car(brand, model) {
  this.brand = brand;
  this.model = model;
}

Car.prototype.drive = function () {
  console.log(`U r driving a ${this.brand} car of MODEL no. ${this.model} `);
};

const toyota = new Car("toyota", "RMX12");

toyota.drive();
