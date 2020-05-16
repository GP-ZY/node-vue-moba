module.exports = options => {
  return async (req, res, next) => {
    // 将前台获取的名称转化
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}