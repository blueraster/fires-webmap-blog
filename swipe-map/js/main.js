require([
      "esri/map",
      "esri/dijit/LayerSwipe",
      "esri/arcgis/utils",
      "dojo/_base/array",
      "esri/dijit/Bookmarks",
], function (map,LayerSwipe,arcgisUtils,array,Bookmarks) {

  var webmapId = 'f075670a236546bba9bf22cd11dd4e07',
      mapDeferred,
      options,
      webmap,
      bookmarks,
      bookmark_list;

  options = {
    mapOptions: {
      logo: false,
      sliderPosition:"top-right"
    }
  };

  mapDeferred = arcgisUtils.createMap(webmapId, 'map', options);
  mapDeferred.then(function (response) {
    webmap = response.map;
    bookmarks_list = response.itemInfo.itemData.bookmarks;



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
        // bookmarks = new Bookmarks({
        //   map: webmap, 
        //   bookmarks: bookmarks_list
        // }, 'bookmarks'); 




  });

});
