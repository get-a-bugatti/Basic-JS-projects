Function.prototype.customBind = function (contextObj) {
  const originalFn = this;
  return function (...args) {
    const tempKey = Symbol();

    contextObj[tempKey] = originalFn;
    const result = contextObj[tempKey](...args);
    delete contextObj[tempKey];

    return result;
  };
};

// ### TESTS ###

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

const a = new Admin("kenny", "kenny@mail.in", "admin");

const fn = a.login;

fn(); // Admin `undefined` has logged in.

// Now, lets try binding `fn()'s` context to `a`.
const bound = fn.customBind(a);
bound();
