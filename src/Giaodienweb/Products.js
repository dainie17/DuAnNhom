/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios'


const Products = () => {

    const [listcate, setLicate] = useState([]);

    const getdanhmuc = async () => {
        const baseurl = 'http://localhost:5000/listDM';
        const response = await axios.get(baseurl);
        setLicate(response.data);
    }

    useEffect(() => {
        getdanhmuc();
    }, []);

    let history = useHistory();

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

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        if (data.tenSP === "") {
            alert("Tên không được bỏ trông")
            return 0;
        }

        if (data.giaSP === "") {
            alert("Giá không được bỏ trông")
            return 0;
        }

        if (data.soLuong === "") {
            alert("Số lượng không được bỏ trông")
            return 0;
        }

        if (data.chiTiet === "") {
            alert("Mô tả không được bỏ trông")
            return 0;
        }

        axios.post('http://localhost:5000/AddSanPham', data)
            .then((response) => {
                if (response.data === 'ok') {

                    alert('thêm thành công');

                }

            });
        history.push("/");
    }

    const linkStyle = { color: 'white' }
    return (
        <div className="container1">

            <nav>
                <h3>logo</h3>
                <ul className="nav-ul">
                    <li>
                        <a href="/" style={linkStyle}>Trang Chủ</a>
                    </li>
                    <li>
                        <a href="/products" style={linkStyle}>Thêm Sản Phẩm</a>
                    </li>
                    <li>
                        <a href="/about" style={linkStyle}>Quản Lý Danh Mục</a>
                    </li>
                </ul>
            </nav>

            <div className="container-left">

                <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%' }} placeholder="Nhập tên sản phẩm" {...register("tenSP")} />
                <input type="text" style={{ width: '40%', height: '30px', marginRight: '4%', marginBottom: '4%' }} placeholder="Nhập giá sản phẩm" {...register("giaSP")} />
                <select style={{ width: '40%', height: '37px', marginBottom: '4%' }} name='donVi' {...register("donVi")}>

                    <option key={"g"} value={"g"}>g</option>
                    <option key={"kg"} value={"kg"}>kg</option>
                    <option key={"yến"} value={"yến"}>yến</option>
                    <option key={"tạ"} value={"tạ"}>tạ</option>
                    <option key={"tấn"} value={"tấn"}>tấn</option>

                </select>
                <input type="text" style={{ width: '40%', height: '30px' }} placeholder="Nhập số lượng" {...register("soLuong")} />
                <select style={{ width: '40%', height: '37px', marginLeft: '4%' }} name='donViSL' {...register("donViSL")}>

                    <option key={"g"} value={"g"}>g</option>
                    <option key={"kg"} value={"kg"}>kg</option>
                    <option key={"yến"} value={"yến"}>yến</option>
                    <option key={"tạ"} value={"tạ"}>tạ</option>
                    <option key={"tấn"} value={"tấn"}>tấn</option>

                </select>
                <select style={{ width: '25%', height: '37px', marginLeft: '4%' }} name='tinhTrang' {...register("tinhTrang")}>

                    <option key={"Đủ"} value={"Đủ"}>Đủ</option>
                    <option key={"Hết hàng"} value={"Hết hàng"}>Hết hàng</option>

                </select>
                <select style={{ width: '25%', height: '37px', margin: '4%' }} name='hanSuDung' {...register("hanSuDung")}>

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
                <select style={{ width: '25%', height: '37px', marginRight: '4%' }} name='maDanhMuc' {...register("maDanhMuc")}>
                    {listcate.map((item) =>
                        <option key={item.tenDanhMuc} value={item.tenDanhMuc}>{item.tenDanhMuc}</option>
                    )}
                </select>
                <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%' }} placeholder="Ngày Tạo" {...register("ngayTao")} />
                <select style={{ width: '85%', height: '37px', marginBottom: '4%' }} name='noiSanXuat' {...register("noiSanXuat")}>

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
                <input type="text" style={{ width: '85%', height: '200px' }} placeholder="Nhập mô tả"  {...register("chiTiet")} />

            </div>

            <div className="container-right">
                <div class="form-group " >
                    <label style={{ color: 'white' }}
                        for="description"
                    >Hình ảnh </label>
                    <input
                        style={{ color: 'white' }}
                        onChange={uploadFile}
                        className="form-control"

                        type="file"
                    />
                </div>
                <div style={{ width: "100%" }}  >

                    {userInfo.filepreview !== null ?
                        <img style={{ width: "100%", height: '430px' }} className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                        : null}

                    {userInfo.filepreview === null ?
                        <img style={{ width: '100%', height: '430px' }} src={"https://tincongnghe24h.net/wp-content/uploads/2021/02/giai-nen-file-img.jpg"} />
                        : null}

                </div>
                <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
                    <button style={{ width: '85%', height: '51px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', marginTop: '5%' }} type="submit"  >Thêm sản phẩm</button>
                </form>
            </div>

        </div>
    )
}

export default Products