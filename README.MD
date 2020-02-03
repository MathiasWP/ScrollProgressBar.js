# ScrollProgressBar.js

A super lightweight and robust library for displaying how far a user has scrolled on a webpage - only 3kb!

# Core

Include the script in your HTML and create the ScrollProgressBar:

```js
new ScrollProgressBar();
```

## Options

The ScrollProgressBar can take in an object with options as a parameter. You can freely choose what options you want to use.
# ScrollProgressBar.js

A super lightweight and robust library for displaying how far a user has scrolled on a webpage - only 3kb!


# Core

Include the script in your HTML and create the ScrollProgressBar:

```js

new ScrollProgressBar();
```

## Options
The ScrollProgressBar can take in an object with options as a parameter. You can freely choose what options you want to use.

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
| color | String | "#ffa453" | Sets the color of the bar. |
| opacity | String or Integer | 1 | Sets the opacity of the bar. |
| placement | String | "top" | Sets the placement of the bar on the screen. Can either be "top", "left", "right" or "bottom" |
| size | String | '10px' | Sets the size of the bar. Accepts any valid CSS-size property. |
| zIndex | Integener | 9999 | Sets the z-index of the bar. |


## Examples

### 1:
```js

new ScrollProgressBar({color: 'lightblue', size: '4rem', opacity: 0.5}).start()
```


### 2:
```js

new ScrollProgressBar({color: '#ccc', size: '6px', placement: 'left', zIndex: 10}).start()
```
