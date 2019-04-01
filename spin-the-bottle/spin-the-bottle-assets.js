console.log('calling spin the bottle assets');
(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.bottle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6CBA8F").s().p("AgsgcIBZADIgBAyIhNAEg");
	this.shape.setTransform(57,-12.3,3.556,3.563);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6CBA8F").s().p("AgsgcIBZACIAAAzIhOAEg");
	this.shape_1.setTransform(16.8,-14.2,3.556,3.563);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#009245").s().p("AgjBCQgUgCgRgJQgVgLgIgUIiqgdIAAgvICrgCIAJgSQAGgIAPgDIAagCQAngDEVAXIgHCXg");
	this.shape_2.setTransform(0,-0.1,3.556,3.563);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1F604E").s().p("AgkBLQgWgCgSgKQgWgLgJgUIitgeIAAg/ICugCIAHgOQAHgKARgEIAfgDQApgDEUAWIAIABIgHCpgAgrhNIgXACQgOABgFAGIgJAWIioACIAAAfICnAcIACAFQAIARATAKQAOAIASACIEjATIAGiFQjrgUg6AAIgNAAg");
	this.shape_3.setTransform(0,0,3.556,3.563);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.bottle, new cjs.Rectangle(-100,-33.9,200,68), null);


// stage content:
(lib.spinthebottleassets = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// bottle
	this.instance = new lib.bottle();
	this.instance.parent = this;
	this.instance.setTransform(156.6,244.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(216.6,450.6,200,67.9);
// library properties:
lib.properties = {
	id: 'C10AF6F874E6874887F4BCA2F8A950E7',
	width: 320,
	height: 480,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C10AF6F874E6874887F4BCA2F8A950E7'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;