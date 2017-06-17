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
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric',
      urlForecast: 'http://api.openweathermap.org/data/2.5/forecast?q=Amsterdam,nl&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }, {
      name: 'Lisbon',
      image: 'lisbon.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Lisbon,pt&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric',
      urlForecast: 'http://api.openweathermap.org/data/2.5/forecast?q=Lisbon,pt&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }, {
      name: 'London',
      image: 'london.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric',
      urlForecast: 'http://api.openweathermap.org/data/2.5/forecast?q=London,uk&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }, {
      name: 'Madrid',
      image: 'madrid.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Madrid,es&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric',
      urlForecast: 'http://api.openweathermap.org/data/2.5/forecast?q=Madrid,es&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }, {
      name: 'Paris',
      image: 'paris.png',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Paris,fr&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric',
      urlForecast: 'http://api.openweathermap.org/data/2.5/forecast?q=Paris,fr&appid=3d8b309701a13f65b660fa2c64cdc517&units=metric'
    }
  ];

  $scope.selectedCity = '';

  cityWeatherService.getCityWeather($scope.cities[0]);
  cityWeatherService.getCityWeather($scope.cities[1]);
  cityWeatherService.getCityWeather($scope.cities[2]);
  cityWeatherService.getCityWeather($scope.cities[3]);
  cityWeatherService.getCityWeather($scope.cities[4]);

  $scope.selectCity = function(city) {
    cityWeatherService.getCityForecast(city);
    $scope.selectedCity = city;
  };
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
    },
    getCityForecast: function(cityObject) {
      $http.get(cityObject.urlForecast).then(function(response) {
        var resp = response.data;
        cityObject.threeHours = {
          temperature: resp.list[0].main.temp,
          weather: resp.list[0].weather[0].description,
          wind: resp.list[0].wind.speed
        };
        cityObject.sixHours = {
          temperature: resp.list[1].main.temp,
          weather: resp.list[1].weather[0].description,
          wind: resp.list[1].wind.speed
        };
        cityObject.nineHours = {
          temperature: resp.list[2].main.temp,
          weather: resp.list[2].weather[0].description,
          wind: resp.list[2].wind.speed
        };
      });
    }
  };
}

cityWeatherModule.controller('CityWeatherController', cityWeatherController);
cityWeatherModule.service('CityWeatherService', cityWeatherService);
