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

## path

This element wraps it's children elements in `beginPath` and `endPath`.

See [mdn: path](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/path).

```javascript
//make a triangle
<path>
  <lineTo x={0} y={10} />
  <lineTo x={10} y={0} />
</path>
```

## placeHolder

This element is a placeholder for a template `wrapper`.  This is useful for instructions that are static and have children that are variable.  The `placeHolder` element has no parameters.

```javascript
let absoluteCenter = e2d.createWrapper(
  <translate x={width * 0.5} y={height * 0.5}>
    <placeHolder />
  </translate>
);

//this is equivalent to
let absoluteCenter = (...children) => <translate x={width * 0.5} y={height * 0.5}>
  {...children}
</translate>;
```

There are some additional optimizations that `e2d` can make during `wrapper` creation, and is a quick shorthand for a common use pattern.

## quadraticCurveTo

To see how the quadraticCurveTo function works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo).

Named Parameter List:

- `cpx`: The x axis of the coordinate for the control point.
- `cpy`: The y axis of the coordinate for control point.
- `x`: The x axis of the coordinate for the end point.
- `y`: The y axis of the coordinate for the end point.

It has one form and every parameter is required:

```javascript
<quadraticCurveTo cpx={cpx} cpy={cpy} x={x} y={y} />
//e2d.quadraticCurveTo(cpx, cpy, x, y);
```

## rect

This element is used for `path`ing rectangles. To see how the `rect` function works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect).

Named Parameter List:

- `x`: The x axis of the coordinate for the rectangle starting point. (default value is 0)
- `y`: The y axis of the coordinate for the rectangle starting point. (default value is 0)
- `width`: The rectangle's width.
- `height`: The rectangle's height.

It has two forms, and only the width and height are required.

```javascript
//x and y are both 0
<rect width={width} height={height} />
//e2d.rect(width, height);

//x and y both must be set for this to work
<rect x={x} y={y} width={width} height={height} />
//e2d.rect(x, y, width, height);
```

## render

This is a shorthand convenience element that renders the children to a specified context.

```jsx
<render ctx={ctx}>
  <clearRect width={width} height={height} />
  {children}
</render>;

//becomes
e2d.render(
  e2d.clearRect(width, height),
  children,
  ctx
);
```

This element prevents the need for ","s when dealing with rendering top level elements.

## resetTransform

This is a convenience element that represents a call to `setTransform` to the identity matrix.  This resets the transforms of all the children elements.  See `setTransform` to see how to control the current context's `transform` values.

```jsx
<resetTransform>
  {children}
</resetTransform>

//becomes

e2d.resetTransform(children)
```

## rotate

The `rotate` element rotates the canvas context around the current origin and draws the children rotated. To see how rotate works, visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate).

Named Parameter List:

- `angle`: The angle to rotate clockwise in radians. You can use degree * Math.PI / 180 if you want to calculate from a degree value.

```jsx
<rotate angle={angle}>
  {children}
</rotate>

//becomes

e2d.rotate(angle, children);
```

## scale

The `scale` element scales the canvas context and draws the children larger or smaller depending on the scale.  To see how scaling works, visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale).

Named Parameter List:

- `x`: Scaling factor in the horizontal direction.
- `y`: Scaling factor in the vertical direction.

...or
- `value`: Scaling factor in both directions

Examples:

```javascript
<scale x={x} y={y}>
  {children}
</scale>
//becomes e2d.scale(x, y, children);

<scale value={value}>
  {children}
</scale>
//becomes e2d.scale(value, children);
```

## setTransform

The `setTransform` element resets (overrides) the current transformation to the identity matrix and then invokes a transformation described by the arguments of this method. To see how `setTransform` works, visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform).

Named Parameter List:

- `matrix`: An array of at least six numbers that contain the information for the matrix transform.

```javascript
let matrix = [a, b, c, d, e, f];

<setTransform  matrix={matrix}>
  {children}
</setTransform>

//becomes
e2d.setTransform(matrix, children);
```

## shadowStyle

This is a combination `element` that sets multiple properties on the canvas `context`. Please visit [mdn: Shadows](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Shadows) to see how each property works.

Property List:

- `shadowBlur`: This property of the Canvas 2D API specifies the level of the blurring effect; this value doesn't correspond to a number of pixels and is not affected by the current transformation matrix. The default value is 0. [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur)
- `shadowColor`: This property of the Canvas 2D API specifies the color of the shadow.
- `shadowOffsetX`: This property of the Canvas 2D API specifies the distance that the shadow will be offset in horizontal distance.
- `shadowOffsetY`: This property of the Canvas 2D API specifies the distance that the shadow will be offset in vertical distance.
It has two forms:

Named Parameter List:

- `style`: provide a single object with key value pairs named for the style properties specified.

```javascript
<shadowStyle style={style}>
  {children}
</shadowStyle>
//e2d.shadowStyle(style, children);
```

The second form allows any property optionally:

