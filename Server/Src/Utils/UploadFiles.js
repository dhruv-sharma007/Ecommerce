import ImageKit from "imagekit";
import dotenv from "dotenv"

dotenv.config()

let imagekit = new ImageKit({
	publicKey: process.env.IMAGINARY_PUBLIC_KEY,
	privateKey: process.env.IMAGINARY_PRIVET_KEY,
	urlEndpoint: process.env.IMAGINARY_PRODUCT_IMAGE_URL_ENDPOINT,
});

const uploadProductImage = async (file) => {
	try {
		const result = await imagekit.upload({
			file: file.buffer,
			fileName: `${Date.now()}-ProductImage`,
			tags: ["Ycom", "productImage"],
		});

		return result.url;
	} catch (error) {
		return null;
	}
};

export { uploadProductImage };
