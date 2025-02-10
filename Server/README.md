# API Endpoints for Product Management

## User Routes

### Add a Product base api --> api/v1/product
- **Endpoint:** `/add-product`
- **Method:** `POST`
- **Description:** Adds a new product.
- **Authorization:** Requires seller verification.
- **Payload:** `file` (multipart/form-data)

### Update a Product
- **Endpoint:** `/update-product`
- **Method:** `POST`
- **Description:** Updates an existing product.
- **Authorization:** Requires seller verification.

### Update Product Image
- **Endpoint:** `/update-product-image`
- **Method:** `POST`
- **Description:** Updates the image of an existing product.
- **Authorization:** Requires seller verification.
- **Payload:** `file` (multipart/form-data)

### Delete a Product
- **Endpoint:** `/delete-product`
- **Method:** `POST`
- **Description:** Deletes an existing product.
- **Authorization:** Requires seller verification.

### Get All Products
- **Endpoint:** `/get-all-products`
- **Method:** `GET`
- **Description:** Retrieves all products.

### Get Product by ID
- **Endpoint:** `/get-product-by-id/:_id`
- **Method:** `GET`
- **Description:** Retrieves a product by its ID.
- **Params:** `:_id` (string)

### Get Product by Name
- **Endpoint:** `/get-product-by-name/:productName`
- **Method:** `GET`
- **Description:** Retrieves a product by its name.
- **Params:** `:productName` (string)

### Get Product by Category
- **Endpoint:** `/get-product-by-category/:category`
- **Method:** `GET`
- **Description:** Retrieves products by category.
- **Params:** `:category` (string)

### Get Product by Seller
- **Endpoint:** `/get-product-by-seller/:sellerId`
- **Method:** `GET`
- **Description:** Retrieves products by seller ID.
- **Params:** `:sellerId` (string)

## Product Routes

### Add a Product
- **Endpoint:** `/add-product`
- **Method:** `POST`
- **Description:** Adds a new product.
- **Authorization:** Requires seller verification.
- **Payload:** `file` (multipart/form-data)

### Update a Product
- **Endpoint:** `/update-product`
- **Method:** `POST`
- **Description:** Updates an existing product.
- **Authorization:** Requires seller verification.

### Update Product Image
- **Endpoint:** `/update-product-image`
- **Method:** `POST`
- **Description:** Updates the image of an existing product.
- **Authorization:** Requires seller verification.
- **Payload:** `file` (multipart/form-data)

### Delete a Product
- **Endpoint:** `/delete-product`
- **Method:** `POST`
- **Description:** Deletes an existing product.
- **Authorization:** Requires seller verification.

### Get All Products
- **Endpoint:** `/get-all-products`
- **Method:** `GET`
- **Description:** Retrieves all products.

### Get Product by ID
- **Endpoint:** `/get-product-by-id/:_id`
- **Method:** `GET`
- **Description:** Retrieves a product by its ID.
- **Params:** `:_id` (string)

### Get Product by Name
- **Endpoint:** `/get-product-by-name/:productName`
- **Method:** `GET`
- **Description:** Retrieves a product by its name.
- **Params:** `:productName` (string)

### Get Product by Category
- **Endpoint:** `/get-product-by-category/:category`
- **Method:** `GET`
- **Description:** Retrieves products by category.
- **Params:** `:category` (string)

### Get Product by Seller
- **Endpoint:** `/get-product-by-seller/:sellerId`
- **Method:** `GET`
- **Description:** Retrieves products by seller ID.
- **Params:** `:sellerId` (string)

