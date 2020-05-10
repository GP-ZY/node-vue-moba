module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  // const Category = require('../../models/Category')

  //编辑分类接口
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  //更新分类接口
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //分类列表接口
  router.get('/', async (req, res) => {
    const items = await req.Model.find().populate('parent').limit(10)
    res.send(items)
  })

  //编辑详情接口
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //删除详情接口
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // 将前台获取的名称转化
    const modelName = require('inflection').classify(req.params.resource)

    req.Model = require(`../../models/${modelName}`)

    next()

  }, router)

  const multer = require('multer')

  const upload = multer({ dest: __dirname + '/../../uploads' })

  // 上传图片接口
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const AdminUser = require('../../models/AdminUser')

    const user = await AdminUser.findOne({username}).select('+password')

    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    // 2.校验密码    compareSync 比较散列密码的明文和暗文
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码不正确'
      })
    }
    // 3.返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({token})

  })
}