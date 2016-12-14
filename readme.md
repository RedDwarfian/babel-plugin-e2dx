# babel-plugin-e2dx
JSX babel plugin that transforms JSX into e2d function calls for conveince and aesthetics.

# Usage Notes

## SVG Collision
Each element is targeted specifically so there are a minimal amount of collisions for developers who use `JSX` for `React` in the their projects.  The only collisions happen for `SVG` elements.

An example `.babelrc` file will look like this

```json
{
  "plugins": [
    ["e2dx", { "ignoreSVG": false }]
  ],
  "presets": ["es2015", "es2015-loose", "react"]
}
```

Ignoring SVG means that the `path`, `ellipse`, and `rect` elements will not be converted and must be called manually. For example:

```javascript
import e2d from 'e2d';

let strokeRect = [e2d.path(e2d.rect(width, height)), <stroke />];
```

## Syntactic Whitespace and JSXText

All syntactic whitespace and `JSXText` elements between declared elements is ignored and `babel` will mangle the function calls to make them harder to read when navigating and debugging e2d function calls.


# Elements

TODO: TOC

## Arc

To see how arcs are used, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc).

Named Parameter List:

- `x`: The x coordinate of the arc's center. (defaults to 0)
- `y`: The y coordinate of the arc's center. (defaults to 0)
- `r`: The arc's radius. (defaults to 1)
- `startAngle`: The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
- `endAngle`: The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
- `anticlockwise`: An optional Boolean which, if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.

It has four forms.

```javascript
<arc />
//e2d.arc(); an arc centered at [0, 0] with radius 0 with a full circle

<arc r={radius} />
//e2d.arc(radius); an arc centered at [0, 0] with radius "radius" with a full circle

<arc x={x} y={y} r={radius} />
//e2d.arc(x, y, radius); an arc centered at [x, y] with radius "radius" with a full circle

<arc x={x} y={y} r={radius}
  startAngle={startAngle} endAngle={endAngle} />
//e2d.arc(x, y, radius, startAngle, endAngle); an arc centered at [x, y] with radius "radius" from startAngle to endAngle

<arc x={x} y={y} r={radius}
  startAngle={startAngle} endAngle={endAngle}
  anticlockwise={true} />
//e2d.arc(x, y, radius, startAngle, endAngle, true); an arc centered at [x, y] with radius "radius" from startAngle to endAngle anticlockwise

```

## arcTo

To see how the arcTo function works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo).

Named Parameter List:

- `x1`: The x axis of the coordinate for the first control point.
- `y1`: The y axis of the coordinate for the first control point.
- `x2`: The x axis of the coordinate for the second control point.
- `y2`: The y axis of the coordinate for the second control point.
- `r`: The arc's radius.

It has one form:

```javascript
<arcTo x1={x1} y1={y1} x2={x2} y2={y2} r={radius} />
//e2d.arcTo(x1, y1, x2, y2, radius);
```

## beginClip

This element is provided by the API and used in the `e2d.clip` method.  It provides the bottom level instruction that `clip`s a canvas region, it is not recommended for manual use.  Please see the `<clip>` element on how to do clipping regions in canvas.

```javascript
<beginClip />
```

## beginPath

This element is provided by the API and used in the `e2d.path` method.  It provides the bottom level instruction that begins a canvas `path`, it is not recommended for manual use.  Please see the `<path>` element on how to use canvas paths.

```javascript
<beginPath />
```

## bezierCurveTo

To see how the bezierCurveTo function works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo).

Named Parameter List:

- `cp1x`: The x axis of the coordinate for the first control point.
- `cp1y`: The y axis of the coordinate for first control point.
- `cp2x`: The x axis of the coordinate for the second control point.
- `cp2y`: The y axis of the coordinate for the second control point.
- `x`: The x axis of the coordinate for the end point.
- `y`: The y axis of the coordinate for the end point.

It has one form and every parameter is required:

