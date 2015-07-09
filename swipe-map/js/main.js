require([
      "esri/map",
      "esri/dijit/LayerSwipe",
      "esri/arcgis/utils",
      "dojo/_base/array",
], function (map,LayerSwipe,arcgisUtils,array) {

  var webmapId = '2f5dc964df1c478e806beb2f59946363',
      mapDeferred,
      options,
      webmap;

  options = {
    mapOptions: {
      logo: false
    }
  };

  mapDeferred = arcgisUtils.createMap(webmapId, 'map', options);
  mapDeferred.then(function (response) {
    webmap = response.map;
    //webmap.disableMapNavigation();


    var title = "WV03";
        
        //loop through all the operational layers in the web map 
        //to find the one with the specified title;
        var layers = response.itemInfo.itemData.operationalLayers;
        array.some(layers, function(layer){
          if(layer.title === title){
            id = layer.id;
            if(layer.featureCollection && layer.featureCollection.layers.length){
              id = layer.featureCollection.layers[0].id;
            }
            return true;  
          }else{
            return false;
          }
        });
        //get the layer from the map using the id and set it as the swipe layer. 
        if(id){
          var swipeLayer = webmap.getLayer(id);
          var swipeWidget = new LayerSwipe({
            type: "vertical",  //Try switching to "scope" or "horizontal"
            map: webmap,
            layers: [swipeLayer]
          }, "swipeDiv");
          swipeWidget.startup();
        }




  });

});
