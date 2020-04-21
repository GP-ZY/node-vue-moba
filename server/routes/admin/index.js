module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')

  //编辑分类接口
  router.post('/categories',async(req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  //更新分类接口
  router.put('/categories/:id',async(req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //分类列表接口
  router.get('/categories',async(req, res) => {
    const items = await Category.find().limit(10)
    res.send(items)
  })

  //编辑详情接口
  router.get('/categories/:id',async(req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  //删除详情接口
  router.delete('/categories/:id',async(req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  app.use('/admin/api',router)
}