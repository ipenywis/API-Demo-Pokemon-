import { EventEmitter } from './C:/Users/IslemPenywis/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/events';

let utils = require('./utils');

console.log('My Name: ', utils.getFullName());

const fs = require('fs');

/*fs.appendFile('./pokemons.txt', 'DATA HAS BEEN ADDED!   HEY THIS ME ', 'utf8', (err) => {
    if (err) console.log(err);

    fs.readFile('./pokemons.txt', 'utf8', (err, data) => {
        console.log('Pokemons: ', data);
    });

});*/

fs.stat('./pokemons.txt', (err, stats) => {
    console.log('Stats: ', stats);
});


class Store extends EventEmitter {
    init(name, job) {
        this.name = name;
        this.job = job;
        //Emit the Initialized Event
        //When you extend from EventEmitter Class you can use this to access the emit and on methods
        this.emit('store-init', this.name); ///< we emit store-init event and pass in the current name
    }

    getFullName() {
        return this.name;
    }

    getJob() {
        return this.job;
    }

    setName(name) {
        this.name = name;
        this.emit('name-changed', this.name);
    }

    setJob(job) {
        this.job = job;
    }

}

let pokemonsStore = new Store();
pokemonsStore.init('pikachou', 'Shoots an electric spark');
//We add the Handler for store-init event
pokemonsStore.on('store-init', (name) => {
    //Now we can receive the name (data) that we have passed to this
    console.log('Store Initialized ', name);
});
//Also we can add listen for change event
pokemonsStore.on('name-changed', (newName) => {
    console.log('Name Changed to ', newName);
});
//We test for Asynchronous Call
console.log('Printed Before the Last name-changed Event, haha!');
1
//We trigger the Event by changin the Name
pokemonsStore.setName('bulbasaur');
//You should get
/* Store Initialized pikachou
   Printed Before the Last name - changed Event, haha!
   Name Changed to bulbasaur
*/


/*fs.unlink('./pokemons.txt', (err) => {
  if(err) console.log(err);
})*/