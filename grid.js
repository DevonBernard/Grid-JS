function RGBtoHSV (rgb) {
  var h, s, Rdx, Gdx, Bdx,
    R = rgb[0] / 255,
    G = rgb[1] / 255,
    B = rgb[2] / 255,
    v = Math.max(R, G, B),
    diff = v - Math.min(R, G, B),
    delta = function(c){
      return (v - c) / 6 / diff + 1 / 2;
    };

    if (diff === 0) {
      h = s = 0;
    } else {
      s = diff / v;
      Rdx = delta(R);
      Gdx = delta(G);
      Bdx = delta(B);

      if (R === v) {
        h = Bdx - Gdx;
      }else if (G === v) {
        h = (1 / 3) + Rdx - Bdx;
      }else if (B === v) {
        h = (2 / 3) + Gdx - Rdx;
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
  var r, g, b,
      RGB = {r:0, g:0, b:0};
  var RGB = new Array();
  if(s===0){
    RGB.r = RGB.g = RGB.b = Math.round(v*255);
  }else{
    var h6 = h * 6;
    if (h6 === 6) h6 = 0;

    var H = Math.floor( h6 );
    var v1 = v*(1-s);
    var v2 = v*(1-s*(h6-H));
    var v3 = v*(1-s*(1-(h6-H)));

    switch(H){
      case 0:
        RGB = {
          r: v,
          g: v3,
          b: v1
        };
        break;
      case 1:
        RGB = {
          r: v2,
          g: v,
          b: v1
        };
        break;
      case 2:
        RGB = {
          r: v1,
          g: v,
          b: v3
        };
        break;
      case 3:
        RGB = {
          r: v1,
          g: v2,
          b: v 
        };
        break;
      case 4:
        RGB = {
          r: v3,
          g: v1,
          b: v
        };
        break;
      default:
        RGB = {
          r: v,
          g: v1,
          b: v2
        };
    }

  } 
  return {
    r: Math.round(RGB.r * 255),
    g: Math.round(RGB.g * 255),
    b: Math.round(RGB.b * 255)
  };
}

function setPixel(imageData, x, y, RGB, a) {
    if(x < imageData.width){
      index = (x + y * imageData.width) * 4;
      imageData.data[index+0] = RGB.r;
      imageData.data[index+1] = RGB.g;
      imageData.data[index+2] = RGB.b;
      imageData.data[index+3] = a;
    }
}

function setBox(imageData, x, y, size, RGB, a) {
  for(i = x; i < x+size; i++){
    for(i2 = y; i2 < y+size; i2++){
      setPixel(imageData, i, i2, RGB, a);
    }
  }
}

function fixedMonochromeGrid(options){
  element = document.getElementById(options.id);
  element.width = options.width;
  element.height = options.height;
  element.style.backgroundColor = "rgba("+options.backgroundColor[0]+", "+options.backgroundColor[1]+", "+options.backgroundColor[2]+", 1)";
  c = element.getContext("2d");

  imageData = c.createImageData(options.width, options.height);

  for(x = 0; x < options.width; x+=options.tileSize+options.gap){
    for(y = 0; y < options.height; y+=options.tileSize+options.gap){
    
        a = Math.random() * (options.alphaRange[0] - options.alphaRange[1])+options.alphaRange[1];
        l =( Math.random() * (options.lightRange[0] - options.lightRange[1])+options.lightRange[1])/100;
        var HSV = RGBtoHSV(options.rgb);
        var RGB = HSVtoRGB(HSV.h, HSV.s, HSV.v+l);
        setBox(imageData, x, y, options.tileSize, RGB, a); // 255 opaque
    }
  }

  c.putImageData(imageData, 0, 0); // at coords 0,0 
}

function fixedPolychromeGrid(options){
  element = document.getElementById(options.id);
  element.width = options.width;
  element.height = options.height;
  element.style.backgroundColor = "rgba("+options.backgroundColor[0]+", "+options.backgroundColor[1]+", "+options.backgroundColor[2]+", 1)";
  c = element.getContext("2d");

  imageData = c.createImageData(options.width, options.height);

  for(x = 0; x < options.width; x+=options.tileSize+options.gap){
    for(y = 0; y < options.height; y+=options.tileSize+options.gap){
        var RGB = [
          Math.random() * (options.rgb.r[0] - options.rgb.r[1])+options.rgb.r[1],
          Math.random() * (options.rgb.g[0] - options.rgb.g[1])+options.rgb.g[1],
          Math.random() * (options.rgb.b[0] - options.rgb.b[1])+options.rgb.b[1]
        ];
        a = Math.random() * (options.alphaRange[0] - options.alphaRange[1])+options.alphaRange[1];
        l =( Math.random() * (options.lightRange[0] - options.lightRange[1])+options.lightRange[1])/100;
        var HSV = RGBtoHSV(RGB);
        RGB = HSVtoRGB(HSV.h, HSV.s, HSV.v+l);
        setBox(imageData, x, y, options.tileSize, RGB, a); // 255 opaque
    }
  }

  c.putImageData(imageData, 0, 0); // at coords 0,0 
}