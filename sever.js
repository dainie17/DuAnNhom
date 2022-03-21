const express = require("express");
const app = express();
const port = 5000;
// var bodyParser = require('body-parser')
var cosr = require('cors');
var mysql = require("mysql");
app.use(cosr());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/listdm', (req, res) => {
  con.query("SELECT * FROM danhmuc where idCha = 0 order by idDanhMuc desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });

})

app.get('/listDM', (req, res) => {
  con.query("SELECT * FROM danhmuc order by idDanhMuc desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });

})

app.post('/AddDanhMuc', (req, res) => {
  var sql = "insert into danhmuc (tenDanhMuc, idCha) values('" + req.body.tenDanhMuc + "','" + req.body.idcha + "');";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows === 1) {
      res.send("ok")
    }
  });
})

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

app.post('/updateDM', (req, res) => {
  const idDanhMuc = req.body.idDanhMucSua;
  const tenDanhMuc = req.body.dataUpdate.tenDanhMucSua;
  const idCha = req.body.dataUpdate.idChaSua;

  var sql = "UPDATE danhmuc SET tenDanhMuc='"+tenDanhMuc+"',idCha='"+idCha+"' WHERE idDanhMuc = "+idDanhMuc+"" ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send("ok")
    }
  });
})

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

app.post('/deleteSP/', (req, res) => {
  var idSanPham = req.body.idXoaSP;
  var sql = "DELETE FROM sanpham WHERE idSanPham =" + idSanPham + "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send("ok")
    }
  });
})

app.get('/listSP', (req, res) => {
  con.query("SELECT * FROM sanpham order by idSanPham asc", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });

})

// hiển thị ds bảng sv theo khoảng id
app.get("/ds6tp/:id", (req, res) => {
  var limit = 6;
  var ofsset = (req.params.id - 1) * limit;
  var sql = "SELECT * FROM trangphuc ORDER BY id desc LIMIT " + ofsset + " , " + limit;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// post
app.post('/AddSanPham', (req, res) => {
  var sql = "insert into sanpham (  tenSP, giaSP, ngayTao, hanSuDung, maDanhMuc ,donVi, 	noiSanXuat,soLuong,tinhTrang,chiTiet,donViSL) values('" + req.body.tenSP + "','" + req.body.giaSP + "','" + req.body.ngayTao + "','" + req.body.hanSuDung + "','" + req.body.maDanhMuc + "','" + req.body.donVi + "','" + req.body.noiSanXuat + "','" + req.body.soLuong + "','" + req.body.tinhTrang + "','" + req.body.chiTiet + "','" + req.body.donViSL + "');";
  console.log(sql)

  con.query(sql, function (err, result, fields) {

    if (err) throw err;
    if (result === "ok") {
      res.send("ok")
    }
  });
})

app.post('/Remove', (req, res) => {
  console.log(req.body.id)
  var sql = "DELETE FROM trangphuc WHERE id = " + req.body.id;
  console.log(sql)

  con.query(sql, function (err, result, fields) {

    if (err) throw err;
    if (result === "ok") {
      res.send("ok")
    }
  });
})

// post sua san pham
app.post('/UpdateTrangPhuc', (req, res) => {

  // //update sql
  var sql = "UPDATE trangphuc SET LinkAnh= '" + req.body.LinkAnh + "', TenTrangPhuc= '" + req.body.TenTrangPhuc + "', Gia= '" + req.body.Gia + "', MoTa= '" + req.body.MoTa + "' WHERE id= '" + req.body.id + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok") {
      res.send("ok")
    }
  });
})

// singup
app.post("/singup", (req, res) => {
  var sql = "SELECT * FROM taikhoan WHERE tentaikhoan= '" + req.body.tentaikhoans + "'";


  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ 'success': false, 'message': "Database không có kết nối!" });
    }

    if (result.length > 0) {
      res.send({ 'success': false });
    } else {
      res.send({ 'success': true });
      var sql = "INSERT INTO taikhoan ( tentaikhoan, matkhau) values('" + req.body.tentaikhoans + "','" + req.body.matkhaus + "');";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });
    }
  });
});



// check user
app.post("/login", (req, res) => {
  console.log("dang nhap")
  var sql = "SELECT * FROM taikhoan WHERE tentaikhoan= '" + req.body.username + "' AND matkhau= '" + req.body.password + "'";


  con.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.send({ 'success': false, 'message': "Database không có kết nối!" });
    }

    if (result.length > 0) {
      res.send({ 'success': true });
      console.log(res);
    } else {
      res.send({ 'success': false, 'message': "Sai tài khoản!" });
      console.log(res);
    }
  });
});


app.use(function (req, res, next) {
  res.status(404).send("404 Not Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
