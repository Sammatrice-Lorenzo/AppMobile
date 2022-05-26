import $ from 'dom7';
import Framework7 from 'framework7/bundle';

// Import F7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';


// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';
//Import list
import list from './list.js';

// Import main app component
import App from '../app.f7';
import { find } from 'dom7';
// Copy of scipt from Chris Ferdinandi https://jsfiddle.net/4rw75dqz/

// Show an element
var show = function (elem) {

	// Get the natural height of the element
	var getHeight = function () {
		elem.style.display = 'block'; // Make it visible
		var height = elem.scrollHeight + 'px'; // Get it's height
		elem.style.display = ''; //  Hide it again
		return height;
	};

	var height = getHeight(); // Get the natural height
	elem.classList.add('is-visible'); // Make the element visible
	elem.style.height = height; // Update the max-height

	// Once the transition is complete, remove the inline max-height so the content can scale responsively
	window.setTimeout(function () {
		elem.style.height = '';
	}, 350);

};

// Hide an element
var hide = function (elem) {

	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';

	// Set the height back to 0
	window.setTimeout(function () {
		elem.style.height = '0';
	}, 1);

	// When the transition is complete, hide it
	window.setTimeout(function () {
		elem.classList.remove('is-visible');
	}, 350);

};

// Toggle element visibility
var toggle = function (elem, timing) {

	// If the element is visible, hide it
	if (elem.classList.contains('is-visible')) {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);
	
};

// Listen for click events
document.addEventListener('click', function (event) {

	// Make sure clicked element is our toggle
	if (!event.target.classList.contains('toggle')) return;

	// Prevent default link behavior
	event.preventDefault();

	// Get the content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Toggle the content
	toggle(content);

}, false);

var app = new Framework7({
    name: 'DemoSTS', // App name
    theme: 'auto', // Automatic theme detection
    el: '#app', // App root element
    component: App, // App main component

    // App store
    store: store,
    list: list,
    // App routes
    routes: routes,
    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV ==='production' ? {
        path: '/service-worker.js',
    } : {},

});
app.request.get('http://localhost/licence/API_TodoList/list.php').then(function (res) {
    var response = JSON.parse(res.data)
    for(const i of response) {
		$('.divListes').append(`
			<p class="nomListe"><a class="" href="">${i.name}</a></p>
			<div class="liste liste-${i.id}">
				
			</div>
		`);
    }

	
}).catch(function (err) {
    console.log(err.xhr)
    console.log(err.status)
    console.log(err.message)
})

app.request.get('http://localhost/licence/API_TodoList/tache.php').then(function (res) {
    var response = JSON.parse(res.data)
    for(const i of response) {
		$('.liste-'+i.idlist).append(`
			<div class="tache tache-${i.id}">
				<p>${i.name}</p>
			</div>

		`);
    }

	
}).catch(function (err) {
    console.log(err.xhr)
    console.log(err.status)
    console.log(err.message)
})
showTachesTypesParents();

function showTachesTypesParents() {

app.request.get('http://localhost/licence/API_TodoList/tache.php').then(function (res) {
    var response = JSON.parse(res.data)
    for(const i of response) {
		
		app.request.get('http://localhost/licence/API_TodoList/tacheParent.php?idType='+i.id).then(function (res2) {
		var response2 = JSON.parse(res2.data)
		for(const j of response2) {
			$('.tache-'+i.id).append(`
				<p>${j.name} -></p>
			`);

		}	
		}).catch(function (err) {
			console.log(err.xhr)
			console.log(err.status)
			console.log(err.message)
		})
    }

	
}).catch(function (err) {
    console.log(err.xhr)
    console.log(err.status)
    console.log(err.message)
})

}

setTimeout(function(){
    showTachesTypes();
}, 500);

function showTachesTypes() {

	app.request.get('http://localhost/licence/API_TodoList/tacheType.php').then(function (res) {
    var response = JSON.parse(res.data)
    for(const i of response) {
		$('.tache-'+i.id).append(`
			<p>${i.name}</p>
		`);
    }

	
}).catch(function (err) {
    console.log(err.xhr)
    console.log(err.status)
    console.log(err.message)
})


}