function User(name, email) {
  this.name = name;
  this.email = email;
}

User.prototype.login = function () {
  console.log(`User ${this.name} just Logged in.`);
};

User.prototype.logout = function () {
  console.log(`User ${this.name} logged out.`);
};

function Admin(name, email, role) {
  User.call(this, name, email);
  this.role = role;
}

//Inherits methods from Parent(User)
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

// Admin-specific method
Admin.prototype.deleteUser = function (target) {
  console.log(`${target} user has been deleted.`);
};

// Method Overriding: Admin's login should be != User's login
Admin.prototype.login = function () {
  console.log(`Admin ${this.name} has logged in.`);
};

const u = new User("yellow", "yellow@user.np");
const a = new Admin("kenny", "kenny@mail.in", "admin");

console.log(a);
// a.login();
// a.deleteUser("userX");

console.log(u);
// u.login();
// u.deleteUser("userZ");

console.log("===Tests===");

/*  WORKING TESTS  - all PASSED */
// console.log(a instanceof Admin); // true
// console.log(a instanceof User); // true

// console.log(a.deleteUser);
// console.log(u.deleteUser);

// console.log(Object.getPrototypeOf(a) === Admin.prototype);
// console.log(Object.getPrototypeOf(Admin.prototype) === User.prototype);

// Breaking context (This).
const fn = a.login;

// fixing `this` context
fn.call(a); // call by manually giving `this` (correct context).
const boundFn = fn.bind(a); // create a `fn` function bound to correct context.
boundFn();

fn.apply(a, []);
