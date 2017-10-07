// Using MVVM Framework, Google Maps API, Knockout JS
// and third-party API.
// The View is the HTML file.

function Landmarks(data, position) {
	this.name = data.name;
	this.latlngLoc = data.latlngLoc;
	this.marker = new google.maps.Marker({
		position: data.latlngLoc,
		map: googleMap,
		title: data.name,
		animation: google.maps.Animation.DROP
	});
	this.position = position;
	// this.setVisible = null;

	// Onclick event to bounce markers and populate info window
	this.marker.addListener('click', function(){
		populateInfoWindow(this);
		toggleBounce(this);
		bounceTimer(this);
		// loadFlickr(this.title);
		// console.log(this);
	});
}

function populateInfoWindow(marker) {
	// console.log('populateInfoWindow');
	if (infoWindow.marker != marker) {
		infoWindow.setContent('<div>' + marker.title + '</div>');
		infoWindow.open(googleMap, marker);
		// Make sure the marker property is cleared if window is closed
		infoWindow.addListener('closeclick', function() {
			infoWindow.marker = null;
		});
	}
	//console.log(markers);
}

function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

function bounceTimer (marker) {
	setInterval(function() {
		marker.setAnimation(null);
	}, 1400);
}

// function loadFlickr (landmarks) {
// 	var $flickrElem = $('#flickr-images');

// 	// this.landmarkPictures = ko.observableArray([]);

// 	// Clear out old data before new request
// 	$flickrElem.text('');
// 	landmarkPictures([]);

// 	var key = '88e693240daad97978bc4d93c370fd18';
// 	var secret = '78ab07255ac49f98';

// 	var flickrRequestTimeout = setInterval(function() {
// 		$flickrElem.text('Failed to load Flickr Images');
// 	}, 9000);

// 	var flickrURl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&text=' + location + '&format=json&nojsoncallback=1';

// 	$.getJSON(flickrURl, function (data) {
// 		console.log(data);
// 		var images = data.photos.photo;
// 		for (var i = 0; i < images.length; i++) {
// 			var farmID = images[i].farm;
// 			var serverID = images[i].server;
// 			var id = images[i].id;
// 			var secret = images[i].secret;
// 			var url = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id + '_' + secret+ '.jpg';
// 			landmarkPictures.push(url);
// 			// console.log('add Images');
// 		}
// 	}).fail(function() {
// 		clearTimeout(flickrRequestTimeout);
// 	});
// } 

var ViewModel = function(map, landmarks) {
	var self = this;

	this.googleMap = map;
	this.markers = [];
	this.landmarkList = ko.observableArray([]);

	// Adds Landmark site names to list in DOM
	landmarks.forEach(function(lmarks, position) {
		self.landmarkList.push(new Landmarks(lmarks, position));
	});
	// console.log(landmarks);

	this.landmarkPictures = ko.observableArray([]);
	 	// self.landmarkPictures(loadFlickr());	
	
	this.loadFlickr = function(location) {
		var $flickrElem = $('#flickr-images');

		// Clear out old data before new request
		$flickrElem.text('');
	 self.landmarkPictures([]);

	var key = '88e693240daad97978bc4d93c370fd18';
	var secret = '78ab07255ac49f98';

	var flickrRequestTimeout = setInterval(function() {
		$flickrElem.text('Failed to load Flickr Images');
	}, 9000);

	var flickrURl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&text=' + location + '&format=json&nojsoncallback=1';

		$.getJSON(flickrURl, function (data) {
			console.log(data);
			var images = data.photos.photo;
			for (var i = 0; i < images.length; i++) {
				var farmID = images[i].farm;
				var serverID = images[i].server;
				var id = images[i].id;
				var secret = images[i].secret;
				var url = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id + '_' + secret+ '.jpg';
				self.landmarkPictures.push(url);
				console.log('add Images');
			}
		}).fail(function() {
			clearTimeout(flickrRequestTimeout);
		});
	};

	this.listClick = function(clickedLandmark) {
		// console.log(clickedLandmark);
		map.setCenter(clickedLandmark.latlngLoc);
		populateInfoWindow(clickedLandmark.marker);
		toggleBounce(clickedLandmark.marker);
		bounceTimer(clickedLandmark.marker);
		self.loadFlickr(clickedLandmark.name);
	};

	// Knockout Observable for Filtering
	this.filteredText = ko.observable('');

	// Adds Filtering Functionality
	this.filteredLandmark = ko.computed(function() {
		var filter = self.filteredText().toLowerCase();
			return ko.utils.arrayFilter(self.landmarkList(), function(filteredMarker) {
				// console.log(filteredMarker);
				var match = filteredMarker.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
				filteredMarker.marker.setVisible(match);
				return match;
			});
	});
};

function initMap() {
	//Constructor creates a new map.
	googleMap = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 30.2793, lng: -97.7431},
		zoom: 12,
		styles: styles
	});

	infoWindow = new google.maps.InfoWindow();

	viewModel = new ViewModel(googleMap, landmarks);
	//Makes it go.
	ko.applyBindings(viewModel);
}

function loadError() {
	alert('An error ocurred during page load. Please try again later');
}
