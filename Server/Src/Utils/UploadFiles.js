import ImageKit from "imagekit";

let imagekit = new ImageKit({
	publicKey: "public_8s+MM9KN3Wqmh6XUE58DzCou7zw=",
	privateKey: "private_H1oDsr+Vs/ax8efABlibHKCWawk=",
	urlEndpoint: "https://ik.imagekit.io/dhruvs/ycom-product-image",
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
