'use strict'
const crypto = require('crypto')
const _path = require('path')

function customChunkIds(options = {}) {
  this.options = Object.assign(
    {
      append: "",
      prepend: "",
      entryModules: true,
      nonEntryModules: true,
      vendorModules: true,
      startingCount: 0,
      hash: false   //// Yet to be implemented
    },
    options
  )
}

customChunkIds.prototype.apply = function(compiler) {
  let options = this.options
  compiler.hooks.compilation.tap('customChunkIds', function(compilation) {
    compilation.hooks.beforeChunkIds.tap('customChunkIds', function(chunks) {
      let count = options.startingCount;
      chunks.forEach(chunk => {
        if(options.idMaker){
          options.idMaker(chunks);
        } else{
          if(options.entryModules && chunk.entryModule){
            chunk.id = options.prepend+count+options.append;
            count++;
          } else if(options.vendorModules && chunk.name && chunk.name.startsWith("vendors~")){
            chunk.id = options.prepend+count+options.append;
            count++;
          } else if(options.nonEntryModules){
            chunk.id = options.prepend+count+options.append;
            count++;
          }
          console.log("Plugin Generated Chunk Id ------------------------->"+chunk.id)
        }
      })
    })
  })
}

module.exports = customChunkIds