```javascript
<bezierCurveTo cp1x={cp1x} cp1y={cp1y} cp2x={cp2x} cp2y={cp2y}
  x={x} y={y} />
//e2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

## clearRect

This element clears a rectangle. To see how the `clearRect` function works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect).

Named Parameter List:

- `x`: The x axis of the coordinate for the rectangle starting point. (default value is 0)
- `y`: The y axis of the coordinate for the rectangle starting point. (default value is 0)
- `width`: The rectangle's width.
- `height`: The rectangle's height.

It has two forms, and only the width and height are required.

```javascript
//x and y are both 0
<clearRect width={width} height={height} />
//e2d.clearRect(width, height);

//x and y both must be set for this to work
<clearRect x={x} y={y} width={width} height={height} />
//e2d.clearRect(x, y, width, height);
```

## clip

To see how path clipping function works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip).

Please note that the `fillRule` parameter is not supported except in Firefox.  When a wider support is acheived for this feature it will be added to the 4.X.X branch.

Named Parameter List:

- `path`: A path to clip.

Note: Since paths are already supported by `e2d` as objects, it is unnecessary for `Path2D` support to exist. Do not use `Path2D` objects.

```javascript
<clip path={<rect width={100} height={100} />}>
  {children}
</clip>
```

## clipPath

This element is provided by the API and used in the `e2d.clip` method.  It provides the bottom level instruction that `clip`s a canvas region, it is not recommended for manual use.  Please see the `<clip>` element on how to do clipping regions in canvas.

```javascript
<clipPath />
```

## closePath

This element is provided by the API and used in the `e2d.path` method.  It provides the bottom level instruction that closes a canvas `path`, it is not recommended for manual use.  Please see the `<path>` element on how to use canvas paths.

```javascript
<closePath />
```

## createRegularPolygon

This is a conveince element for creating regular polygons.  The polygon is an array of `[x,y]` coordinates.

Named Parameter List:

- `radius`: The radius of the circle tangent to the polygon.
- `position`: The `[x, y]` point of center
- `sides`: The number of sides (should be at least 3)

```javascript
let polygon = <createRegularPolygon radius={radius} position={position} sides={sides} />;
```

## ellipse

This element is "polyfilled" for older browsers and for browsers that do not support ellipses. To see how ellipses work, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse).

Named Parameter List:

- `x`: The x axis of the coordinate for the ellipse's center. (defaults to `0`)
- `y`: The y axis of the coordinate for the ellipse's center.
- `radiusX`: The ellipse's major-axis radius. (required)
- `radiusY`: The ellipse's minor-axis radius. (required)
- `rotation`: The rotation for this ellipse, expressed in radians. (defaults to `0`)
- `startAngle`: The starting point, measured from the x axis, from which it will be drawn, expressed in radians. (defaults to `0`)
- `endAngle`: The end ellipse's angle to which it will be drawn, expressed in radians. (defaults to `Math.PI * 2`)
- `anticlockwise`: An Boolean which, if true, draws the ellipse anticlockwise (counter-clockwise), otherwise in a clockwise direction. (defaults to `false`)

It has five forms.

```javascript
<ellipse radiusX={radiusX} radiusY={radiusY} />
//e2d.ellipse(radiusX, radiusY);

<ellipse x={x} y={y}
  radiusX={radiusX} radiusY={radiusY} />
//e2d.ellipse(x, y, radiusX, radiusY);

<ellipse x={x} y={y}
  radiusX={radiusX} radiusY={radiusY}
  rotation={rotation} />
//e2d.ellipse(x, y, radiusX, radiusY, rotation);

<ellipse x={x} y={y}
  radiusX={radiusX} radiusY={radiusY}
  rotation={rotation}
  startAngle={startAngle} endAngle={endAngle} />
//e2d.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);

<ellipse x={x} y={y}
  radiusX={radiusX} radiusY={radiusY}
  rotation={rotation}
  startAngle={startAngle} endAngle={endAngle}
  anticlockwise={true} />
//e2d.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, true);

