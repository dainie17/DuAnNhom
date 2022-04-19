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
    const baseurl = 'http://localhost:5000/listDM';
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

  const huySua = () => {
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

      {/* Container right                      */}
      <div style={{ width: '40%', float: 'left', marginLeft: '5%', marginTop: '2%', border: '1px solid black' }}>

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

        <div style={{ width: '80%', marginLeft: '11%', marginTop: '2%' }}>

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

            <select style={{ width: '15%', float: 'left', height: '35px', fontSize: '19px' }} name='donVi' onChange={e => onInputChange(e)}>

              <option key={"g"} value={"g"}>g</option>
              <option key={"kg"} value={"kg"}>kg</option>
              <option key={"yến"} value={"yến"}>yến</option>
              <option key={"tạ"} value={"tạ"}>tạ</option>
              <option key={"tấn"} value={"tấn"}>tấn</option>

            </select>
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
          <div style={{ width: '50%', marginLeft: '5%', float: 'left', marginTop: '2%' }}>
            <text>Hạn sử dụng : </text>
            <select style={{ width: '25%', height: '37px' }} name='hanSuDung' onChange={e => onInputChange(e)}>

                    <option key={"Không có hạn sử dụng"} value={"Không có hạn sử dụng"}>Không có hạn sử dụng</option>
                    <option key={"1 Tuần"} value={"1 Tuần"}>1 Tuần</option>
                    <option key={"2 Tuần"} value={"2 Tuần"}>2 Tuần</option>
                    <option key={"3 Tuần"} value={"3 Tuần"}>3 Tuần</option>
                    <option key={"1 Tháng"} value={"1 Tháng"}>1 Tháng</option>
                    <option key={"2 Tháng"} value={"2 Tháng"}>2 Tháng</option>
                    <option key={"3 Tháng"} value={"3 Tháng"}>3 Tháng</option>
                    <option key={"4 Tháng"} value={"4 Tháng"}>4 Tháng</option>
                    <option key={"5 Tháng"} value={"5 Tháng"}>5 Tháng</option>
                    <option key={"6 Tháng"} value={"6 Tháng"}>6 Tháng</option>
                    <option key={"7 Tháng"} value={"7 Tháng"}>7 Tháng</option>
                    <option key={"8 Tháng"} value={"8 Tháng"}>8 Tháng</option>
                    <option key={"9 Tháng"} value={"9 Tháng"}>9 Tháng</option>
                    <option key={"10 Tháng"} value={"10 Tháng"}>10 Tháng</option>
                    <option key={"11 Tháng"} value={"11 Tháng"}>11 Tháng</option>
                    <option key={"1 Năm"} value={"1 Năm"}>1 Năm</option>

                </select>
          </div>

          {/* Số lượng             */}
          <div style={{ width: '40%', float: 'left', marginLeft: '2%', marginTop: '2%' }}>
            <text>Số lượng : </text>
            <input
              style={{ width: '40%', height: '30px', fontSize: '19px' }}
              type="number"
              placeholder="Số lượng"
              name="soLuong"
              value={soLuong}
              onChange={e => onInputChange(e)}>
            </input>
            <select style={{ width: '20%', height: '35px', fontSize: '19px' }} name='donViSL' onChange={e => onInputChange(e)}>

              <option key={"g"} value={"g"}>g</option>
              <option key={"kg"} value={"kg"}>kg</option>
              <option key={"yến"} value={"yến"}>yến</option>
              <option key={"tạ"} value={"tạ"}>tạ</option>
              <option key={"tấn"} value={"tấn"}>tấn</option>

            </select>
          </div>

        </div>

        <div style={{ width: '100%' }}>

          {/* Danh mục */}
          <div style={{ width: '50%', marginTop: '2%', float: 'left', marginLeft: '2%' }}>
            <text>Danh mục : </text>
            <select style={{ height: '30px', fontSize: '19px' }} name='maDanhMuc' onChange={e => onInputChange(e)}>
              <option value={maDanhMuc}>Danh mục hiện tại</option>
              {listcate.map((item) =>
                <option key={item.tenDanhMuc} value={item.tenDanhMuc}>{item.tenDanhMuc}</option>
              )}
            </select>
          </div>

          {/* Tình trạng */}
          <div style={{ width: '40%', marginTop: '2%', float: 'left' }}>
            <text>Tình trạng : </text>
            <select style={{ width: '30%', height: '30px', fontSize: '19px' }} name='tinhTrang' onChange={e => onInputChange(e)}>

              <option key={"Đủ"} value={"Đủ"}>Đủ</option>
              <option key={"Hết hàng"} value={"Hết hàng"}>Hết hàng</option>

            </select>
          </div>

        </div>


        <div style={{ marginTop: '26%' }}>

          {/* Nơi sản xuất */}
          <div style={{ width: '100%' }}>
            <text>Nơi sản xuất : </text>
            <select style={{ width: '72%', height: '30px', fontSize: '19px' }} name='noiSanXuat' onChange={e => onInputChange(e)}>

                    <option key={"Kon Tum"} value={"Kon Tum"}>Kon Tum</option>
                    <option key={"Gia Lai"} value={"Gia Lai"}>Gia Lai</option>
                    <option key={"Đăk Lăk"} value={"Đăk Lăk"}>Đăk Lăk</option>
                    <option key={"Đăk Nông"} value={"Đăk Nông"}>Đăk Nông</option>
                    <option key={"Lâm Đồng"} value={"Lâm Đồng"}>Lâm Đồng</option>
                    <option key={"Đà Nẵng"} value={"Đà Nẵng"}>Đà Nẵng</option>
                    <option key={"Quảng Nam"} value={"Quảng Nam"}>Quảng Nam</option>
                    <option key={"Quảng Ngãi"} value={"Quảng Ngãi"}>Quảng Ngãi</option>
                    <option key={"Bình Định"} value={"Bình Định"}>Bình Định</option>
                    <option key={"Phú Yên"} value={"Phú Yên"}>Phú Yên</option>
                    <option key={"Khánh Hòa"} value={"Khánh Hòa"}>Khánh Hòa</option>
                    <option key={"Ninh Thuận"} value={"Ninh Thuận"}>Ninh Thuận</option>
                    <option key={"Bình Thuận"} value={"Bình Thuận"}>Bình Thuận</option>
                    <option key={"Thanh Hóa"} value={"Thanh Hóa"}>Thanh Hóa</option>
                    <option key={"Nghệ An"} value={"Nghệ An"}>Nghệ An</option>
                    <option key={"Hà Tĩnh"} value={"Hà Tĩnh"}>Hà Tĩnh</option>
                    <option key={"Quảng Bình"} value={"Quảng Bình"}>Quảng Bình</option>
                    <option key={"Quảng Trị"} value={"Quảng Trị"}>Quảng Trị</option>
                    <option key={"Thừa Thiên Huế"} value={"Thừa Thiên Huế"}>Thừa Thiên Huế</option>
                    <option key={"TP Hồ Chí Minh"} value={"TP Hồ Chí Minh"}>TP Hồ Chí Minh</option>
                    <option key={"Bà Rịa Vũng Tàu"} value={"Bà Rịa Vũng Tàu"}>Bà Rịa Vũng Tàu</option>
                    <option key={"Bình Dương"} value={"Bình Dương"}>Bình Dương</option>
                    <option key={"Bình Phước"} value={"Bình Phước"}>Bình Phước</option>
                    <option key={"Đồng Nai"} value={"Đồng Nai"}>Đồng Nai</option>
                    <option key={"Tây Ninh"} value={"Tây Ninh"}>Tây Ninh</option>
                    <option key={"An Giang"} value={"An Giang"}>An Giang</option>
                    <option key={"Bạc Liêu"} value={"Bạc Liêu"}>Bạc Liêu</option>
                    <option key={"Bến Tre"} value={"Bến Tre"}>Bến Tre</option>
                    <option key={"Cà Mau"} value={"Cà Mau"}>Cà Mau</option>
                    <option key={"Cần Thơ"} value={"Cần Thơ"}>Cần Thơ</option>
                    <option key={"Đồng Tháp"} value={"Đồng Tháp"}>Đồng Tháp</option>
                    <option key={"Hậu Giang"} value={"Hậu Giang"}>Hậu Giang</option>
                    <option key={"Kiên Giang"} value={"Kiên Giang"}>Kiên Giang</option>
                    <option key={"Long An"} value={"Long An"}>Long An</option>
                    <option key={"Sóc Trăng"} value={"Sóc Trăng"}>Sóc Trăng</option>
                    <option key={"Tiền Giang"} value={"Tiền Giang"}>Tiền Giang</option>
                    <option key={"Trà Vinh"} value={"Trà Vinh"}>Trà Vinh</option>
                    <option key={"Vĩnh Long"} value={"Vĩnh Long"}>Vĩnh Long</option>
                    <option key={"Hòa Bình"} value={"Hòa Bình"}>Hòa Bình</option>
                    <option key={"Sơn La"} value={"Sơn La"}>Sơn La</option>
                    <option key={"Điện Biên"} value={"Điện Biên"}>Điện Biên</option>
                    <option key={"Lai Châu"} value={"Lai Châu"}>Lai Châu</option>
                    <option key={"Lào Cai"} value={"Lào Cai"}>Lào Cai</option>
                    <option key={"Yên Bái"} value={"Yên Bái"}>Yên Bái</option>
                    <option key={"Phú Thọ"} value={"Phú Thọ"}>Phú Thọ</option>
                    <option key={"Hà Giang"} value={"Hà Giang"}>Hà Giang</option>
                    <option key={"Tuyên Quang"} value={"Tuyên Quang"}>Đồng Tháp</option>
                    <option key={"Cao Bằng"} value={"Cao Bằng"}>Cao Bằng</option>
                    <option key={"Bắc Kạn"} value={"Bắc Kạn"}>Bắc Kạn</option>
                    <option key={"Thái Nguyên"} value={"Thái Nguyên"}>Thái Nguyên</option>
                    <option key={"Lạng Sơn"} value={"Lạng Sơn"}>Lạng Sơn</option>
                    <option key={"Bắc Giang"} value={"Bắc Giang"}>Bắc Giang</option>
                    <option key={"Quảng Ninh"} value={"Quảng Ninh"}>Quảng Ninh</option>
                    <option key={"Hà Nội"} value={"Hà Nội"}>Hà Nội</option>
                    <option key={"Bắc Ninh"} value={"Bắc Ninh"}>Bắc Ninh</option>
                    <option key={"Hà Nam"} value={"Hà Nam"}>Hà Nam</option>
                    <option key={"Hải Dương"} value={"Hải Dương"}>Hải Dương</option>
                    <option key={"Hải Phòng"} value={"Hải Phòng"}>Hải Phòng</option>
                    <option key={"Hưng Yên"} value={"Hưng Yên"}>Hưng Yên</option>
                    <option key={"Nam Định"} value={"Nam Định"}>Nam Định</option>
                    <option key={"Thái Bình"} value={"Thái Bình"}>Thái Bình</option>
                    <option key={"Vĩnh Phúc"} value={"Vĩnh Phúc"}>Vĩnh Phúc</option>
                    <option key={"Ninh Bình"} value={"Ninh Bình"}>Ninh Bình</option>

                </select>
          </div>

        </div>

        {/* Chi tiết */}
        <div style={{ marginTop: '2%', marginBottom: '2%' }}>
          <text>Chi tiết : </text>
          <input
            style={{ width: '80%', height: '255px', fontSize: '19px' }}
            type="text"
            placeholder="Chi tiết"
            name="chiTiet"
            value={chiTiet}
            onChange={e => onInputChange(e)}>
          </input>
        </div>
      </div>


      {/* Container left */}
      <div style={{ width: '40%', float: 'left', alignItems: 'center', textAlign: 'center', marginLeft: '10%', marginTop: '2%' }}>

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

        <button onClick={updateEmployee} style={{ width: '100%', height: '50px', marginBottom: '1%' }}>Cật Nhật</button>
        <button onClick={huySua} style={{ width: '100%', height: '50px', marginBottom: '5%' }}>Hủy</button>

      </div>
    </div>
  );
};

export default Editproduct;
