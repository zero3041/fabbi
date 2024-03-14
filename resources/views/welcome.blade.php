<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

    <link rel="stylesheet" href="{{ asset('style.css') }}">
</head>
<body>
    <div id="container" class="container mt-5">
        <div class="progress px-1" style="height: 3px;">
          <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="step-container d-flex justify-content-between">
          <div class="step-circle" >1</div>
          <div class="step-circle" >2</div>
          <div class="step-circle" >3</div>
          <div class="step-circle" >4</div>
        </div>

        <form id="multi-step-form">
            <meta name="csrf-token" content="{{ csrf_token() }}">
          <div class="step step-1">
            <h3>Step 1</h3>
            <div class="mb-3">
              <label for="field1" class="form-label">Please Select a meal:</label>
              <select id="meal" class="form-select" aria-label="Default select example">
                <option selected value="breakfast">breakfast</option>
                <option value="lunch">lunch</option>
                <option value="dinner">dinner</option>
              </select>
            </div>
            <div class="mb-3">
              <label id="numPeople" for="field1" class="form-label">Please Enter Number of people  :</label>
              <input max="10" class="form-control" id="field2" name="field2" type="number">
            </div>
            <button id="step1" type="button" class="btn btn-primary next-step">Next</button>
          </div>

          <div class="step step-2">
            <h3>Step 2</h3>
            <select id = "restaurant" class="form-select mb-3" aria-label="Default select example">
                <option selected>Please Select a restaurant:</option>

            </select>
            <button type="button" class="btn btn-primary prev-step">Previous</button>
            <button type="button" class="btn btn-primary next-step">Next</button>
          </div>
          <div class="step step-3">
            <h3>Step 3</h3>
            <div id="dishes-container">
                <div class="row dish-row">
                    {{-- <div class="mb-3 col-xl-8">
                        <label for="dish" class="form-label">Please Select a Dish:</label>
                        <select type="text" class="form-control dish" name="dish[]">
                        </select>
                    </div>
                    <div class="mb-3 col-xl-4">
                        <label for="quantity" class="form-label">Quantity:</label>
                        <input value="1" min="1" max="10" type="number" class="form-control quantity" name="quantity[]">
                    </div> --}}
                </div>
            </div>

            <button type="button" class="btn btn-primary" id="add-dish">Add Dish</button>
            <button type="button" class="btn btn-primary prev-step">Previous</button>
            <button type="button" class="btn btn-primary next-step">Next</button>
        </div>


        <div class="step step-4">
            <h3>Step 4</h3>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <ul class="list-group" id="step4-content">
                        </ul>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary prev-step">Previous</button>
            <button type="submit" class="btn btn-success">Submit</button>
        </div>

        </form>
      </div>
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" ></script>
    <script src="{{ asset('script.js') }}"></script>

</body>
</html>
