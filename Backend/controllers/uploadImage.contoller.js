import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async(req,res) => {
    try {
        const file = req.file

        // console.log("filedhfhdfhdjfhjasdh",file);

        const uploadImage = await uploadImageCloudinary(file)

        return res.json({
            message: "Upload done",
            data: uploadImage,
            error: false,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default uploadImageController