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

 // singup
 app.post("/singup", (req, res) => {
  var sql = "SELECT * FROM taikhoan WHERE taiKhoan= '"+ req.body.tentaikhoans +"' AND matKhau= '"+ req.body.matkhaus + "'";

 
  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({'success': false ,'message': "Database không có kết nối!"});
    }

    if (result.length > 0) {
      res.send({'success': false});
    } else {
      res.send({'success': true});
      var sql = "INSERT INTO taikhoan ( taiKhoan, matKhau) values('"+ req.body.tentaikhoans +"','"+ req.body.matkhaus +"');";
      con.query(sql, function (err, result, fields) {
        if (err) throw err; 
      });
    }
  });
});

 // check user
 app.post("/login", (req, res) => {
  console.log("dawng nhap")
  var sql = "SELECT * FROM taikhoan WHERE taiKhoan= '"+ req.body.username +"' AND matKhau= '"+ req.body.password + "'";

 
  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({'success': false ,'message': "Database không có kết nối!"});
    }

    if (result.length > 0) {
      res.send({'success': true});
      console.log(res);
    } else {
      res.send({'success': false ,'message': "Sai tài khoản!"});
      console.log(res);
    }
  });
});

//lấy dữ liệu 5 sản phẩm
app.get("/laydulieu5sp/:idss", (req, res) => {
  var limit = 5;
  var ofsset = (req.params.idss - 1) * limit;
  var sql =
    "SELECT * FROM sanpham ORDER BY idSanPham DESC LIMIT " + ofsset + " , " + limit;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//lấy tất cả danh mục
app.get('/listALLDM/:idss', (req, res) => {
  var limit = 15;
  var ofsset = (req.params.idss - 1) * limit;
  var sql =
    "SELECT * FROM danhmuc ORDER BY idDanhMuc DESC LIMIT " + ofsset + " , " + limit;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });

})

//lấy dữ liệu sản phẩm cần sửa
app.get("/layeditsanpham/:idsp", function (req, res) {
  var page = req.params.idsp;

  var sql = "SELECT * FROM sanpham WHERE idSanPham = " + page;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
  });
});

//lấy dữ liệu danh mục cần sửa
app.get("/layeditdanhmuc/:id", function (req, res) {
  var id = req.params.id;

  var sql = "SELECT * FROM danhmuc WHERE idDanhMuc = " + id;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);

    res.send(result);
  });
});

//up load hình ảnh
var linkimg;
var trong = 0;

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
   trong = 1;
   console.log(file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
  })
//kết thúc up load hình ảnh

//lấy danh mục
app.get('/listDM', (req, res) => {
  con.query("SELECT * FROM danhmuc order by idDanhMuc desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });

})

//lấy danh mục có id cha = 0
app.get('/listdm0', (req, res) => {
  con.query("SELECT * FROM danhmuc where idCha = 0 order by idDanhMuc desc", function (err, result, fields) {
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
var img;
app.post('/editdanhmuc', (req, res) => {
  const idDanhMuc = req.body.idDanhMuc;
  const tenDanhMuc = req.body.tenDanhMuc;
  const idCha = req.body.idCha;
    
    var sql = "UPDATE danhmuc SET tenDanhMuc ='"+tenDanhMuc+"',idCha ='"+idCha+"' WHERE idDanhMuc = "+idDanhMuc+"" ;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result === "ok") {
        res.send("ok");
      }
      res.send("ok");
    });

})

//sửa sản phẩm
var img;
app.post('/editsanpham', (req, res) => {
  const idSanPham = req.body.idSanPham;
  const tenSP = req.body.tenSP;
  const giaSP = req.body.giaSP;
  const ngayTao = req.body.ngayTao;
  const hanSuDung = req.body.hanSuDung;
  const maDanhMuc = req.body.maDanhMuc;
  const donVi = req.body.donVi;
  const noiSanXuat = req.body.noiSanXuat;
  const soLuong = req.body.soLuong;
  const tinhTrang = req.body.tinhTrang;
  const chiTiet = req.body.chiTiet;
  const donViSL = req.body.donViSL;
  const hinhxoa = req.body.hinh;

  if (trong === 1 ) {
    img = linkimg;

    var sql = "UPDATE sanpham SET tenSP ='"+tenSP+"',hinh ='"+img+"',giaSP ='"+giaSP+"',ngayTao ='"+ngayTao+"',hanSuDung ='"+hanSuDung+"',maDanhMuc ='"+maDanhMuc+"',donVi ='"+donVi+"',noiSanXuat ='"+noiSanXuat+"',soLuong ='"+soLuong+"',tinhTrang ='"+tinhTrang+"',chiTiet ='"+chiTiet+"',donViSL ='"+donViSL+"' WHERE idSanPham = "+idSanPham+"" ;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(idSanPham);
        console.log(hinhxoa);
        var fs = require("fs");
        var filePath = "./uploads/"+hinhxoa+"";
        fs.unlink(filePath, deleteFileCallback);
        function deleteFileCallback(error) {
          if (error) {
            console.log("Error in dleting file");
            console.log(error.message);
          } else {
            console.log("Deleted Successfully...");
            res.send("ok");
          }
        }       
    });
  } else if (trong === 0) {
    img =  req.body.hinh;
    
    var sql = "UPDATE sanpham SET tenSP ='"+tenSP+"',hinh ='"+img+"',giaSP ='"+giaSP+"',ngayTao ='"+ngayTao+"',hanSuDung ='"+hanSuDung+"',maDanhMuc ='"+maDanhMuc+"',donVi ='"+donVi+"',noiSanXuat ='"+noiSanXuat+"',soLuong ='"+soLuong+"',tinhTrang ='"+tinhTrang+"',chiTiet ='"+chiTiet+"',donViSL ='"+donViSL+"' WHERE idSanPham = "+idSanPham+"" ;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result === "ok") {
        res.send("ok");
      }
      res.send("ok");
    });
  }

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
  console.log("thêm sp");
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok") {
      res.send("ok")
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