```

## fill

This element will fill the current `path` with the current `fillStyle`.  Do not forget to wrap each fill with the correct `fillStyle` element.  Please see `fillStyle` to learn how to use `fillStyle`s.  Also, visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill) for more information on how the `fill` function works.

```javascript
<fill />
//e2d.fill()
```

## fillArc

This element is provided for convenience to round out the API and mirror the functionality of `fillRect` using arcs. To see how arcs are used, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc).

Named Parameter List:

- `x`: The x coordinate of the arc's center. (defaults to 0)
- `y`: The y coordinate of the arc's center. (defaults to 0)
- `r`: The arc's radius. (defaults to 1)
- `startAngle`: The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
- `endAngle`: The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
- `anticlockwise`: An optional Boolean which, if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.

It has four forms.

```javascript
<fillArc />
//e2d.fillArc(); an arc centered at [0, 0] with radius 0 with a full circle

<fillArc r={radius} />
//e2d.fillArc(radius); an arc centered at [0, 0] with radius "radius" with a full circle

<fillArc x={x} y={y} r={radius} />
//e2d.fillArc(x, y, radius); an arc centered at [x, y] with radius "radius" with a full circle

<fillArc x={x} y={y} r={radius}
  startAngle={startAngle} endAngle={endAngle} />
//e2d.fillArc(x, y, radius, startAngle, endAngle); an arc centered at [x, y] with radius "radius" from startAngle to endAngle

<fillArc x={x} y={y} r={radius}
  startAngle={startAngle} endAngle={endAngle}
  anticlockwise={true} />
//e2d.fillArc(x, y, radius, startAngle, endAngle, true); an arc centered at [x, y] with radius "radius" from startAngle to endAngle anticlockwise

```

## fillRect

This element fills a rectangle. To see how the `fillRect` function works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect).

Named Parameter List:

- `x`: The x axis of the coordinate for the rectangle starting point. (default value is 0)
- `y`: The y axis of the coordinate for the rectangle starting point. (default value is 0)
- `width`: The rectangle's width.
- `height`: The rectangle's height.

It has two forms, and only the width and height are required.

```javascript
//x and y are both 0
<fillRect width={width} height={height} />
//e2d.fillRect(width, height);

//x and y both must be set for this to work
<fillRect x={x} y={y} width={width} height={height} />
//e2d.fillRect(x, y, width, height);
```

## fillStyle

This is a function that wraps the `fillStyle` property. To see how the `fillStyle` property works visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle).

```javascript
<fillStyle style={style}>
  {children}
</fillStyle>
//e2d.fillStyle(style, children);
```

## fillText

This element draws text to the canvas. Please see [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText) for more information on how this function works.

Named Paramter List:

- `text`: The text to render using the current `font`, `textAlign`, `textBaseline`, and `direction` values (see `fontStyle` for more infomation.)
- `x`: The x axis of the coordinate for the text starting point. (defaults to `0`)
- `y`: The y axis of the coordinate for the text starting point. (defaults to `0`)
- `maxWidth`: The maximum width to draw.  If specified, and the string is computed to be wider than this width, the font is adjusted to use a more horizontally condensed font (if one is available or if a reasonably readable one can be synthesized by scaling the current font horizontally) or a smaller font.

It has three forms.

```javascript
<fillText text="Hello World!" />
//e2d.fillText("Hello World!");

<fillText x={x} y={y} text="Hello World!" />
//e2d.fillText(x, y, "Hello World!");

<fillText x={x} y={y} text="Hello World!" maxWidth={maxWidth}/>
//e2d.fillText(x, y, "Hello World!", maxWidth);
```

## globalAlpha

This element sets the `globalAlpha` property to a value relative the current `globalAlpha` value. To see how `globalAlpha` works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha).

Named Paramter List:

- `alpha`: The alpha level relative to the current alpha level. This is caluclated by calling `ctx.globalAlpha * alpha`.

```javascript
<globalAlpha alpha={alpha}>
  {children}
