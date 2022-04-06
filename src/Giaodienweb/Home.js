/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";

const Home = () => {

    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    
      });

    const uploadFile =(event)=>{
        setuserInfo({
          ...userInfo,
          file:event.target.files[0],
          filepreview:URL.createObjectURL(event.target.files[0]),
        })
        const data = new FormData() ;
        data.append('file', event.target.files[0]);
        console.log(data);
      
        axios.post("http://10.22.194.204:5000/uploadFileAPI", data)
            .then(res => { 
              console.log(res.data);
            })
      }

    const { register, handleSubmit } = useForm();
    const [idSanPhamSua, setidSanPhamSua] = useState();
    const [tenSPSua, settenSPSua] = useState();
    const [giaSPSua, setgiaSPSua] = useState();
    const [chiTietSua, setChiTietSua] = useState();
    const [ngayTaoSua, setngayTaoSua] = useState();
    const [maDanhMucSua, setmaDanhMucSua] = useState();
    const [tinhTrangSua, settinhTrangSua] = useState();
    const [donViSua, setdonViSua] = useState();
    const [hanSuDungSua, sethanSuDungSua] = useState();
    const [noiSanXuatSua, setnoiSanXuatSua] = useState();
    const [soLuongSua, setsoLuongSua] = useState();
    const [hinhSua, setHinhSua] = useState();
    const [donViSLSua, setdonViSLSua] = useState();

    const [open, setOpen] = useState(false);

    function onOpenModal() {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false)
    };

    const updatePost = (item) => {
        setidSanPhamSua(item.idSanPham);
        settenSPSua(item.tenSP);
        setgiaSPSua(item.giaSP);
        setChiTietSua(item.chiTiet);
        setngayTaoSua(item.ngayTao);
        setmaDanhMucSua(item.maDanhMuc);
        settinhTrangSua(item.tinhTrang);
        setdonViSua(item.donVi);
        sethanSuDungSua(item.hanSuDung);
        setnoiSanXuatSua(item.noiSanXuat);
        setsoLuongSua(item.soLuong);
        setHinhSua(item.hinh);
        setdonViSLSua(item.donViSL);

        onOpenModal()
      }

      function onUpdate(dataUpdate) {
        axios.post('http://10.22.194.204:5000/updateSP/', {dataUpdate , idSanPhamSua: idSanPhamSua })
        .then(response => {
          if (response.data === 'ok') {
            alert('SỬa thành công')       
          }
        });
      }
    


    const [listSP, setListSP] = useState([]);

    const getSanPham = async () => {
        const baseurl = 'http://10.22.194.204:5000/listSP';
        const response = await axios.get(baseurl);
        setListSP(response.data);
    }

    
    const deleteSP = (idSP, uri) => {
        axios
        .post("http://10.22.194.204:5000/deleteSP", {
            idXoa: idSP,
            urixoa: uri,
        })
        .then((response) => {
            if (response.data === "ok") {
            alert("Xóa thành công");
            console.log(response.data);
            getSanPham();
            }
        });
        console.log(uri);
    };

    useEffect(() => {
        getSanPham();
    })

    return (
        <div className="container">

            <div className="panel-heading">LIST ITEM :</div>
            <div style={{ marginBottom: 20, fontFamily: 'bold' }}>
                <Link to="/products" style={{ fontSize: 25 }}>
                    Thêm sản phẩm
                </Link>

            </div>
            <table className="table-hover">
                <thead>
                    <tr>
                        <th style={{ width: '2%', backgroundColor: 'green' }}>ID</th>
                        <th style={{ width: '7%', backgroundColor: 'green' }}>hình ảnh</th>
                        <th style={{ width: '10%', backgroundColor: 'green' }}>Tên</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Giá</th>
                        <th style={{ width: '15%', backgroundColor: 'green' }}>Chi tiết</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Ngày tạo</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Danh mục</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Tình trạng</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Hạn sử dụng</th>
                        <th style={{ width: '10%', backgroundColor: 'green' }}>Nơi sản xuất</th>
                        <th style={{ width: '3%', backgroundColor: 'green' }}>Số lượng</th>                       
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Ation</th>
                    </tr>
                </thead>
                <tbody>

                    {listSP.map((item) =>
                        <tr>
                            <td>{item.idSanPham}</td>
                            <td><img style={{width: '100%'}} src={"http://10.22.194.204:5000/uploads/"+item.hinh} /></td>
                            <td>{item.tenSP}</td>
                            <td>{item.giaSP}/{item.donVi}</td>
                            <td>{item.chiTiet}</td>
                            <td>{item.ngayTao}</td>
                            <td>{item.maDanhMuc}</td>
                            <td>{item.tinhTrang}</td>
                            <td>{item.hanSuDung}</td>
                            <td>{item.noiSanXuat}</td>
                            <td>{item.soLuong} {item.donViSL}</td>                         
                            <td>
                            <Link to={`/editsanpham/${item.idSanPham}`} style={{ fontSize: 15 }}>
                                Sửa
                            </Link>
                                <button onClick={() => {
                                    const confirmBox = window.confirm(
                                        "Bạn chắc chắn muốn xóa sản phẩm : " + item.tenSP + ""
                                    );
                                    if (confirmBox === true) {
                                        deleteSP(item.idSanPham, item.hinh);
                                    }
                                    }} type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Xóa</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>

            <Modal open={open} onClose={() => onCloseModal()}>
            <form style={{width: '100%'}} onSubmit={handleSubmit(onUpdate)}>
                <p>Tên sản phẩm :</p>
                <input defaultValue={tenSPSua} placeholder="tên sản phẩm" {...register("tenSPSua")} />
                <p>Giá sản phẩm :</p>
                <input defaultValue={giaSPSua} placeholder="giá sản phẩm" {...register("giaSPSua")} />
                <p>Chi tiết sản phẩm :</p>
                <input defaultValue={chiTietSua} placeholder="Chi tiết" {...register("chiTietSua")} />
                <p>Ngày thêm sản phẩm :</p>
                <input defaultValue={ngayTaoSua} placeholder="ngày tạo" {...register("ngayTaoSua")} />
                <p>Danh mục sản phẩm :</p>
                <input defaultValue={maDanhMucSua} placeholder="danh mục" {...register("maDanhMucSua")} />
                <p>Tình trạng sản phẩm :</p>
                <input defaultValue={tinhTrangSua} placeholder="tình trạng" {...register("tinhTrangSua")} />
                <p>Đơn vị sản phẩm :</p>
                <input defaultValue={donViSua} placeholder="Đơn vị" {...register("donViSua")} />
                <p>Hạn sử dụng sản phẩm :</p>
                <input defaultValue={hanSuDungSua} placeholder="Hạn sử dụng" {...register("hanSuDungSua")} />
                <p>Nơi sản xuất sản phẩm :</p>
                <input defaultValue={noiSanXuatSua} placeholder="Nơi sản xuất" {...register("noiSanXuatSua")} />
                <p>Số lượng sản phẩm :</p>
                <input defaultValue={soLuongSua} placeholder="số lượng" {...register("soLuongSua")} />
                <p>Đơn vị số lượng sản phẩm :</p>
                <input defaultValue={donViSLSua} placeholder="Đơn vị số lượng" {...register("donViSLSua")} />
                <p>Sửa hình ảnh</p>
                <input 
                        onChange={uploadFile}
                        className="form-control"
                                    
                                    type="file"
                                />
                                 {userInfo.filepreview !== null ?
                                    <img style={{width: "380"}} className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                                    : null} 

                                {userInfo.filepreview === null ? 
                                        <img style={{width: '380'}} src={"http://10.22.194.204:5000/uploads/"+hinhSua} />       
                                    : null}
                
                <button type="submit">Sửa</button>
            </form>
            
          </Modal>


        </div>
    )
}

export default Home