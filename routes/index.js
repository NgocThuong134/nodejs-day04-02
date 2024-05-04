var express = require("express");
var router = express.Router();
/* var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Khoa21donga:Khoa21dongaKhoa21dongaKhoa21donga@cluster0.o9ivn6p.mongodb.net/test2?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
 
let lopSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  numberStudent: {
    type: String,
  },
});
let Lop = mongoose.model("Lop", lopSchema);
*/
const lops = [
  {
    id: 1,
    name: "Lớp A",
    numberStudent: 30,
  },
  {
    id: 2,
    name: "Lớp B",
    numberStudent: 20,
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("Danh sách lớp: ", lops);
  res.render("index", { lops: lops, title: "Express" });
});
router.get("/add", function (req, res, next) {
  res.render("add", {});
});
router.get("/update/:id", function (req, res, next) {
  const id = req.params.id;
  const classToUpdate = lops.find((lop) => lop.id === parseInt(id));

  if (classToUpdate) {
    res.render("update", { classToUpdate: classToUpdate });
  } else {
    res.status(404).send("Class not found");
  }
});

router.get("/delete/:id", function (req, res, next) {
  const id = req.params.id;
  const classIndex = lops.findIndex((lop) => lop.id === parseInt(id));

  if (classIndex !== -1) {
    const deletedClass = lops[classIndex];
    lops.splice(classIndex, 1);
    console.log("Lớp đã bị xóa:", deletedClass);
  } else {
    console.log("Không tìm thấy lớp cần xóa");
  }

  res.redirect("/");
});

router.post("/add_class", function (req, res, next) {
  const newClass = {
    id: req.body.id,
    name: req.body.name,
    numberStudent: req.body.numberStudent,
  };

  lops.push(newClass);
  res.redirect("/");
});

router.post("/update_class", function (req, res, next) {
  const updatedClass = {
    id: req.body.id,
    name: req.body.name,
    numberStudent: req.body.numberStudent,
  };

  const classIndex = lops.findIndex(
    (lop) => lop.id === parseInt(updatedClass.id)
  );

  if (classIndex !== -1) {
    lops[classIndex] = updatedClass;
    console.log("Lớp đã được cập nhật:", updatedClass);
  } else {
    console.log("Không tìm thấy lớp cần cập nhật");
  }

  res.redirect("/");
});
module.exports = router;