```javascript
<shadowStyle
  shadowBlur={shadowBlur}
  shadowColor={shadowColor}
  shadowOffsetX={shadowOffsetX}
  shadowOffsetY={shadowOffsetY}
  >
  {children}
</shadowStyle>
/*
e2d.shadowStyle({
  shadowBlur: shadowBlur,
  shadowColor: shadowColor,
  shadowOffsetX: shadowOffsetX,
  shadowOffsetY: shadowOffsetY
}, children);
*/
```

## skewX and skewY

These skew elements are provided by the API as a relative transform that will skew it's children in the direction specified by an `angle`.

Named Parameter List:

- `angle`: The angle which the children will be skewed.

```javascript
<skewX angle={angle}>{children}</skewX>;
//e2d.skewX(angle, children);

<skewY angle={angle}>{children}</skewY>;
//e2d.skewY(angle, children);
```

## stroke

This element will stroke the current or given path with the current stroke `style` using the non-zero winding rule.  It has no parameters.

```javascript
<stroke />
//e2d.stroke()
```


## fillArc

This element is provided for convenience to round out the API and mirror the functionality of `strokeRect` using arcs. To see how arcs are used, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc).

Named Parameter List:

- `x`: The x coordinate of the arc's center. (defaults to 0)
- `y`: The y coordinate of the arc's center. (defaults to 0)
- `r`: The arc's radius. (defaults to 1)
- `startAngle`: The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
- `endAngle`: The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
- `anticlockwise`: An optional Boolean which, if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.

It has four forms.

```javascript
<strokeArc />
//e2d.strokeArc(); an arc centered at [0, 0] with radius 0 with a full circle

<strokeArc r={radius} />
//e2d.strokeArc(radius); an arc centered at [0, 0] with radius "radius" with a full circle

<strokeArc x={x} y={y} r={radius} />
//e2d.strokeArc(x, y, radius); an arc centered at [x, y] with radius "radius" with a full circle

<strokeArc x={x} y={y} r={radius}
  startAngle={startAngle} endAngle={endAngle} />
//e2d.strokeArc(x, y, radius, startAngle, endAngle); an arc centered at [x, y] with radius "radius" from startAngle to endAngle

<strokeArc x={x} y={y} r={radius}
  startAngle={startAngle} endAngle={endAngle}
  anticlockwise={true} />
//e2d.strokeArc(x, y, radius, startAngle, endAngle, true); an arc centered at [x, y] with radius "radius" from startAngle to endAngle anticlockwise

```

## strokeRect

This element strokes a rectangle. To see how the `strokeRect` function works, please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect).

Named Parameter List:

- `x`: The x axis of the coordinate for the rectangle starting point. (default value is 0)
- `y`: The y axis of the coordinate for the rectangle starting point. (default value is 0)
- `width`: The rectangle's width.
- `height`: The rectangle's height.

It has two forms, and only the width and height are required.

```javascript
//x and y are both 0
<strokeRect width={width} height={height} />
//e2d.strokeRect(width, height);

//x and y both must be set for this to work
<strokeRect x={x} y={y} width={width} height={height} />
//e2d.strokeRect(x, y, width, height);
```

## strokeStyle

This is a function that wraps the `strokeStyle` property. To see how the `strokeStyle` property works visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle).

```javascript
<strokeStyle style={style}>
  {children}
</strokeStyle>
//e2d.strokeStyle(style, children);
```

## strokeText

This element draws text to the canvas. Please see [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText) for more information on how this function works.

Named Paramter List:

- `text`: The text to render using the current `font`, `textAlign`, `textBaseline`, and `direction` values (see `fontStyle` for more infomation.)
- `x`: The x axis of the coordinate for the text starting point. (defaults to `0`)
- `y`: The y axis of the coordinate for the text starting point. (defaults to `0`)
- `maxWidth`: The maximum width to draw.  If specified, and the string is computed to be wider than this width, the font is adjusted to use a more horizontally condensed font (if one is available or if a reasonably readable one can be synthesized by scaling the current font horizontally) or a smaller font.

It has three forms.

```javascript
<strokeText text="Hello World!" />
//e2d.strokeText("Hello World!");

<strokeText x={x} y={y} text="Hello World!" />
//e2d.strokeText(x, y, "Hello World!");

<strokeText x={x} y={y} text="Hello World!" maxWidth={maxWidth}/>
//e2d.strokeText(x, y, "Hello World!", maxWidth);
```

## transform

This element multiplies the current `transformation` with the `matrix` described by the arguments of this method. You are able to scale, rotate, move and skew the context. To see how `transform` works, visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform).

Named Parameter List:

- `matrix`: An array of at least six numbers that contain the information for the matrix transform.

```javascript
let matrix = [a, b, c, d, e, f];

<transform  matrix={matrix}>
  {children}
</transform>

//becomes
e2d.transform(matrix, children);
```

## translate

This element adds a `translation` transformation by moving the origin x horizontally and y vertically relatively for each of it's children.  To see how `translate` works please visit [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate).

Named Parameter List:

- `x`: Distance to move in the horizontal direction.
- `y`: Distance to move in the vertical direction.

```javascript
<translate x={x} y={y}>
  {children}
</translate>

//becomes
e2d.translate(x, y, children);
```

This software is released under the MIT License

# License

Copyright (c) 2016 Joshua Tenner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.