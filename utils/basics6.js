const Person = require("./basics5");

class Pet extends Person
{
    get location()
    {
        return "BlueCross"
    }

    constructor(firstName,lastName)
    {
        super(firstName,lastName)
    }



}

let pet = new Pet("sam","san");
pet.fullName();
console.log(pet.location)