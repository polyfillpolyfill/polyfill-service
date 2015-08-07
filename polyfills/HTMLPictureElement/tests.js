var pf = picturefill._;

it('picturefill: Picture fill is loaded and has its API ready', function () {
	expect(window.picturefill).to.be.ok();
	expect(window.picturefill._).to.be.ok();
	expect(window.picturefill._.fillImg).to.be.ok();
	expect(window.picturefill._.fillImgs).to.be.ok();
	expect(window.picturefill._.observer).to.be.ok();
	expect(window.picturefill._.observer.start).to.be.ok();
	expect(window.picturefill._.observer.stop).to.be.ok();
	expect(window.picturefill._.observer.disconnect).to.be.ok();
	expect(window.picturefill._.observer.observe).to.be.ok();
});

// test( "picturefill: Picture fill is loaded and has its API ready", function() {
// 			ok( window.picturefill );

// 			ok( window.picturefill._ );

// 			ok( window.picturefill._.fillImg );

// 			ok( window.picturefill._.fillImgs );

// 			ok( window.picturefill._.observer );

// 			ok( window.picturefill._.observer.start );

// 			ok( window.picturefill._.observer.stop );

// 			ok( window.picturefill._.observer.disconnect );

// 			ok( window.picturefill._.observer.observe );

// 		});