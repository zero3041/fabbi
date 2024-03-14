<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use function Ramsey\Uuid\v1;

class OrderController extends Controller
{
    public function showOrder()
    {
        return view('welcome');
    }

    public function getRestaurants(Request $request)
    {
        $jsonContent = file_get_contents('../data/dishes.json');

        $dishes = json_decode($jsonContent, true);

        $meal = $request->input('meal');
        $numPeople = $request->input('numPeople');

        $restaurants = $this->getMatchingRestaurants($dishes, $meal, $numPeople);

        return response()->json($restaurants);
    }

    private function getMatchingRestaurants($dishes, $meal, $numPeople)
    {
        $matchingRestaurants = [];

        foreach ($dishes['dishes'] as $dish) {
            if (in_array($meal, $dish['availableMeals'])) {
                $matchingRestaurants[$dish['restaurant']] = $dish['restaurant'];
            }
        }

        return array_values($matchingRestaurants);
    }

    public function getDishes($restaurantName)
    {
        $jsonContent = file_get_contents('../data/dishes.json');
        $dishes = json_decode($jsonContent);

        $filteredDishes = array_filter($dishes->dishes, function ($dish) use ($restaurantName) {
            return $dish->restaurant == $restaurantName;
        });

        $filteredDishesArray = [];
        foreach ($filteredDishes as $dish) {
            $filteredDishesArray[] = $dish;
        }

        return response()->json($filteredDishesArray);
    }


}