</globalAlpha>
//e2d.globalAlpha(alpha, children);
```

## hitRect, hitRegion

The `hitRect` and `hitRegion` elements use polygon regions to designate mouse areas on the canvas.  Use `e2d.activeRegions(ctx)` to get the active mouse regions every frame after they have been rendered.

The `hitRect` element has two forms:

Named Parameter List:

- `id`: The string `id` for the region. Duplicates are not ignored, avoid duplicates.
- `x`: The x axis of the coordinate for the rectangle starting point. (default value is 0)
- `y`: The y axis of the coordinate for the rectangle starting point. (default value is 0)
- `width`: The rectangle's width.
- `height`: The rectangle's height.

```javascript
<hitRect id="id" width={width} height={height} />
//e2d.hitRect("id", width, height);

<hitRect id="id" x={x} y={y} width={width} height={height} />
//e2d.hitRect("id", x, y, width, height);
```

The `hitRegion` element has one form:

Named Parameter List:

- `id`: The string `id` for the region. Duplicates are not ignored, avoid duplicates.
- `region`: The `polygon` that specifies the region.

```javascript
<hitRegion id="id" region={region} />
//e2d.hitRegion("id", region);
```

Side note: This will not add `accessibility` regions to the canvas and this API may be deprecated if widespread support for the canvas method is provided by major browser.

## imageSmoothingEnabled

This element sets the `imageSmoothingEnabled` property to the specified value. To see how `imageSmoothingEnabled` works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled).

```javascript
<imageSmoothingEnabled value={value}>
  {children}
</imageSmoothingEnabled>
//e2d.imageSmoothingEnabled(value, children);
```

## lineStyle

This is a combination `element` that sets multiple properties on the canvas `context`.

Property List:

- `lineWidth`: This property of the Canvas 2D API sets the thickness of lines in space units. It ignores zero, negative, Infinity and NaN values. [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)
- `lineCap`: This property of the Canvas 2D API determines how the end points of every line are drawn. Possible Values: `["butt", "round", "square"]` [mdn: lineCap](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)
- `lineJoin`: This property of the Canvas 2D API determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together (degenerate segments with zero lengths, whose specified endpoints and control points are exactly at the same position, are skipped). Possible Values: `["bevel", "round" "miter"]`  [lineJoin](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin)
- `miterLimit`: A number specifying the miter limit ratio in space units. Zero, negative, Infinity and NaN values are ignored. [mdn: miterLimit](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit)
- `lineDash`: A wrapper property for `ctx.setLineDash()` which accepts an `Array`. The value is list of numbers that specifies distances to alternately draw a line and a gap (in coordinate space units). If the number of elements in the array is odd, the elements of the array get copied and concatenated. For example, `[5, 15, 25]` will become `[5, 15, 25, 5, 15, 25]`. Link: [setLineDash](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash)
- `lineDashOffset`: The lineDashOffset property of the Canvas 2D API sets the line dash pattern offset or "phase" to achieve a "marching ants" effect. Link: [lineDashOffset](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)

It has two forms:

Named Parameter List:

- `style`: provide a single object with key value pairs named for the style properties specified.

```javascript
<lineStyle style={style}>
  {children}
</lineStyle>
//e2d.lineStyle(style, children);
```

The second form allows any property optionally:

```javascript
<lineStyle
  lineWidth={lineWidth}
  lineCap={lineCap}
  lineJoin={lineJoin}
  miterLimit={miterLimit}
  lineDash={lineDash}
  lineDashOffset={lineDashOffset}>
  {children}
</lineStyle>
/*
e2d.lineStyle({
  lineWidth: lineWidth,
  lineCap: lineCap,
  lineJoin: lineJoin,
  miterLimit: miterLimit,
  lineDash: lineDash,
  lineDashOffset: lineDashOffset
}, children);
*/
```

## lineTo

This element connects the last point in the `sub-path` to the `[x, y]` coordinates with a straight line (but does not draw it.)

See [mdn: lineTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) for more information.
Named Parameter List:

- `x`: The x axis of the coordinate for the end of the line.
- `y`: The y axis of the coordinate for the end of the line.

```javascript
<lineTo x={y} y={y} />
```

## moveTo

This element moves the starting point of a new sub-path to the (x, y) coordinates.

See [mdn: moveTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo) for more information.
Named Parameter List:

- `x`: The x axis of the point.
- `y`: The y axis of the point.

```javascript
<moveTo x={y} y={y} />
```
