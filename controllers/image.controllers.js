import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Image from '../models/image.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createImage = async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error occurred while parsing form data',
        error: err.message,
      });
    }

    if (!files) {
      return res.status(400).json({
        success: false,
        message: 'No photo is selected',
      });
    }
    try {
      // Handle image upload
      const uploadFolderPath = path.join(__dirname, '../uploads/images');
      const photo = files.url;
      const filePath = photo[0].filepath;
      const data = fs.readFileSync(filePath);
      const imageExtension = photo[0].mimetype.split('/')[1];
      const imageName = `${Date.now()}.${imageExtension}`;
      const imagePath = path.join(uploadFolderPath, imageName);
      fs.writeFileSync(imagePath, data);

      const newImage = await Image.create({
        userId: req.user._id,
        url: imagePath,
      });

      if (!newImage) {
        return res.json({
          success: false,
          message: 'Error Uploading image',
        });
      }

      const savedImage = await newImage.save();

      res.status(201).json({
        success: true,
        message: 'Image saved successfully',
        savedImage,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });
};

/*
export const createImage = async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.user._id;
    console.log(url);

    const newImage = await Image.create({
      userId,
      url,
    });

    if (!newImage) {
      return res.json({
        success: false,
        message: 'Error Uploading image',
      });
    }

    const savedImage = await newImage.save();

    res.status(201).json({
      success: true,
      message: 'Image saved successfully',
      savedImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
*/
export const findImagesByUserId = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const images = await Image.find({ userId });

    res.status(200).json({
      success: true,
      message: 'Successfully fetched all images',
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'Successfully fetched all images',
      error: error.message,
    });
  }
};
