import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";


export const createCategoryController = async (req,res) => {
    try{
        const { fullname } = req.body
        if(!fullname){
            return res.status(401).send({message:"Fullname is requires"})
        } 

        const existingCategory = await categoryModel.findOne({fullname})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Existing",

            })
            
        }
        const category = await new categoryModel({
            fullname,
             slug:slugify(fullname),
            }).save()
        res.status(201).send({
            success:true,
            message:"new category created",
            category,
        });

    }catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        })
    }

}

//update category
export const updateCategoryController = async (req, res) => {
    try {
      const { fullname } = req.body;
      const { id } = req.params;
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { fullname, slug: slugify(fullname) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Category Updated Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating category",
      });
    }
  };
//get all category
export const categoryController = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };
//single category
export const singleCategoryController = async(req,res) => {
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: "Get single Successfully",
            category,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Single catehory"
        })
    }
};

//delete category
export const deletecategoryController = async(req,res) => {
    try{
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category Delete Successfully",
        
        });

    }catch(error){
        res.status(500).send({
            success: false,
            error,
            message: "Error while delete catehory"
        })

    }


}