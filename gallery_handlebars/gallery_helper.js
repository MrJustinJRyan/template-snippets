// Gallery Templater - 0.0.1
// anders.haig@wildfireapp.com

function gen_gallery(args) {
	// Set Args
	var source = args.source || '',
	//var source = document.getElementById(args.source) || '',
		template = args.template || '{{#images}}<li><img src="{{this.src}}"></li>{{/images}}',
		target = document.getElementById(args.target) || 'gallery',
		data = { "images" : [] },
		compiled_template,
		result;
	
	// Collect data
	function collectData(source) {
		// Get all data
		$('#' + source).children().each(function () {
			var url = $(this).find('.gbody').find('a').attr('href');
			var src = $(this).find('.gbody').find('img').attr('src');
			var title = $(this).find('.gtitle').html();
			var desc = $(this).find('.gdescription').html();

			var img_obj = {"url": url, "src": src, "title": title, "desc": desc};
			data.images.push(img_obj);
		});

		console.log(data);

		compileTemplate(data);
	}
	
	collectData(source);
	
	// Combine data and template
	function compileTemplate(data) {
		compiled_template = Handlebars.compile(template);
		result = compiled_template(data);
		generateGallery(result);
	}

	// Append HTML and any setup as necessary
	function generateGallery(html) {
		target.innerHTML = html;

		// Trigger completed event - ## TODO: No jQuery ##
		$(document).trigger('gen_gallery_complete');
	}
}