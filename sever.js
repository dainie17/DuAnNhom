const express = require("express");
const app = express();
const port = 5000;
var bodyParser = require('body-parser')
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
    con.query("SELECT * FROM danhmuc where idcha = 0 order by idDanhMuc desc", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
      });
  
})

app.post('/AddDanhMuc', (req, res) => {
     var sql = "insert into danhmuc (tenDanhMuc, idcha) values('"+ req.body.tenDanhMuc +"','"+ req.body.idcha +"');";
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.send("ok")
      }
    });
})

// hiển thị ds bảng sv theo khoảng id
app.get("/ds6tp/:id", (req, res) => {
  var limit = 6; 
	var ofsset = (req.params.id -1) * limit;
	var sql = "SELECT * FROM trangphuc ORDER BY id desc LIMIT " + ofsset + " , "+ limit ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// post
app.post('/AddTrangPhuc', (req, res) => { 
    var sql = "insert into trangphuc ( LinkAnh, TenTrangPhuc, Gia, MoTa) values('"+ req.body.LinkAnh +"','"+ req.body.TenTrangPhuc +"','"+ req.body.Gia +"','"+ req.body.MoTa +"');";
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
  
      if (err) throw err;
      if (result == "ok") {
        res.send("ok")
      }
    });
  })

  app.post('/Remove', (req, res) => {
    console.log(req.body.id)
    var sql = "DELETE FROM trangphuc WHERE id = "+ req.body.id ;
     console.log(sql)
 
    con.query(sql, function (err, result, fields) {
  
      if (err) throw err;
      if (result == "ok") {
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
    if (result == "ok") {
      res.send("ok")
    }
  });
})

  // singup
  app.post("/singup", (req, res) => {
    var sql = "SELECT * FROM taikhoan WHERE tentaikhoan= '"+ req.body.tentaikhoans +"'";
 
   
    con.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send({'success': false ,'message': "Database không có kết nối!"});
      }

      if (result.length > 0) {
        res.send({'success': false});
      } else {
        res.send({'success': true});
        var sql = "INSERT INTO taikhoan ( tentaikhoan, matkhau) values('"+ req.body.tentaikhoans +"','"+ req.body.matkhaus +"');";
        con.query(sql, function (err, result, fields) {
          if (err) throw err; 
        });
      }
    });
  });



  // check user
  app.post("/login", (req, res) => {
    console.log("dang nhap")
    var sql = "SELECT * FROM taikhoan WHERE tentaikhoan= '"+ req.body.username +"' AND matkhau= '"+ req.body.password + "'";
 
   
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


app.use(function (req, res, next) {
  res.status(404).send("404 Not Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
