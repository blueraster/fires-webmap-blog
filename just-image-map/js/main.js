require([
      "esri/map",
      "esri/dijit/LayerSwipe",
      "esri/arcgis/utils",
      "dojo/_base/array",
      "esri/dijit/Bookmarks",
      "esri/geometry/Extent",
], function (map,LayerSwipe,arcgisUtils,array,Bookmarks,Extent) {

  var webmapId = 'f075670a236546bba9bf22cd11dd4e07',
      mapDeferred,
      options,
      webmap,
      bookmarks,
      bookmark_list;
      

  options = {
    mapOptions: {
      logo: false,
      sliderPosition:"top-right",
      extent:new Extent({"type":"extent","xmin":11325950.484910764,"ymin":-15170.784314199473,"xmax":11327714.50820401,"ymax":-14143.66174670413,"spatialReference":{"wkid":102100,"latestWkid":3857}})
    }
  };

  mapDeferred = arcgisUtils.createMap(webmapId, 'map', options);
  mapDeferred.then(function (response) {
    webmap = response.map;
    bookmarks_list = response.itemInfo.itemData.bookmarks;
    image_extent = new Extent(bookmarks_list[1].extent);
    console.log(JSON.stringify(image_extent));
    //webmap.setExtent(image_extent);


    webmap.disableMapNavigation();


    var title = "WV03";
        
        //loop through all the operational layers in the web map 
        //to find the one with the specified title;
        var layers = response.itemInfo.itemData.operationalLayers;
        array.some(layers, function(layer){
          console.log(layer);
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
