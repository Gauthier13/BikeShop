var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect('mongodb+srv://gauthier:capsule@cluster0.jjauwkt.mongodb.net/BikeShop?retryWrites=true&w=majority',
    options,
    function (err) {
        console.log(err);
    }
);