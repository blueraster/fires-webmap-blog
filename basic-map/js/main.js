require([
  'esri/arcgis/utils'
], function (arcgisUtils) {

  var webmapId = '2f5dc964df1c478e806beb2f59946363',
      mapDeferred,
      webmap;

  mapDeferred = arcgisUtils.createMap(webmapId, 'map');
  mapDeferred.then(function (response) {
    webmap = response.map;
  });

});
