import ImageKit from "imagekit";
import asyncHandler from "./AsyncHandler.js";

let imagekit = new ImageKit({
	publicKey: 'public_mZQnjRJBFfduq/Rc7ddAsKdyzps=',
	privateKey: "private_epbZY1XxIPRck1By0GYPDe1+Hco=",
	urlEndpoint: "https://ik.imagekit.io/dhruvs/ycom-product-image",
});

const uploadProductImage = async (file) => {
	try {
		const result = await imagekit.upload(
			{
				file: file.buffer,
				fileName: `${Date.now()}-ProductImage`,
				tags: ["Ycom", "productImage"],
			},
			
		);

		return result.url
	} catch (error) {
		return null
	}
};

export { 
	uploadProductImage
}

