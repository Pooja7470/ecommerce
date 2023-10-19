import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    fullname:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true,
      },
    quantity:{
        type: Number,
        require: true, 
    },

    
    photo: 
      {
        data: Buffer,
        contentType: String,
      },
    
    shipping:{
        type:Boolean,
    }

},
{ timestamps: true } 
);



export default mongoose.model("Products", productSchema);


// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5, // Assuming a 5-star rating system
//   },
//   comment: {
//     type: String,
//   },
//   // You can add more fields like date, helpful votes, etc. as needed
// }, { timestamps: true });

// const productSchema = new mongoose.Schema({
//   fullname: {
//     type: String,
//     required: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   category: {
//     type: mongoose.ObjectId,
//     ref: "Category",
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   // photo: {
//   //   data: Buffer,
//   //   contentType: String,
//   // },

//   shipping: {
//     type: Boolean,
//   },
//   reviews: [reviewSchema], // Add reviews as an array of objects
// }, { timestamps: true });

// export default mongoose.model("Products", productSchema);
