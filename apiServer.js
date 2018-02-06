const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

//USE JSON Body Parsers
//JSON PARSER
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

/* Cross Origin Resource */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*Only for demo we are using a server defined array*/
let pokemons = [
    { name: "Bulbasaur", ability: "Overgrow" },
    { name: "Charmander", ability: "Blaze" },
    { name: "Blastoise", ability: "Torrent" },
    { name: "Metapod", ability: "Shed Skin" },
    { name: "Paras", ability: "Effect Spore" }
];

app.route('/pokemonsList').get((req, res) => {
    if (pokemons != [] && pokemons)
        res.json({ status: 'Success', message: "Pokemons Fetched Successfully!", pokemons: pokemons });
    else
        res.status(500).json({ status: "Error" });
});

//Create a New Pokemon and add it to the Database (in this case only the pokemons array)
app.route('/addPokemon').post((req, res) => {
    console.log(req.body.pokeName);
    console.log(req.body.pokeAbility);
    //Add a new Pokemon to the Array
    pokemons.push({ name: req.body.pokeName, ability: req.body.pokeAbility });
    //Send Success
    res.json({ status: "Success", message: "Pokemon Added Successfully!", reload: true });
});

//Remove a Pokemon from the List
app.route('/removePokemon').post((req, res) => {
    console.log(req.body.pokeName);
    let exists = false;
    if (pokemons && pokemons != []) {
        let newArr = [];
        pokemons.forEach((poke, index) => {
            if (poke.name != req.body.pokeName) {
                //Removing...
                newArr.push(pokemons[index]);
            } else {
                exists = true;
            }
        });
        if (!exists) res.status(500).json({ status: "Error", message: "Pokemon " + req.body.pokeName + " Does Not Exist!" });
        else {
            pokemons = newArr;
            return res.json({
                status: "Sucess",
                message: "Pokemon Removed Successfully!",
                reload: true
            });
        }
    }
});


//Listen on Specified Port
app.listen(port, () => { console.log("Server Running at PORT " + port); });