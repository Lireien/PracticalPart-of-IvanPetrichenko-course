'use strict';

class User1 {
  constructor(name, age) {
    this._name = name;
    this.age = age;
  }
  #gender = 'female';
  say = () => {
    console.log(
      `User name is ${this._name}, age is ${this.age}, gender is ${
        this.#gender
      }`
    );
  };
}

let lala = new User1('Lala', 44);
console.log(lala.gender);

('use strict');

class User {
  constructor(name, age) {
    this.name = name;
    this._age = age;
  }

  #surname = 'Bbbb';

  say = () => {
    console.log(
      `Имя пользователя: ${this.name} ${this.#surname}, возраст ${this._age}`
    );
  };

  get age() {
    return this._age;
  }

  set age(age) {
    if (typeof age === 'number' && age > 0 && age < 110) {
      this._age = age;
    } else {
      console.log('Недопустимое значение!');
    }
  }
}

const vvv = new User('Vvvv', 33);
console.log(vvv.surname);
