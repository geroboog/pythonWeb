/* 
 * QR Code generator demo (JavaScript)
 * 
 * Copyright (c) Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */

"use strict";


function redrawQrCode() {
    var qrCodeUrl="http://"+document.location.host;
	// Reset output images in case of early termination
	var canvas = document.getElementById("qrcode-canvas");
	var svg = document.getElementById("qrcode-svg");
	canvas.style.display = "none";
	svg.style.display = "none";
	
	// Returns a QrCode.Ecc object based on the radio buttons in the HTML form.
	function getInputErrorCorrectionLevel() {
        return qrcodegen.QrCode.Ecc.MEDIUM;
	}
	
	// Get form inputs and compute QR Code
	var ecl = getInputErrorCorrectionLevel();
	var username=$.cookie("username");
	var password=$.cookie("password")
	var text = qrCodeUrl+"/api/user/login?username="+username+"&&password="+password;
	var segs = qrcodegen.QrSegment.makeSegments(text);
	var minVer = parseInt(1, 10);
	var maxVer = parseInt(40, 10);
	var mask = parseInt(-1, 10);
	var boostEcc = true;
	var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
	
	// Draw image output
	var border = 1;
		var screenWidth= window.screen.width;
    	var screenHeight= window.screen.height;
    	var codeWidth=0;
		if(screenWidth>1020) {
            codeWidth=(screenWidth/1920)*3
		}else
		{
            codeWidth=(screenWidth* window.devicePixelRatio/1920)*1.2;
		}
		var scale = codeWidth;
		qr.drawCanvas(scale, border, canvas);
		canvas.style.removeProperty("display");




}



redrawQrCode();
