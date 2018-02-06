$(function() {

    let $pokemonsContainer = $("#list-pokemons").find("table");


    let pokemonName = $("[data-js=pokemonName]");
    let pokemonId = $("[data-js=pokemonId]");
    let pokemonAbility = $("[data-js=pokemonAbility]");


    function requestPokemonsList(callback) {
        $.ajax({
            url: "http://localhost:3000/pokemonsList",
            type: "GET",
            dataType: "json",
            data: {},
            success: callback,
            error: function(err) {
                console.log("AJAX ERROR " + err);
            }
        });
    }

    //console.log(requestPokemonsList((pokemons) => { console.log(pokemons); }));

    //Add Pokemons List
    function PreparePokemons() {
        requestPokemonsList((data) => {
            //Clear Already Added Pokemons
            $pokemonsContainer
                .find(
                    "[clear=true]"
                )
                .empty();
            let pokemons = data.pokemons;
            if (pokemons == []) $pokemonsContainer.parent().append("<span class='alert alert-danger text-center' style='margin: auto'>No Pokemons</span>");
            for (let i = 0; i < pokemons.length; i++) {
                $pokeId = $("<td>" + String(i + 1) + "</td>");
                $pokeName = $("<td>" + pokemons[i].name + "</td>");
                $pokeAbility = $("<td>" + pokemons[i].ability + "</td>");
                $pokeRemove = $("<td pokeName='" + pokemons[i].name + "'>" + '<button class="btn btn-danger" data-js="removePokemon">Remove</button>' + "</td>");
                $pokeContainer = $("<tr clear='true'></tr>");
                $pokeContainer.append($pokeId);
                $pokeContainer.append($pokeName);
                $pokeContainer.append($pokeAbility);
                $pokeContainer.append($pokeRemove);
                $pokemonsContainer.append($pokeContainer);
                //console.log($pokeContainer);
            }
            //Submit Finish Event
            $(document).trigger("pokemons-listed");
        });
    }
    //Add the Available Pokemons to table
    PreparePokemons();

    function addNewPokemon(pokemon, callback) {
        //Submit the Add API
        $.ajax({
            url: "http://localhost:3000/addPokemon",
            type: "POST",
            dataType: "json",
            data: pokemon,
            success: callback,
            error: function(err) {
                console.log("AJAX ERROR: " + err);
            }
        });
    }

    //On Form Submit
    $pokemonForm = $("#create-pokemon").find("form");
    let ok = true;
    $pokemonForm.submit((e) => {
        let formData = $(e.target).serializeArray();
        console.log(formData);
        //let pokemon;
        let pokemon = {};
        formData.forEach((input, index) => {
            console.log(input);
            if (input.name == "pokemonName") {
                if (input.value == '') {
                    alert("Please Specify Pokemon Name!");
                    ok = false;
                }
                pokemon.pokeName = input.value;
            } else if (input.name == "pokemonAbility") {
                if (input.value == "") {
                    alert("Please Specify Pokemon Ability!");
                    ok = false;
                }
                pokemon.pokeAbility = input.value;
            }

        });

        //Add a New Pokemon
        if (ok) {
            addNewPokemon(pokemon, (response) => {
                alert(response.message);
                console.log(response.message);
                if (response.reload) location.reload();
            });
        }

        //Prevent Form Default Behaviour (Page Reload)
        e.preventDefault();
    });

    /* Rmove Pokemon */
    function removePokemon(pokemonName, callback) {
        $.ajax({
            url: "http://localhost:3000/removePokemon",
            type: 'POST',
            dataType: 'json',
            data: pokemonName,
            success: callback,
            error: function(err) {
                console.log(err);
            }
        });
    }

    // On REMOVE Submit
    $(document).on("pokemons-listed", () => {
        $removeBtn = $("[data-js=removePokemon]");
        $removeBtn.on("click", (e) => {
            let pokemon = { pokeName: e.target.parentElement.getAttribute('pokeName') };
            removePokemon(pokemon, (response) => {
                alert(response.message);
                console.log(response.message);
                if (response.reload) location.reload();
            });
        });
    });

});