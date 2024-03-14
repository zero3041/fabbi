var currentStep = 1;
var updateProgressBar;

function displayStep(stepNumber) {
  if (stepNumber >= 1 && stepNumber <= 4) {
    $(".step-" + currentStep).hide();
    $(".step-" + stepNumber).show();
    currentStep = stepNumber;
    updateProgressBar();
  }
}




$(document).ready(function() {
    var currentStep = 1;
    var csrfToken =  $('meta[name="csrf-token"]').attr('content');

    $("#step1").click(function() {
        if (currentStep === 1) {
            var meal = $("#meal").val();
            var numPeople = $("#field2").val();

            if (numPeople === '') {
                return;
            }

            $.ajax({
                url: "/get-restaurants",
                method: "POST",
                data: {
                    _token: csrfToken,
                    meal: meal,
                    numPeople: numPeople
                },
                success: function(response) {
                    $("#restaurant").empty();
                    $.each(response, function(key, value) {
                        $("#restaurant").append("<option value='" + value + "'>" + value + "</option>");
                    });

                    $(".step-" + currentStep).hide();
                    currentStep++;
                    $(".step-" + currentStep).show();
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }
    });

    $(".prev-step").click(function() {
        $(".step-" + currentStep).hide();
        currentStep--;
        $(".step-" + currentStep).show();
    });
});


$('.step-2 .next-step').click(function() {

    var selectedRestaurant = $('#restaurant').val();
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
        url: '/get-dishes/' + selectedRestaurant,
        type: 'GET',
        data: {
            _token: csrfToken,
        },
        success: function(response) {
            var selectedMeal = $('#meal').val();
            var filteredDishes = response.filter(function(dish) {
                return dish.availableMeals.includes(selectedMeal);
            });

            $('#dish').empty();
            $.each(filteredDishes, function(index, dish) {
                $('#dish').append('<option value="' + dish.id + '">' + dish.name + '</option>');
            });
        },
        error: function(xhr) {
            console.log(xhr.responseText);
        }
    });

    $('.step').removeClass('active');
    $('.step-3').addClass('active');
});


$('#add-dish').click(function() {
    var selectedRestaurant = $('#restaurant').val();
    var selectedMeal = $('#meal').val();

    var csrfToken = $('meta[name="csrf-token"]').attr('content');

    $.ajax({
        url: '/get-dishes/' + selectedRestaurant,
        type: 'GET',
        data: {
            _token: csrfToken,
        },
        success: function(response) {
            var filteredDishes = response.filter(function(dish) {
                return dish.restaurant == selectedRestaurant && dish.availableMeals.includes(selectedMeal);
            });

            var newDishRow = `
                <div class="row dish-row">
                    <div class="mb-3 col-xl-8">
                        <label for="dish" class="form-label">Please Select a Dish:</label>
                        <select type="text" class="form-control dish" name="dish[]">
                        </select>
                    </div>
                    <div class="mb-3 col-xl-4">
                        <label for="quantity" class="form-label">Quantity:</label>
                        <input value="1" min="1" max="10" type="number" class="form-control quantity" name="quantity[]">
                    </div>
                </div>
            `;
            $('#dishes-container').append(newDishRow);

            var newSelect = $('#dishes-container').find('.dish').last();
            newSelect.empty();
            $.each(filteredDishes, function(index, dish) {
                newSelect.append('<option value="' + dish.id + '">' + dish.name + '</option>');
            });
        },
        error: function(xhr) {
            console.log(xhr.responseText);
        }
    });
});


$('.step-3 .next-step').click(function() {
    var selectedMeal = $('#meal').val();
    var numPeople = $('#field2').val();
    var selectedRestaurant = $('#restaurant').val();
    var dishesInfo = '';

    $('.dish-row').each(function() {
        var dishName = $(this).find('.dish option:selected').text();
        var quantity = $(this).find('.quantity').val();
        if (dishName.trim() !== '' && dishName !== "Open this select menu") {
            dishesInfo += '<li>' + dishName + ' - ' + quantity + '</li>';
        }
    });

    var step4Content = `
        <li class="list-group-item">Meal: ${selectedMeal}</li>
        <li class="list-group-item">No of People: ${numPeople}</li>
        <li class="list-group-item">Restaurant: ${selectedRestaurant}</li>
        <li class="list-group-item">Dishes:
            <ul>
                ${dishesInfo}
            </ul>
        </li>
    `;

    $('#step4-content').html(step4Content);

    $('.step').removeClass('active');
    $('.step-4').addClass('active');
});




$(document).ready(function() {
    $('#multi-step-form').find('.step').slice(1).hide();

    $(".next-step").click(function() {
        if (currentStep === 1) { // Check if current step is Step 1
            var numPeople = $("#field2").val(); // Get value of number of people input
            if (numPeople === "") { // Check if input is empty
                toastr.error('Please enter the number of people.'); // Display error toast
                return; // Stop execution
            } else {
                updateProgressBar(); // Update progress bar if input is not empty
            }

            // if (dishesInfo === ''){
            //     toastr.error('Please select a Dish'); // Display error toast
            //     return; // Stop execution
            // } else {
            //     updateProgressBar(); // Update progress bar if input is not empty
            // }
        }

        if (currentStep === 3 ){
            var dishesInfo = '';
            $('.dish-row').each(function() {
                var dishName = $(this).find('.dish option:selected').text();
                var quantity = $(this).find('.quantity').val();
                if (dishName.trim() !== '' && dishName !== "Open this select menu") {
                    dishesInfo += '<li>' + dishName + ' - ' + quantity + '</li>';
                }
            });
            if (dishesInfo === ''){
                toastr.error('Please select a Dish'); // Display error toast
                return; // Stop execution
            } else {
                updateProgressBar(); // Update progress bar if input is not empty
            }
        }

        // Your existing code for navigating to the next step
        if (currentStep < 4) {
            $(".step-" + currentStep).addClass("animate__animated animate__fadeOutLeft");
            currentStep++;
            setTimeout(function() {
                $(".step").removeClass("animate__animated animate__fadeOutLeft").hide();
                $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInRight");
                updateProgressBar();
            }, 500);
        }
    });

    $(".prev-step").click(function() {
        if (currentStep > 1) {
            // If current step is Step 3, clear all dish fields
            if (currentStep === 3) {
                $("#dishes-container").empty();
            }

            $(".step-" + currentStep).addClass("animate__animated animate__fadeOutRight");
            currentStep--;
            setTimeout(function() {
                $(".step").removeClass("animate__animated animate__fadeOutRight").hide();
                $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInLeft");
                updateProgressBar();
            }, 500);
        }
    });

    updateProgressBar = function() {
        var progressPercentage = ((currentStep - 1) / 3) * 100;
        $(".progress-bar").css("width", progressPercentage + "%");
    }
});
