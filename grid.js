function RGBtoHSV () {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: h,
        s: s,
        v: v
    };
}

function HSVtoRGB(h,s,v) {
// Adapted from http://www.easyrgb.com/math.html
// hsv values = 0 - 1, rgb values = 0 - 255
var r, g, b;
var RGB = new Array();
if(s==0){
  RGB['red']=RGB['green']=RGB['blue']=Math.round(v*255);
}else{
  // h must be < 1
  var var_h = h * 6;
  if (var_h==6) var_h = 0;
  //Or ... var_i = floor( var_h )
  var var_i = Math.floor( var_h );
  var var_1 = v*(1-s);
  var var_2 = v*(1-s*(var_h-var_i));
  var var_3 = v*(1-s*(1-(var_h-var_i)));
  if(var_i==0){ 
    var_r = v; 
    var_g = var_3; 
    var_b = var_1;
  }else if(var_i==1){ 
    var_r = var_2;
    var_g = v;
    var_b = var_1;
  }else if(var_i==2){
    var_r = var_1;
    var_g = v;
    var_b = var_3
  }else if(var_i==3){
    var_r = var_1;
    var_g = var_2;
    var_b = v;
  }else if (var_i==4){
    var_r = var_3;
    var_g = var_1;
    var_b = v;
  }else{ 
    var_r = v;
    var_g = var_1;
    var_b = var_2
  }
  //rgb results = 0 ÷ 255  
  return {
    r: Math.round(var_r * 255),
    g: Math.round(var_g * 255),
    b: Math.round(var_b * 255)
  };
  } 
}

function setPixel(imageData, x, y, r, g, b, a) {
    if(x < imageData.width){
      index = (x + y * imageData.width) * 4;
      imageData.data[index+0] = r;
      imageData.data[index+1] = g;
      imageData.data[index+2] = b;
      imageData.data[index+3] = a;
    }
}
function isUnset(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    if(imageData.data[index+0] == 255 && imageData.data[index+1] == 255 && imageData.data[index+2] == 255 && imageData.data[index+3] == 255){
      return true;
    }else{
      return false;
    }
}
function setBox(imageData, x, y, w, h, r, g, b, a) {
  for(i = x; i < x+w; i++){
    for(i2 = y; i2 < y+h; i2++){
      setPixel(imageData, i, i2, r, g, b, a);
    }
  }
}
function fixedGrid(name, width, height, tileSize, rR, gR, bR, aR){
  element = document.getElementById(name);
  element.width = width;
  element.height = height;
  c = element.getContext("2d");

  imageData = c.createImageData(width, height);
  if(isUnset(imageData, 0, 0)){
    alert("YES");
  }
  for(x = 0; x < width; x+=tileSize){
    for(y = 0; y < height; y+=tileSize){
        r = Math.random() * rR[0] | rR[1];
        g = Math.random() * gR[0] | gR[1];
        b = Math.random() * bR[0] | bR[1];
        a = Math.random() * aR[0] | aR[1];
        setBox(imageData, x, y, tileSize, tileSize, r, g, b, a); // 255 opaque
    }
  }

  c.putImageData(imageData, 0, 0); // at coords 0,0 
}

function fixedSimilarGrid(name, width, height, tileSize, r, g, b, aR, lR){
  element = document.getElementById(name);
  element.width = width;
  element.height = height;
  element.style.backgroundColor = "rgba(29, 155, 110, 1)";
  c = element.getContext("2d");

  imageData = c.createImageData(width, height);
  if(isUnset(imageData, 0, 0)){
    alert("YES");
  }
  for(x = 0; x < width; x+=tileSize+2){
    for(y = 0; y < height; y+=tileSize+2){
    
        a = Math.random() * (aR[0] - aR[1])+aR[1];
        
        l =( Math.random() * (lR[0] - lR[1])+lR[1])/100;
        var HSV = RGBtoHSV(r,g,b);
      var RGB = HSVtoRGB(HSV.h, HSV.s, HSV.v+l);
        setBox(imageData, x, y, tileSize, tileSize, RGB.r, RGB.g, RGB.b, a); // 255 opaque
    }
  }

  c.putImageData(imageData, 0, 0); // at coords 0,0 
}