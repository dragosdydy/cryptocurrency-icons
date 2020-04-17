let dataIcons = require("../manifest.json");


document.addEventListener("DOMContentLoaded", function(event) {
	let searchResults = dataIcons;

	let createSet = (icon, destination) => {
		return new Promise((resolve, reject) => {
			let parentElement = document.getElementById(destination);
			let childElement = document.createElement('div');
			childElement.setAttribute('class', 'column is-2');
		  	let appendChildElement = parentElement.appendChild(childElement)
		  	appendChildElement.innerHTML = `
		  	<div class="box icon-container" id="open-icon" data-icon='${JSON.stringify(icon)}'>
		  		<div class="icon-image">
		  			<img alt=${icon.symbol} class="lazy" data-src="svg/black/${icon.symbol.toLowerCase()}.svg" />
		  		</div>
		  		<div class="icon-text">
		  			<span class="has-text-weight-bold is-size-6">${icon.name}</span>
		  			<span class="has-text-weight-normal is-size-7">${icon.symbol}</span>
		  		</div>
		  	</div>
		  	`;

		  	resolve(icon);
	  	});
	}

	let search = (e) => {
		let parentElement = document.getElementById('icons');
		parentElement.innerHTML = '';
		searchResults = _.filter(dataIcons, function(item) {
		     return item.symbol.toLowerCase().includes(e.target.value.toLowerCase()) || item.name.toLowerCase().includes(e.target.value.toLowerCase());
		});
		console.log(searchResults);

		// searchResults.forEach((icon) => createSet(icon, 'icons'))
		createIcons().then(() => {
			initLazyLoading();
		})

	}


	const source = document.getElementById('search');
	source.addEventListener('input', search);


		
// searchResults.forEach((icon) => createSet(icon, 'icons'))


const createIcons = async () => {
  for (const icon of searchResults) {
   const result = await createSet(icon, 'icons');
  }
}
 
 
createIcons().then(() => {
  	initLazyLoading();
})

let initLazyLoading = () => {
	let lazyLoadInstance = new LazyLoad({
    	elements_selector: ".lazy"
	});
}



});

	//modal script

	let rootEl = document.documentElement;
	document.addEventListener('click',function(e){
	    if(e.target && e.target.id == 'open-icon'){
         	let target = document.querySelector('.modal');
         	let content = document.querySelector('.modal-content .box');
         	console.log('content', content)
         	let icon = JSON.parse(e.target.getAttribute('data-icon'));
         	console.log('target', e.target);
            rootEl.classList.add('is-clipped');
            target.classList.add('is-active');

            content.innerHTML = `
            <table class="table is-fullwidth">
				<thead>
					<tr>
						<th class="is-size-5">${icon.symbol}</th>
						<th>color</th> 
						<th>black</th> 
						<th>icon</th> 
						<th class="is-variant-white">white</th>  
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>svg</th>
						<td><img src="svg/color/${icon.symbol}.svg" /></td>
						<td><img src="svg/black/${icon.symbol}.svg" /></td>
						<td><img src="svg/icon/${icon.symbol}.svg" /></td>
						<td class="is-variant-white"><img src="svg/white/${icon.symbol}.svg" /></td>
					</tr>
					<tr>
						<th>128px</th>
						<td><img src="128/color/${icon.symbol}.png" /></td>
						<td><img src="128/black/${icon.symbol}.png" /></td>
						<td><img src="128/icon/${icon.symbol}.png" /></td>
						<td class="is-variant-white"><img src="128/white/${icon.symbol}.png" /></td>
					</tr>
					<tr>
						<th>32px</th>
						<td><img src="32/color/${icon.symbol}.png" /></td>
						<td><img src="32/black/${icon.symbol}.png" /></td>
						<td><img src="32/icon/${icon.symbol}.png" /></td>
						<td class="is-variant-white"><img src="32/white/${icon.symbol}.png" /></td>
					</tr>
					<tr>
						<th>32px@2x</th>
						<td><img src="32@2x/color/${icon.symbol}@2x.png" /></td>
						<td><img src="32@2x/black/${icon.symbol}@2x.png" /></td>
						<td><img src="32@2x/icon/${icon.symbol}@2x.png" /></td>
						<td class="is-variant-white"><img src="32@2x/white/${icon.symbol}@2x.png" /></td>
					</tr>
				</tbody>
			</table>
            `;

            let allModals = getAll('.modal');
		    let modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');


		    if (modalCloses.length > 0) {
		        modalCloses.forEach(function (el) {
		            el.addEventListener('click', function () {
		                closeModals();
		            });
		        });
		    }
		    document.addEventListener('keydown', function (event) {
		        let e = event || window.event;
		        if (e.keyCode === 27) {
		            closeModals();
		        }
		    });

		    function closeModals() {
		        rootEl.classList.remove('is-clipped');
		        allModals.forEach(function (el) {
		            el.classList.remove('is-active');
		        });
		    }

		    // Functions

		    function getAll(selector) {
		        return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
		    }

	     }
	 });


	 
    
	

    

		