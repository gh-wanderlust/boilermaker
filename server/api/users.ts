const router = require('express').Router()
const {User, Listing, Trip} = require('../db/models')
module.exports = router

router.get('/', async (req: any, res: any, next: any) => {
  try {
    const users = await User.findAll()
        res.status(200).send(users)
      } catch (error) {
        console.error(error)
      }
})

router.get('/:id', async (req: any, res: any, next) => {
  try {
     const id = req.params.id
        let user = await User.findOne({
          where: {
            id: id
          },
          include: [Listing, Trip]
        })
        res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req: any, res: any, next) => {
  try {
    const newUser = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          imageUrl: req.body.imageUrl
        })
        res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req: any, res: any, next) => {
  try {
     const id = req.params
        await User.destroy({
          where: {
            userId: id
            }
          })
        res.status(204).end()
  } catch (err) {
    next(err)
  }
})