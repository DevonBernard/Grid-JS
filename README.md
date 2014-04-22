## Description
A JavaScript library to help anyone easily generate tiled images. With many customizations Grid-JS allows you to make the perfect backgrounds and images for any project.

## Usage
To generate a constant sized tile canvas with a fixed color (only tile shading changes) use:
```
<script type="text/javascript">
	var options = {
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
	fixedSimilarGrid(options);
</script>
```

## Demo
A live demo of this library can be found at: http://dbcoding.com/Grid-JS

## Contributors
Devon Bernard
* dwbcoding@gmail.com
* [LinkedIn](https://www.linkedin.com/in/devonbernard)
* [@DBCoding](https://www.twitter.com/DBCoding)