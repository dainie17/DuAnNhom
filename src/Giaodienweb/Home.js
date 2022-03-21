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
    
        onOpenModal()
      }

      function onUpdate(dataUpdate) {
        axios.post('http://192.168.1.98:5000/updateSP/', {dataUpdate , idSanPhamSua: idSanPhamSua })
        .then(response => {
          if (response.data === 'ok') {
            alert('SỬa thành công')       
          }
        });
      }
    


    const [listSP, setListSP] = useState([]);

    const getSanPham = async () => {
        const baseurl = 'http://192.168.1.98:5000/listSP';
        const response = await axios.get(baseurl);
        setListSP(response.data);
    }

    const deleteSP = (idSanPham) => {
        axios.post('http://192.168.1.98:5000/deleteSP/', { idXoaSP: idSanPham })
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
            <div>
                <Link to="/products">
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
                                <button type="button" style={{ width: '40%', backgroundColor: 'blue', color: 'white', marginRight: '3%' }}>Edit</button>
                                <button onClick={() => updatePost(item)}>Sửa</button>
                                <button onClick={() => deleteSP(item.idSanPham)} type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Delete</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>

            <Modal open={open} onClose={() => onCloseModal()}>
            <form style={{width: '80%'}} onSubmit={handleSubmit(onUpdate)}>
              <input defaultValue={tenSPSua} placeholder="tên sản phẩm" {...register("tenSPSua")} />
              <input defaultValue={giaSPSua} placeholder="giá sản phẩm" {...register("giaSPSua")} />
              <button type="submit">Sửa</button>
            </form>
            
          </Modal>


        </div>
    )
}

export default Home