require([
  'esri/arcgis/utils'
], function (arcgisUtils) {

  var webmapId = '2f5dc964df1c478e806beb2f59946363',
      mapDeferred,
      options,
      webmap;

  options = {
    mapOptions: {
      logo: false,
      minZoom: 9,
      sliderPosition: 'top-right'
    }
  };

  mapDeferred = arcgisUtils.createMap(webmapId, 'map', options);
  mapDeferred.then(function (response) {
    webmap = response.map;
  });

});
