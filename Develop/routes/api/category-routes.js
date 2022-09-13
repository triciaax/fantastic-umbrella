const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({})
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price"],
      },
    ],
  }).then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "no category found with this id" });
      return;
    }
    res.json(dbCategoryData);
  });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Category.update(
    { category_name: req.body.category_name },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCategoryData) => {
      console.log(dbCategoryData);
      if (!dbCategoryData) {
        console.log(dbCategoryData);
        res.status(404).json({ message: "no category with this id was found" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: { id: req.params.id },
  }).then((dbData) => {
    console.log(dbData);
    if (!dbData) {
      res.status(404).json({ message: "no user found with this ID" });
      return;
    }
    res.json(dbData);
  });
});

module.exports = router;
