/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";

const Home = () => {

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
    const [maDanhMucNhoSua, setmaDanhMucNhoSua] = useState();
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
        setmaDanhMucNhoSua(item.maDanhMucNho);
        setdonViSLSua(item.donViSL);

        onOpenModal()
      }

      function onUpdate(dataUpdate) {
        axios.post('http://10.22.196.253:5000/updateSP/', {dataUpdate , idSanPhamSua: idSanPhamSua })
        .then(response => {
          if (response.data === 'ok') {
            alert('SỬa thành công')       
          }
        });
      }
    


    const [listSP, setListSP] = useState([]);

    const getSanPham = async () => {
        const baseurl = 'http://10.22.196.253:5000/listSP';
        const response = await axios.get(baseurl);
        setListSP(response.data);
    }

    const deleteSP = (idSanPham) => {
        axios.post('http://10.22.196.253:5000/deleteSP/', { idXoaSP: idSanPham })
            .then(response => {
                if (response.data === 'ok') {
                    alert('xóa thành công')                  
                }
            });

    }

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
                        <th style={{ width: '10%', backgroundColor: 'green' }}>Tên</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Giá</th>
                        <th style={{ width: '15%', backgroundColor: 'green' }}>Chi tiết</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Ngày tạo</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Danh mục</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Tình trạng</th>
                        <th style={{ width: '3%', backgroundColor: 'green' }}>Đơn vị</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Hạn sử dụng</th>
                        <th style={{ width: '10%', backgroundColor: 'green' }}>Nơi sản xuất</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Số lượng</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Danh mục nhỏ</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Ation</th>
                    </tr>
                </thead>
                <tbody>

                    {listSP.map((item) =>
                        <tr>
                            <td>{item.idSanPham}</td>
                            <td>{item.tenSP}</td>
                            <td>{item.giaSP}</td>
                            <td>{item.chiTiet}</td>
                            <td>{item.ngayTao}</td>
                            <td>{item.maDanhMuc}</td>
                            <td>{item.tinhTrang}</td>
                            <td>{item.donVi}</td>
                            <td>{item.hanSuDung}</td>
                            <td>{item.noiSanXuat}</td>
                            <td>{item.soLuong}, {item.donViSL}</td>
                            <td>{item.maDanhMucNho}</td>
                            <td>
                                {/* <button type="button" style={{ width: '40%', backgroundColor: 'blue', color: 'white', marginRight: '3%' }}>Edit</button> */}
                                <button style={{ width: '40%', backgroundColor: 'blue', color: 'white', marginRight: '3%' }} onClick={() => updatePost(item)}>Sửa</button>
                                <button onClick={() => deleteSP(item.idSanPham)} type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Delete</button>
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
                <p>Tên sản phẩm :</p>
                <input defaultValue={chiTietSua} placeholder="Chi tiết" {...register("chiTietSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={ngayTaoSua} placeholder="ngày tạo" {...register("ngayTaoSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={maDanhMucSua} placeholder="danh mục" {...register("maDanhMucSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={tinhTrangSua} placeholder="tình trạng" {...register("tinhTrangSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={donViSua} placeholder="Đơn vị" {...register("donViSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={hanSuDungSua} placeholder="Hạn sử dụng" {...register("hanSuDungSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={noiSanXuatSua} placeholder="Nơi sản xuất" {...register("noiSanXuatSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={soLuongSua} placeholder="số lượng" {...register("soLuongSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={donViSLSua} placeholder="Đơn vị số lượng" {...register("donViSLSua")} />
                <p>Tên sản phẩm :</p>
                <input defaultValue={maDanhMucNhoSua} placeholder="danh mục nhỏ" {...register("maDanhMucNhoSua")} />
                <button type="submit">Sửa</button>
            </form>
            
          </Modal>


        </div>
    )
}

export default Home