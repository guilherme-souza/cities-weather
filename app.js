/*
 * CITY WEATHER MODULE
 */
var cityWeatherModule = angular.module('CityWeatherModule', []);

/*
 * CITY WEATHER CONTROLLER
 */
var cityWeatherController = function($scope, cityWeatherService) {
  $scope.cities = [
    {
      name: 'Amsterdam',
      image: 'amsterdam.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }, {
      name: 'Lisbon',
      image: 'lisbon.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Lisbon,pt&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }, {
      name: 'London',
      image: 'london.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }, {
      name: 'Madrid',
      image: 'madrid.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Madrid,es&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }, {
      name: 'Paris',
      image: 'paris.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Paris,fr&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }
  ];

  cityWeatherService.getCityWeather($scope.cities[0]);
  cityWeatherService.getCityWeather($scope.cities[1]);
  cityWeatherService.getCityWeather($scope.cities[2]);
  cityWeatherService.getCityWeather($scope.cities[3]);
  cityWeatherService.getCityWeather($scope.cities[4]);
}

cityWeatherController.$inject = ['$scope', 'CityWeatherService'];

/*
 * CITY WEATHER SERVICE
 */
var cityWeatherService = function($http) {
  return {
    getCityWeather: function(cityObject) {
      $http.get(cityObject.url).then(function(response) {
        var resp = response.data;
        cityObject.temperature = resp.main.temp;
        cityObject.weatherDescription = resp.weather[0].description;
        cityObject.windSpeed = resp.wind.speed;
      });
    }
  };
}

cityWeatherModule.controller('CityWeatherController', cityWeatherController);
cityWeatherModule.service('CityWeatherService', cityWeatherService);
