import React, { useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";
import axios from 'axios'

const Home = () => {

    const [listSP, setListSP] = useState([]);

    const getSanPham = async() => {
        const baseurl = 'http://192.168.1.98:5000/listSP';
        const response = await axios.get(baseurl);
        setListSP(response.data);
    }

    useEffect(() => {
        getSanPham();
    })

     return (
            <div className="container">

                    <div className="panel-heading">LIST ITEM :</div>
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: '2%', backgroundColor: 'green'}}>ID</th>
                                <th style={{ width: '10%', backgroundColor: 'green'}}>Tên</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Giá</th>
                                <th style={{ width: '15%', backgroundColor: 'green'}}>Chi tiết</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Ngày tạo</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Danh mục</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Tình trạng</th>
                                <th style={{ width: '3%', backgroundColor: 'green'}}>Đơn vị</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Hạn sử dụng</th>
                                <th style={{ width: '10%', backgroundColor: 'green'}}>Nơi sản xuất</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Số lượng</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Danh mục nhỏ</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Ation</th>
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
                                    <button type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Delete</button>                                     
                                </td>
                            </tr>      
                            )}
                                                                   
                        </tbody>
                    </table>

            </div>
     )
}

export default Home