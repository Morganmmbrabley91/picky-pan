$(document).ready(function () {
    var searchAppKey = '786802ea47922e8d34ad5e0a894a4c3a';
    var searchAppId = '9ce8c3da';
    var recipeSearches = $('#recipeSearches');
    var alc = $('input[value="alcohol-free"]');
    var bal = $('input[value="balanced"]');
    var dai = $('input[value="dairy-free"]');
    var egg = $('input[value="egg-free"]');
    var glu = $('input[value="gluten-free"]');
    var fib = $('input[value="high-fiber"]');
    var pro = $('input[value="high-protein"]');
    var car = $('input[value="low-carb"]');
    var fat = $('input[value="low-fat"]');
    var sod = $('input[value="low-sodium"]');
    var pal = $('input[value="paleo"]');
    var pea = $('input[value="peanut-free"]');
    var she = $('input[value="shellfish-free"]');
    var soy = $('input[value="soy-free"]');
    var sugCon = $('input[value="sugar-conscious"]');
    var tre = $('input[value="tree-nut-free"]');
    var vegan = $('input[value="vegan"]');
    var veg = $('input[value="vegetarian"]');
    var whe = $('input[value="wheat-free"]');

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function loadRecipes(event) {
        event.preventDefault();
        recipeSearches.empty();
        var searchItem = $('#recipeSearchBox').val();
        var queryURL = "https://api.edamam.com/search?q=" + searchItem + "&app_id=" + searchAppId + "&app_key=" + searchAppKey + "&from=0&to=30";
        var dietLabel = '&diet=';
        var healthLabel = '&health='
        if (alc.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += alc.val();
        }
        if (bal.prop('checked')) {
            if (dietLabel !== '&diet=') {
                dietLabel += '&diet=';
            }
            dietLabel += bal.val();
        }
        if (dai.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += dai.val();
        }
        if (egg.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += egg.val();
        }
        if (glu.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += glu.val();
        }
        if (fib.prop('checked')) {
            if (dietLabel !== '&diet=') {
                dietLabel += '&diet=';
            }
            dietLabel += fib.val();
        }
        if (pro.prop('checked')) {
            if (dietLabel !== '&diet=') {
                dietLabel += '&diet=';
            }
            dietLabel += pro.val();
        }
        if (car.prop('checked')) {
            if (dietLabel !== '&diet=') {
                dietLabel += '&diet=';
            }
            dietLabel += car.val();
        }
        if (fat.prop('checked')) {
            if (dietLabel !== '&diet=') {
                dietLabel += '&diet=';
            }
            dietLabel += fat.val();
        }
        if (sod.prop('checked')) {
            if (dietLabel !== '&diet=') {
                dietLabel += '&diet=';
            }
            dietLabel += sod.val();
        }
        if (pal.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += pal.val();
        }
        if (pea.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += pea.val();
        }
        if (she.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += she.val();
        }
        if (soy.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += soy.val();
        }
        if (sugCon.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += sugCon.val();
        }
        if (tre.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += tre.val();
        }
        if (vegan.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += vegan.val();
        }
        if (veg.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += veg.val();
        }
        if (whe.prop('checked')) {
            if (healthLabel !== '&health=') {
                healthLabel += '&health=';
            }
            healthLabel += whe.val();
        }
        if (healthLabel !== '&health=') {
            queryURL += healthLabel;
        }
        if (dietLabel !== '&diet=') {
            queryURL += dietLabel;
        }
        $.ajax({
            url: queryURL,
            method: 'GET',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                recipeSearches.append($('<h2 class="enter-recipe">').text('Sorry! No recipes with those specifications...'));
            }
        }).then(function (data) {
            var results = data.hits;
            for (var i = 0; i < results.length; i++) {
                var colDiv = $('<div class="col m4">');
                var cardDiv = $('<div class="card">');
                var cardImageDiv = $('<div class="card-image">');
                var cardImage = $('<img>').attr('src', results[i].recipe.image);
                var cardImageSpan = $('<span class="card-title">').text(results[i].recipe.label);
                cardImageDiv.append(cardImage, cardImageSpan);
                var cardContentDiv = $('<div class="card-content">');
                var calories = Math.floor(results[i].recipe.calories);
                var nutrients = [];
                nutrients.push({
                    label: "calories",
                    quantity: calories,
                    unit: ''
                });
                if (results[i].recipe.totalNutrients.FAT) {
                    nutrients.push(results[i].recipe.totalNutrients.FAT);
                }
                if (results[i].recipe.totalNutrients.CHOCDF) {
                    nutrients.push(results[i].recipe.totalNutrients.CHOCDF);
                }
                if (results[i].recipe.totalNutrients.PROCNT) {
                    nutrients.push(results[i].recipe.totalNutrients.PROCNT);
                }
                if (results[i].recipe.totalNutrients.NA) {
                    nutrients.push(results[i].recipe.totalNutrients.NA);
                }
                var cardContent = $('<p>');
                var cardContentHtml = '';
                for (var j = 0; j < nutrients.length; j++) {
                    cardContentHtml += capitalize(nutrients[j].label) + ": " + Math.floor(nutrients[j].quantity) + nutrients[j].unit + "<br />";
                }
                cardContent.html(cardContentHtml);
                cardContentDiv.append(cardContent);
                var cardLinkDiv = $('<div class="card-action">');
                var cardLink = $('<a>').attr('href', results[i].recipe.url).text('Recipe Website');
                cardLinkDiv.append(cardLink);
                cardDiv.append(cardImageDiv, cardContentDiv, cardLinkDiv);
                colDiv.append(cardDiv);
                recipeSearches.append(colDiv);
            }
        });
    }

    $("#recipeSearchBox").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#recipeSearchSubmit").click();
        }
    });

    $('#recipeSearchSubmit').click(function () {
        loadRecipes(event);
    });
});