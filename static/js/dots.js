/**
 * menu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
oneHeight=0;
;( function( window ) {

	'use strict';

	function extend( a, b ) {
		for( var key in b ) {
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function DotNav( el, options ) {
		this.nav = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	DotNav.prototype.options = {};

	DotNav.prototype._init = function() {
		// special case "dotstyle-hop"
		var hop = this.nav.parentNode.className.indexOf( 'dotstyle-hop' ) !== -1;

		var dots = [].slice.call( this.nav.querySelectorAll( 'li' ) ), current = 0, self = this;

		dots.forEach( function( dot, idx ) {
			dot.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
					dots[ current ].className = '';

					// special case
					if( hop && idx < current ) {
						dot.className += ' current-from-right';
					}

					setTimeout( function() {
						dot.className += ' current';
						current = idx;
						if( typeof self.options.callback === 'function' ) {
                            self.options.callback(current);
                        }
                        $('#right_box_content').animate({ scrollTop: oneHeight*current*2 }, 100);
                    }, 25 );
			} );
		} );
	}

	// add to global namespace
	window.DotNav = DotNav;

})( window );

$('#right_box_content').scroll(function(event){
	var scrollTop =$('#right_box_content').scrollTop();
	var point=parseInt((scrollTop+100)/oneHeight);
	var dot=document.getElementById('nav'+point);
    var documentCurrents=document.getElementsByClassName('current');
    for(var i=0;i<documentCurrents.length;i++)
	{
        documentCurrents[i].className='';
	}
        dot.className = ' current';
});