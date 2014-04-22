## Description
A JavaScript library to help anyone easily generate tiled images. With many customizations Grid-JS allows you to make the perfect backgrounds and images for any project.

## Usage
### Monochrome Fixed Tile Size
To generate a canvas with tiles of constant size and a fixed color (monochrome: color remains constant, only shading changes) use:
```
<canvas id="canvas"></canvas>
<script type="text/javascript" src="./grid.js"></script>
<script type="text/javascript">
	var monochromeOptions = {
		id: "canvas",
		width: 1600,
		height: 800,
		tileSize: 40,
		gap: 2,
		rgb: [50,233,180],
		alphaRange: [255, 250],
		lightRange: [20, -20],
		backgroundColor: [30, 210, 160]
	};
	fixedMonochromeGrid(monochromeOptions);
</script>
```
### Polychrome Fixed Tile Size
To generate a canvas with tiles of constant size and many different colors (polychrome) use:
```
<canvas id="canvas"></canvas>
<script type="text/javascript" src="./grid.js"></script>
<script type="text/javascript">
	var polychromeOptions = {
		id: "canvas",
		width: 1600,
		height: 800,
		tileSize: 40,
		gap: 2,
		rgb: {
			r: [255, 200],
			g: [150, 0],
			b: [150, 0]
		},
		alphaRange: [255, 250],
		lightRange: [20, -20],
		backgroundColor: [30, 30, 30]
	};	
	fixedPolychromeGrid(polychromeOptions);	
</script>
```

## Demo
A live demo of this library can be found at: http://dbcoding.com/Grid-JS

## Contributors
Devon Bernard
* dwbcoding@gmail.com
* [LinkedIn](https://www.linkedin.com/in/devonbernard)
* [@DBCoding](https://www.twitter.com/DBCoding)