var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51LBZkyD7kjmdsZsIHKW7xX8I95KlFOIVCxi1SWyizzWXFrT2OXw2O2WtoILDkOCTbZ6e3Gff4iuGn5pMXHTSJ09d00Jyk37MT5');

var dataBike =[
  {nom:'BIKO45', image:"images/bike-1.jpg", prix:679},
  {nom:'ZOOK7', image:"images/bike-2.jpg", prix:999},
  {nom:'LIKO89', image:"images/bike-3.jpg", prix:799},
  {nom:'GEWO8', image:"images/bike-4.jpg", prix:1300},
  {nom:'KIWIT', image:"images/bike-5.jpg", prix:479},
  {nom:'NASAY', image:"images/bike-6.jpg", prix:869}
];

/* GET home page. */
 router.get('/', function(req, res, next) {
  if(req.session.dataCardBike == undefined){ //si mon panier n'est pas vide
    req.session.dataCardBike = []; //sinon mon panier est vide
  }
  res.render('index', { dataBike, dataCardBike: req.session.dataCardBike });
 });


//GET shop page
router.get('/shop', function(req,res,next){
  console.log(req.query);
  
  var bikeIsThere= false;


  for(key in req.session.dataCardBike){   
    if(req.session.dataCardBike[key].nom == req.query.nom){
      req.session.dataCardBike[key].quantity +=1;
      bikeIsThere = true;
    }
  }

  if(bikeIsThere == false){
    req.session.dataCardBike.push({nom: req.query.nom, prix: req.query.prix, image: req.query.image, quantity :1});
  }
  
  //ajouter un vélo aupanier
  res.render('shop', { dataCardBike : req.session.dataCardBike })
});


//Delete one item
router.get('/delete-shop', function(req, res, next) {
  req.session.dataCardBike.splice(req.query.position, 1); //retirer le vélo en question

  res.render('shop', { dataCardBike: req.session.dataCardBike });
});

//Modifier les quantités du panier
router.post('/update-shop', function(req,res,next){

  var position = req.body.position;
  var quantity = req.body.quantity;
  dataCardBike[position].quantity = quantity;

  res.render('shop',{ dataCardBike } );
})


//-------------PAIEMENT----------------------------------------//
router.post('/create-checkout-session', async (req, res) => {

  var newLineItems = [];
  for(let i=0; i<req.session.dataCardBike.length; i++){
    newLineItems.push(
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: req.session.dataCardBike[i].nom,
          },
          unit_amount: req.session.dataCardBike[i].prix * 100,
        },
        quantity: req.session.dataCardBike[i].quantity,
      },
    );
  };

  console.log("je suis après le for");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: newLineItems,
    mode: 'payment',
    success_url: 'https://www.instagram.com/gauthier.leclair/',
    cancel_url: 'https://www.instagram.com/gauthier.leclair/',
 });

 res.redirect(303, session.url);
});


router.get('/success', (req, res) => {
  res.render('success');
 });


router.get('/cancel', (req, res) => {
  res.render('cancel');
 });

 router.get('/', function(req,res,next){
   res.render('index', { })
 })

module.exports = router;
