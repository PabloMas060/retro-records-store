const db = require('../database/models');

module.exports = {
    index: (req, res) => {
        
        const bands = db.Band.findAll({
            include: [
                {
                    association: 'category',
                    include: [
                        {
                            all : true
                        }
                    ]
                }
            ]
        })
        const categories = db.Category.findAll()
        Promise.all([bands,categories])
            .then(([bands,categories]) => {
                console.log(bands[0].dataValues) 
                return res.render('index',{
                    bands,
                    categories
                }
                )
            }).catch(error => console.log(error))
       
    },

    contact: (req, res) => {
        res.render('contact')
    },

    

    editProfile: (req, res) => {
        res.render('editProfile')
    },
  
    selfcart: (req, res) => {
        res.render('selfcart')
    },
    giftcart: (req, res) => {
        res.render('giftcart')
    },
    cardInfo: (req, res) => {
        res.render('cardInfo')
    },
    checkout: (req, res) => {
        res.render('checkout')
    },

    
}