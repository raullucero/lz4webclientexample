function encodeBlock (evt) {
	var Buffer = require('buffer').Buffer
	var LZ4 = require('lz4')

  var files = evt.target.files;
  var file = files[0];
  var str = '';

  var reader = new FileReader();

    // Closure to capture the file information.
  reader.onload = (function(theFile) {
    return function(e) {
      str = e.target.result;
      var input = new Buffer(str)
    	var maxOutputSize = LZ4.encodeBound(input.length)
    	var output = new Buffer(maxOutputSize)

    	console.debug("maxOutputSize", maxOutputSize)
    	var startTime = Date.now()
    	var outputSize = LZ4.encodeBlock( input, output )
    	var endTime = Date.now()
    	console.log("encoded in " + (endTime-startTime) + "ms")
    	if (outputSize > 0) {
    		// Resize according to the compressed size
    		output = output.slice(0, outputSize)

    		console.debug("output", output)
    		var outputB64 = btoa( encodeURIComponent(output) )
    		document.getElementById('output').value = outputB64

    		document.getElementById('inputSize').innerHTML = "Size: " + str.length
    		document.getElementById('outputSize').innerHTML = "Buffer size: " + output.length + "<br> B64 size: " + outputB64.length
    	} else {
    		document.getElementById('output').value = str

    		document.getElementById('inputSize').innerHTML = "Size: " + str.length
    		document.getElementById('outputSize').innerHTML = "<b>not compressible</b>"
    	}
    };
  })(file)

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
}

document.getElementById('files').addEventListener('change', encodeBlock, false);
