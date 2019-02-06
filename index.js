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
      hash: false,
      hashLength: 8
    },
    options
  )
}

customChunkIds.prototype.apply = function(compiler) {
  let options = this.options
  compiler.hooks.compilation.tap('customChunkIds', function(compilation) {
    compilation.hooks.beforeChunkIds.tap('customChunkIds', function(chunks) {
      if(options.idMaker){
        //////// user callBack for chunk id generation logic
        options.idMaker(chunks, options);
      } else {
        let count = options.startingCount;
        let hashStack = [];
        chunks.forEach((chunk, index) => {
          let hashVal =(chunk.entryModule && chunk.entryModule.resource) ||
                    (chunk.entryModule && chunk.entryModule.name) ||
                    chunk.name || count+"";
          let chunkId = count;
          if(options.hash){
            //////// Hash based on resource path or resource name or chuk name or counter
            let hashedVal = crypto.createHash('md5').update(hashVal).digest('hex');
            let hashStart = 0;
            chunkId = "";
            while(!chunkId){
              if(hashStack.indexOf(hashedVal.substr(hashStart, options.hashLength)) == -1){
                chunkId = hashedVal.substr(hashStart, options.hashLength);
                hashStack.push(chunkId);
              } else {
                hashStart++;
              }
            }
          }
          if(options.entryModules && chunk.entryModule){
            chunk.id = options.prepend+chunkId+options.append;
            count++;
          } else if(options.vendorModules && chunk.name && chunk.name.startsWith("vendors~")){
            chunk.id = options.prepend+chunkId+options.append;
            count++;
          } else if(options.nonEntryModules){
            chunk.id = options.prepend+chunkId+options.append;
            count++;
          }
        })
      }
    })
  })
}

module.exports = customChunkIds
