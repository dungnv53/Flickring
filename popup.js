// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
// var QUERY = 'nam_ji_hyun';
// Tuy theo key_word muon search
var QUERY = 'suzy';

var kittenGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
   /*
  searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=8441b9e02088b4adf5da163c840c6554&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=32',
      */

  searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=8441b9e02088b4adf5da163c840c6554&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=0&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=64',
  // searchOnFlickr_2: 'https://api.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=425c152e185662ffdf62ee7ef081c931&user_id=58013055%40N05&per_page=30&format=rest&auth_token=72157649406355470-72e5b8af0aacc09e&api_sig=f70d190bba8b02b95c623fb3ba34f444',
  searchOnFlickr_3: 'https://api.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=425c152e185662ffdf62ee7ef081c931&user_id=58013055%40N05&per_page=124&format=rest&auth_token=72157649406355470-72e5b8af0aacc09e&api_sig=9b0c96421000f8fddd1e533ca3dc7b18',
  searchOnFlickr_3k: 'https://api.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=0c9ed249fe9b21cad9ff2671e55ed5f9&user_id=58013055%40N05&per_page=3000&format=rest&auth_token=72157649821504785-002ec82f606a7f76&api_sig=54f7dbc3594fd6663d837df2986bdeba',

  // api_sig no hash ca per_page vao nen ko doi duoc per_page NEU ko co API_SIG 
  // ca token cung khac, --> lieu copy sang chrome PC khac con run ko ?

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_3k, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var kittens = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < kittens.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructKittenURL_(kittens[i]);
      img.setAttribute('alt', kittens[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  constructKittenURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  kittenGenerator.requestKittens();
});
