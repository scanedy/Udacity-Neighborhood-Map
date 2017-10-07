// Google Maps Styles

var styles = [
	{ featureType: 'water',
		stylers: [{ color: '#19a0d8' }]},
   	{ featureType: 'administrative', elementType: 'labels.text.stroke',
        stylers: [{ color: '#ffffff' }, { weight: 6 }]},
    {featureType: 'administrative', elementType: 'labels.text.fill',
        stylers: [{ color: '#e85113' }]},
    {featureType: 'road.highway', elementType: 'geometry.stroke',
        stylers: [{ color: '#efe9e4' }, { lightness: -40 }]},
    {featureType: 'transit.station',
        stylers: [{ weight: 9 }, { hue: '#e85113' }]},
    {featureType: 'road.highway',elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]},
    {featureType: 'water', elementType: 'labels.text.stroke',
        stylers: [{ lightness: 100 }]},
    {featureType: 'water', elementType: 'labels.text.fill',
        stylers: [{ lightness: -100 }]},
    {featureType: 'poi', elementType: 'geometry',
        stylers: [{ visibility: 'on' }, { color: '#f0e4d3' }]},
    {featureType: 'road.highway', elementType: 'geometry.fill',
        stylers: [ { color: '#efe9e4' }, { lightness: -25 }]}
];

var googleMap;
var infoWindow;
var markers = [];
var landmarks = [
	{
		name: 'Texas State Capitol',
		latlngLoc: {lat: 30.2741853, lng: -97.7405401},
	},
	{
		name: 'University of Texas Tower',
		latlngLoc: {lat: 30.2861062, lng: -97.7393634},
	},
	{
		name: 'Mount Bonnell',
		latlngLoc: {lat: 30.3207616, lng: -97.77334019999999},
	},
	{
		name: 'Congress Avenue Bridge',
		latlngLoc: {lat: 30.2617381, lng: -97.74516319999999},
	},
	{
		name: 'Barton Springs',
		latlngLoc: {lat: 30.2660703, lng: -97.76913479999999},
	},
	{
		name: '360 Bridge / Pennybacker Bridge',
		latlngLoc: {lat: 30.3516437, lng: -97.79701449999999},
	},
	{
		name: 'Auditorium Shores',
		latlngLoc: {lat: 30.2627167, lng: -97.7515303},
	},
	{
		name: 'Zilker Park',
		latlngLoc: {lat: 30.2669624, lng: -97.77285930000001},
	}
];
