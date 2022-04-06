const express = require("express");
const app = express();
const port = 5000;
const bodyParser= require('body-parser')
const multer = require('multer');
var cosr = require('cors');
var mysql = require("mysql");
app.use(cosr());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('./uploads'))
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "severnhom",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//up load hình ảnh
var linkimg;

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
      linkimg = Date.now() + '.jpg';
      console.log(linkimg);
		callBack(null, linkimg)      
    }
  })
let upload = multer({ storage: storage})

//end upload 
app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
   const file = req.file;
   console.log(file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
  })
//kết thúc up load hình ảnh

//lấy danh mục có id cha = 0
app.get('/listdm', (req, res) => {
  con.query("SELECT * FROM danhmuc where idCha = 0 order by idDanhMuc desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });

})

//lấy tất cả danh mục
app.get('/listALLDM', (req, res) => {
  con.query("SELECT * FROM danhmuc order by idDanhMuc desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });

})

//thêm danh mục
app.post('/AddDanhMuc', (req, res) => {
  var sql = "insert into danhmuc (tenDanhMuc, idCha) values('" + req.body.tenDanhMuc + "','" + req.body.idcha + "');";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows === 1) {
      res.send("ok")
    }
  });
})

//xóa danh mục
app.post('/deleteDM/', (req, res) => {
  var idDanhMuc = req.body.idXoa;
  var sql = "DELETE FROM danhmuc WHERE idDanhMuc =" + idDanhMuc + "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send("ok")
    }
  });
})

//sửa danh mục
app.post('/updateDM', (req, res) => {
  const idDanhMuc = req.body.idDanhMucSua;
  const tenDanhMuc = req.body.dataUpdate.tenDanhMucSua;
  const idCha = req.body.dataUpdate.idChaSua;

  var sql = "UPDATE danhmuc SET tenDanhMuc='"+tenDanhMuc+"',idCha='"+idCha+"' WHERE idDanhMuc = "+idDanhMuc+"" ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok") {
      res.send("ok")
    }
  });
})

//sửa sản phẩm
app.post('/updateSP', (req, res) => {
  const idSanPham = req.body.idSanPhamSua;
  const tenSP = req.body.dataUpdate.tenSPSua;
  const giaSP = req.body.dataUpdate.giaSPSua;
  const ngayTao = req.body.dataUpdate.ngayTaoSua;
  const hanSuDung = req.body.dataUpdate.hanSuDungSua;
  const maDanhMuc = req.body.dataUpdate.maDanhMucSua;
  const maDanhMucNho = req.body.dataUpdate.maDanhMucNhoSua;
  const donVi = req.body.dataUpdate.donViSua;
  const noiSanXuat = req.body.dataUpdate.noiSanXuatSua;
  const soLuong = req.body.dataUpdate.soLuongSua;
  const tinhTrang = req.body.dataUpdate.tinhTrangSua;
  const chiTiet = req.body.dataUpdate.chiTietSua;
  const donViSL = req.body.dataUpdate.donViSLSua;

  var sql = "UPDATE sanpham SET tenSP ='"+tenSP+"',giaSP ='"+giaSP+"',ngayTao ='"+ngayTao+"',hanSuDung ='"+hanSuDung+"',maDanhMuc ='"+maDanhMuc+"',maDanhMucNho ='"+maDanhMucNho+"',donVi ='"+donVi+"',noiSanXuat ='"+noiSanXuat+"',soLuong ='"+soLuong+"',tinhTrang ='"+tinhTrang+"',chiTiet ='"+chiTiet+"',donViSL ='"+donViSL+"' WHERE idSanPham = "+idSanPham+"" ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send("ok")
    }
  });
})

//xóa sản phẩm

app.post("/deleteSP/", (req, res) => {
  var idXoaa = req.body.idXoa;
  var urixoaa = req.body.urixoa;
  console.log(urixoaa);
  var sql = "DELETE FROM sanpham WHERE idSanPham =" + idXoaa + "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      var fs = require("fs");
      var filePath = "./uploads/"+urixoaa+"";
      fs.unlink(filePath, deleteFileCallback);
      function deleteFileCallback(error) {
        if (error) {
          console.log("Error in dleting file");
          console.log(error.message);
        } else {
          console.log("Deleted Successfully...");
        }
      }
      res.send("ok");
    }
  });
});

//lấy danh sách sản phẩm
app.get('/listSP', (req, res) => {
  con.query("SELECT * FROM sanpham order by idSanPham asc", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });

})

// thêm sản phẩm
app.post('/AddSanPham', (req, res) => {
  var sql = "insert into sanpham (  tenSP, hinh, giaSP, ngayTao, hanSuDung, maDanhMuc ,donVi,	noiSanXuat,soLuong,tinhTrang,chiTiet,donViSL) values('" + req.body.tenSP + "','" + linkimg + "','" + req.body.giaSP + "','" + req.body.ngayTao + "','" + req.body.hanSuDung + "','" + req.body.maDanhMuc + "','" + req.body.donVi + "','" + req.body.noiSanXuat + "','" + req.body.soLuong + "','" + req.body.tinhTrang + "','" + req.body.chiTiet + "','" + req.body.donViSL + "');";

  con.query(sql, function (err, result, fields) {

    if (err) throw err;
    if (result === "ok") {
      res.send("ok")
    }
  });
})

app.use(function (req, res, next) {
  res.status(404).send("404 Not Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
