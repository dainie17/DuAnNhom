/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Editproduct = () => {
  const api = 'http://localhost:5000/';
  let history = useHistory();
  const { id } = useParams();

  const [listcate, setLicate] = useState([]);

  const getdanhmuc = async () => {
    const baseurl = 'http://localhost:5000/listALLDM';
    const response = await axios.get(baseurl);
    setLicate(response.data);
}

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,

  });

  const uploadFile = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    })
    const data = new FormData();
    data.append('file', event.target.files[0]);
    console.log(data);

    axios.post("http://localhost:5000/uploadFileAPI", data)
      .then(res => {
        console.log(res.data);
      })
  }

  // const refreshPage = () => {
  //   window.location.reload();
  // }

  const [trademarkname, settrademarkname] = useState({
    tenSP: "",
    hinh: "",
    giaSP: "",
    ngayTao: "",
    hanSuDung: "",
    maDanhMuc: "",
    donVi: "",
    noiSanXuat: "",
    soLuong: "",
    tinhTrang: "",
    chiTiet: "",
    donViSL: "",
  })
  const onInputChange = e => {
    settrademarkname({ ...trademarkname, [e.target.name]: e.target.value });
  };
  const { tenSP, hinh, giaSP, ngayTao, hanSuDung, maDanhMuc, donVi, noiSanXuat, soLuong, tinhTrang, chiTiet, donViSL } = trademarkname;


  useEffect(() => {
    getsanpham();
    getdanhmuc();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editsanpham', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idSanPham: id,
        tenSP: tenSP,
        hinh: hinh,
        giaSP: giaSP,
        ngayTao: ngayTao,
        hanSuDung: hanSuDung,
        maDanhMuc: maDanhMuc,
        donVi: donVi,
        noiSanXuat: noiSanXuat,
        soLuong: soLuong,
        tinhTrang: tinhTrang,
        chiTiet: chiTiet,
        donViSL: donViSL,
      })

    })
      .then((response) => {
        if (response.data === 'ok') {
          alert("sửa thành công");
        }
      });
    console.log("tên đã nhập : " + tenSP);
    history.push("/");
  };

  const huySua = () =>{
    history.push("/");
  }

  // lấy dữ liệu sản phẩm
  const getsanpham = async () => {
    console.log(id);
    const base_url = api + `layeditsanpham/${id}`;
    const response = await axios.get(base_url);
    console.log(response.data);
    console.log(response.data[0].tenSP);
    settrademarkname({
      update: true,
      tenSP: response.data[0].tenSP,
      hinh: response.data[0].hinh,
      giaSP: response.data[0].giaSP,
      ngayTao: response.data[0].ngayTao,
      hanSuDung: response.data[0].hanSuDung,
      maDanhMuc: response.data[0].maDanhMuc,
      donVi: response.data[0].donVi,
      noiSanXuat: response.data[0].noiSanXuat,
      soLuong: response.data[0].soLuong,
      tinhTrang: response.data[0].tinhTrang,
      chiTiet: response.data[0].chiTiet,
      donViSL: response.data[0].donViSL,
    })
  };

  return (
    <div style={{ width: '100%', alignItems: 'center', textAlign: 'center', background: '#F5F5F5' }}>
      <h2>Cập Nhật Sản Phẩm</h2>

      <h4>ID Sản phẩm: {id} </h4>

      {/* Container left */}
      <div style={{ width: '40%', float: 'left', alignItems: 'center', textAlign: 'center', marginLeft: '5%', marginBottom: '2%' }}>

        {/* hình ảnh */}
        <div>
          <input onChange={uploadFile} type="file" style={{ marginBottom: '1%' }} />
          <div>
            {userInfo.filepreview !== null ?
              <img style={{ width: '100%', height: '430px' }} src={userInfo.filepreview} alt="UploadImage" />
              : null}

            {userInfo.filepreview === null ?
              <img style={{ width: '100%', height: '430px' }} src={"http://localhost:5000/uploads/" + hinh} />
              : null}
          </div>
        </div>

      </div>

      {/* Container right                      */}
      <div style={{ width: '40%', float: 'left', marginLeft: '10%', border: '1px solid black' }}>

        {/* tên sản phẩm */}
        <div style={{ marginTop: '2%' }}>
          <text>Tên sản phẩm: </text>
          <input
            style={{ width: '60%', height: '30px', fontSize: '19px' }}
            type="text"
            placeholder="Nhập Tên Sản Phẩm"
            name="tenSP"
            value={tenSP}
            onChange={e => onInputChange(e)}>
          </input>
        </div>

        <div style={{ width: '80%', marginLeft: '11%', marginTop: '2%', marginBottom: '10%' }}>

          {/* giá sản phẩm*/}
          <div style={{ float: 'left', width: '50%' }}>
            <text style={{ float: 'left' }}>Giá sản phẩm : </text>
            <input
              style={{ width: '30%', float: 'left', height: '30px', fontSize: '19px', marginLeft: '2%' }}
              type="number"
              placeholder="Nhập Giá Sản Phẩm"
              name="giaSP"
              value={giaSP}
              onChange={e => onInputChange(e)}>
            </input>

            <input
              style={{ width: '15%', float: 'left', height: '30px', fontSize: '19px' }}
              type="text"
              placeholder="Đơn vị"
              name="donVi"
              value={donVi}
              onChange={e => onInputChange(e)}>
            </input>
          </div>

          {/* Ngày tạo                         */}
          <div style={{ float: "left", width: '50%' }}>
            <text>Ngày thêm : </text>
            <input
              style={{ width: '50%', height: '30px', fontSize: '19px' }}
              type="text"
              placeholder="Ngày tạo"
              name="ngayTao"
              value={ngayTao}
              onChange={e => onInputChange(e)}>
            </input>
          </div>

        </div>

        <div style={{ width: '100%' }}>

          {/* Hạn sử dụng */}
          <div style={{ width: '50%', marginLeft: '5%', float: 'left' }}>
            <text>Hạn sử dụng : </text>
            <input
              style={{ width: '60%', height: '30px', fontSize: '19px' }}
              type="text"
              placeholder="Hạn sử dụng"
              name="hanSuDung"
              value={hanSuDung}
              onChange={e => onInputChange(e)}>
            </input>
          </div>

          {/* Số lượng             */}
          <div style={{ width: '40%', float: 'left', marginLeft: '2%' }}>
            <text>Số lượng : </text>
            <input
              style={{ width: '40%', height: '30px', fontSize: '19px' }}
              type="text"
              placeholder="Số lượng"
              name="soLuong"
              value={soLuong}
              onChange={e => onInputChange(e)}>
            </input>
            <input
              style={{ width: '20%', height: '30px', fontSize: '19px' }}
              type="text"
              placeholder="Đơn vị của số lượng"
              name="donViSL"
              value={donViSL}
              onChange={e => onInputChange(e)}>
            </input>
          </div>

        </div>

        <div style={{ width: '100%' }}>

          {/* Danh mục */}
          <div style={{ width:'50%', marginTop: '2%', float: 'left', marginLeft: '2%' }}>
            <text>Danh mục : </text>
            <select style={{ height: '30px', fontSize: '19px' }} name='maDanhMuc' onChange={e => onInputChange(e)}>
              <option value={maDanhMuc}>Danh mục hiện tại</option>
              {listcate.map((item) =>
                <option key={item.idDanhMuc} value={item.idDanhMuc}>{item.tenDanhMuc}</option>
              )}
            </select>
          </div>

          {/* Tình trạng */}
          <div style={{ width: '40%', marginTop: '2%', float: 'left' }}>
            <text>Tình trạng : </text>
            <input
              style={{ width: '30%', height: '30px', fontSize: '19px' }}
              type="text"
              placeholder="Tình trạng"
              name="tinhTrang"
              value={tinhTrang}
              onChange={e => onInputChange(e)}>
            </input>
          </div>

        </div>


        <div style={{ marginTop: '26%' }}>

          {/* Nơi sản xuất */}
          <div style={{ width: '100%' }}>
            <text>Nơi sản xuất : </text>
            <input
              style={{width: '72%', height: '30px', fontSize: '19px' }}
              type="text"
              placeholder="Nơi sản xuất"
              name="noiSanXuat"
              value={noiSanXuat}
              onChange={e => onInputChange(e)}>
            </input>
          </div>

        </div>

        {/* Chi tiết */}
        <div style={{ marginTop: '2%', marginBottom: '2%' }}>
          <text>Chi tiết : </text>
          <input
            style={{ width: '80%', height: '200px', fontSize: '19px' }}
            type="text"
            placeholder="Chi tiết"
            name="chiTiet"
            value={chiTiet}
            onChange={e => onInputChange(e)}>
          </input>
        </div>
      </div>

      <button onClick={updateEmployee} style={{ width: '70%', height: '50px', marginBottom: '1%' }}>Cật Nhật</button>
      <button onClick={huySua} style={{ width: '70%', height: '50px', marginBottom: '5%' }}>Hủy</button>


    </div>
  );
};

export default Editproduct;
