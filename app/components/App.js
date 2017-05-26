import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import MainView from './MainView';

// TODO: get this data from a API
var blocks = [
  {
    "title": "First Block",
    "images": [
      "example-work01.jpg",
      "example-work02.jpg",
      "example-work03.jpg",
      "example-work04.jpg"
    ]
  },
  {
    "title": "Second Block",
    "images": [
      "example-work05.jpg",
      "example-work06.jpg",
      "example-work07.jpg",
      "example-work08.jpg"
    ]
  },
  {
    "title": "Third Block",
    "images": [
      "example-work09.jpg"
    ]
  }
];

var BlockModel = Backbone.Model.extend({
  defaults: {
    title: "",
    images: []
  }
});

var BlockCollection = Backbone.Collection.extend({
  model: BlockModel
});

/*
var BlockCollection = Backbone.Collection.extend({
  model: BlockModel,
  url: '/apifake/blocks.json',
  parse: function (response) {
    // console.log(response);
    return response;
  }
});


var getBlocks = new BlockCollection;
getBlocks.fetch({
  success: function (collection, response) {
    // console.log(response);
  }
})
*/

export default Marionette.Application.extend({
  region: '#app',

  onStart() {
    this.showView(new MainView({ collection: new BlockCollection(blocks) }));
  }
});
