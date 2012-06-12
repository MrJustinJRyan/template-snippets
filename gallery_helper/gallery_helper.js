// Gallery Helper - 0.0.1
// anders.haig@wildfireapp.com
function gen_gallery(args) {
	var data_source 	= args.source || '';
	var output_format 	= args.format || 'grid';
	var target 			= document.getElementById(args.target) || 'gallery';
	var source_type		= '';
	var template, compiled_template, result;
	var data = { "images" : [] };

	// Determine source
	function getDomain(url) {
		return url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/)[2];
	}
	
	var source_domain = getDomain(data_source);
	
	console.log(source_domain);
	
	if (source_domain === 'api.flickr.com') {
		source_type = 'flickr';
	} else {
		source_type = 'unknown';
	}
	
	console.log(source_type);
	
	// Collect data
	function collectData(url, type) {
		if (type === 'flickr') {
			$.getJSON(data_source, function(response) {
				$.each(response.items, function(i, item) {
					var full_img = item.media.m.replace('_m', '_z');
					var img_obj = {"url": item.link, "src": item.media.m, "full": full_img};
					data.images.push(img_obj);
				});
				
				// console.log(data);
				compileTemplate(data);
			});
		} else {
			console.log('Unrecognized Source while Collecting Data');
		}
	}
	
	collectData(data_source, source_type);
	
	// Determine output format
	
	
	// Combine data and template
	function compileTemplate(data) {
		console.log(data);
		if (output_format === 'circle-grid') {
			template = '{{#images}}'
					 + '<li class="photo">'
					 + '{{#if this.url}}<a href="{{this.url}}">{{/if}}'
					 + '<div style="background-image:url({{this.src}});"></div>'
					 + '{{#if this.url}}</a>{{/if}}'
					 + '</li>'
					 + '{{/images}}';
		} else if (output_format === 'grid') {
			template = '{{#images}}'
					 + '<li class="photo">'
					 + '{{#if this.url}}<a href="{{this.url}}">{{/if}}'
					 + '<div style="background-image:url({{this.src}});"></div>'
					 + '{{#if this.url}}</a>{{/if}}'
					 + '</li>'
					 + '{{/images}}';
		} else if (output_format === 'slider') {
			template = '{{#images}}'
					 + '<li>'
					 + '{{#if this.url}}<a href="{{this.url}}">{{/if}}'
					 + '<img src="{{this.full}}">'
					 + '{{#if this.url}}</a>{{/if}}'
					 + '</li>'
					 + '{{/images}}';
		} else if (output_format === 'panels') {
			template = '<ol>'
					 + '{{#images}}'
					 + '<li>'
					 + '<h2><span>Image Name</span></h2>'
					 + '<div>'
					 + '{{#if this.url}}<a href="{{this.url}}">{{/if}}'
					 + '<img src="{{this.full}}">'
					 + '{{#if this.url}}</a>{{/if}}'
					 + '</div>'
					 + '</li>'
					 + '{{/images}}'
					 + '</ol>';
		} else {
			template = '{{#images}}'
					 + '<li class="photo">'
					 + '{{#if this.url}}<a href="{{this.url}}">{{/if}}'
					 + '<img src="{{this.src}}">'
					 + '{{#if this.url}}</a>{{/if}}'
					 + '</li>'
					 + '{{/images}}';
		}
	
		compiled_template = Handlebars.compile(template);
	
		result = compiled_template(data);
		generateGallery(result);
	}

	// Append HTML and any setup as necessary
	function generateGallery(html) {
		target.classList.add(output_format);
		target.innerHTML = html;

		// Trigger completed event - TODO: No jQuery
		$(document).trigger('gen_gallery_complete');
	}
}

// Examples:
// Output
/*
gen_gallery({
	source: 'http://flickr.com/randomjunk?included=true',
	format: 'slider',
	target: 'wrapper'
});
*/