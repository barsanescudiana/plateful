const db = require("../database");
const off = require("openfoodfacts-nodejs");
const barcodesAPI = new off();

const controller = {
  getProductByBarcode: async (req, res) => {
    console.log(req.query.code);
    let response = {};
    if (req.query.code) {
      const productInfo = await barcodesAPI.getProduct(req.query.code);

      if (productInfo && productInfo.product) {
        response = {
          ...response,
          name: productInfo.product.product_name,
          quantity: productInfo.product.quantity,
          categories: productInfo.product.categories.split(",") || [],
        };

        if (productInfo.product.nutriments) {
          const nutriments = {
            calories: productInfo.product.nutriments["energy-kcal_100g"],
            carbs: productInfo.product.nutriments.carbohydrates_100g,
            fats: productInfo.product.nutriments.fat_100g,
            proteins: productInfo.product.nutriments.proteins_100g,
          };
          response = {
            ...response,
            nutriments: nutriments,
          };

          response = {
            ...response,
            expirationDate: productInfo.product.expiration_date || "",
          };
        }
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    } else {
      res.status(400).json({ message: "No barcode provided" });
    }
  },
};

module.exports = controller;
