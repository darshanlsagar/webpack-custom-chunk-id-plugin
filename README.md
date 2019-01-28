# webpack-custom-chunk-id-plugin
Custom chunk id generator with appended and prepended strings


## Install

```shell
$ npm i webpack-custom-chunk-id-plugin
```

## Usage

```js
const customChunkIdPlugin = require('webpack-custom-chunk-id-plugin')

webpackConfig = {
  plugins: [
	new customChunkIdPlugin({
	  startingCount: 10,		// Chunk count starts with 10 now, default is 0
	  prepend: "configs/",		// Chunk files will be generated to configs folder in outputPath
	  entryModules: false,		// Entry modules will be ignored from customization logic
	  nonEntryModules: true		// Non Entry modules will be considered for customized chunk id logic
	})
  ]
}
```

## Author

[DarshanKumar L Sagar](https://github.com/darshanlsagar)