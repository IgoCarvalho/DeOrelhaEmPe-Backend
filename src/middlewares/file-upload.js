const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = async (req, res, next) => {
	try {
		//console.log(req)
		let files = Array.from(req.files)
		console.log("XXXXX FOTOS XXXXX",req.files)
		let filesData = []
	
		for(let file of files){
			console.log(file)
			const data = await cloudinary.uploader.upload(file.path)
	
			filesData.push({
				name: file.originalname,
				url: data.url,
				public_id: data.public_id
			})

			fs.unlink(file.path)
		}
	
		req.filesData = filesData
		console.log(req.filesData)
	
		//const img = await cloudinary.uploader.upload(file);
	
	    next()
	} catch(err){
		res.status(500).send({err, igo: 'uploadimages'})
	}
}
