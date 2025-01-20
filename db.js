const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true},()=>
console.log("connected to db")
);
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
const foodschema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    description: String,
    addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
        
});
const food = mongoose.model("food", foodschema);