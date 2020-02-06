const router = require('express').Router()
const {User, Listing, Trip} = require('../db/models')
module.exports = router

router.get('/', async (req: any, res: any, next: any) => {
  try {
    const listings = await Listing.findAll()
    res.status(200).send(listings)
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id', async (req: any, res: any, next) => {
  try {
    const id = req.params.id
    let listing = await Listing.findOne({
      where: {
        id: id
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req: any, res: any, next) => {
  try {
    const newListing = await Listing.create({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      minOccupants: req.body.minOccupants,
      maxOccupants: req.body.maxOccupants
    })
    res.status(201).send(newListing)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req: any, res: any, next) => {
  try {
    const id = req.params
    await Listing.destroy({
      where: {
        id: id
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
