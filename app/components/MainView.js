import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from 'templates/main';


import _ from 'underscore';

// INIT Vars
// TODO: add this vars to a config file
var numberOfBlocks = 0;
var currentBlock = 0;
var block;
var noImage = 'no-image.jpg';
var numberOfImagesPerBlock = 4;

export default Marionette.View.extend({

  initialize: function () {
    numberOfBlocks = this.collection.models.length;
    block = this.getBlock(0);
    // console.log(block);
    this.model = new Backbone.Model(block);
  },

  getBlock: function (number) {
    return this.ramdonImages(number, this.collection.models[number].attributes);
  },

  ramdonImages: function (number, block) {
    var getImages = _.shuffle(block.images);
    var newImages = [];
    for (var i = 0; i < numberOfImagesPerBlock; i++) {
      var tempImage = noImage;
      if (getImages[i]) {
        tempImage = getImages[i];
      }
      newImages.push(tempImage);
    }
    return {
      title: block.title,
      images: newImages,
      numberOfBlocks: this.collection.models.length,
      currentNumberOfBlock: number + 1
    };
  },

  events: {
    'click .left-button': 'changeBlock',
    'click .right-button': 'changeBlock'
  },

  changeBlock: function (event) {
    if (event && event.currentTarget && event.currentTarget.className) {

      var typeButton = event.currentTarget.className;

      if (typeButton === 'left-button') {
        currentBlock--;
      } else {
        currentBlock++;
      }

      // Control the current block
      if ((currentBlock + 1) > numberOfBlocks) {
        currentBlock--;
      }
      if (currentBlock < 0) {
        currentBlock = 0;
      }

      // We are in the last block
      if ((currentBlock + 1) === numberOfBlocks) {
        $('#right-button-container').hide();
      } else {
        $('#right-button-container').show();
      }

      // We are in the first block
      if (currentBlock === 0) {
        $('#left-button-container').hide();
      } else {
        $('#left-button-container').show();
      }

      block = this.getBlock(currentBlock);
      // this.model = new Backbone.Model(block);
      this.model.set(block);
      // console.log('set: '+this.model.get('title'));
    }
  },

  disableButton: function (type) {
    $('.jope').html(type);
  },

  modelEvents: {
    "change": "reloadBlock",
  },

  template: template,

  onDomRefresh: function () {
    if (currentBlock === 0) {
      $('#left-button-container').hide();
    }
    if ((currentBlock + 1) === numberOfBlocks) {
      $('#right-button-container').hide();
    }
  },

  reloadBlock: function () {
    this.render();
  }

});
