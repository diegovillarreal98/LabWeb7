$(document).ready(function() {

	let temas = ["galleta", "pastel", "dona", "chocolate", "dulces"];

	// Start your code from here
	for (let i = 0; i<temas.length; i++){

		$("#animal-buttons").append(`<input id = "but" type = "submit" value= "${temas[i]}" >`);

	}

	$("#animal-buttons").on("click", "#but", function(){
		$("#animals").html("");
		var  check = {
			url: `https://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=R7Y4y5LmA29zx27Fa8wlq8AyrIaqrIDO&limit=10`,
			success: function (res){
				for(let i = 0; i < res.data.length; i++){
					let image = $(`<img alt = ${this.value}>`);
					image.attr("src", res.data[i].images.fixed_height_still.url);
					image.attr("data-animate", res.data[i].images.fixed_height.url);
					image.attr("data-still", res.data[i].images.fixed_height_still.url);
					image.attr("data-moving", "no");
					image.addClass("food-item");
					console.log("hola");
					let foodSpace = $(`<div id= "food"> </div>`);
					let rating = $(`<p> Rate: ${res.data[i].rating} </p>`);
					foodSpace.append(rating);
					foodSpace.append(image);
					$("#animals").append(foodSpace);
				}
				
			},
			error: function(){
				console.log("Hubo un error en tu busqueda, verifica los datos e intente de nuevo");
			}
		}
		$.ajax(check);
	})


	$("#add-animal").on("click", function(event){
		event.preventDefault();
		let foodname = $("#animal-input").val();
		$("#animal-buttons").append(`<input id = "but" type = "submit" value= "${foodname}" >`);
	});


	$("body").on("click", ".food-item", function(){
		var check2 = $(this).attr("data-moving");
		if (check2 === "no"){
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-moving", "yes");
		}
		else{
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-moving", "no");
		}

	});

});