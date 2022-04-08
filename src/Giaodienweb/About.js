import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { Link } from 'react-router-dom';

const About = () => {
    

    const { register, handleSubmit } = useForm();
    const [listcate, setLicate] = useState([]);
    const [listAllCate, setAllliCate] = useState([]);

    const onSubmit = data => {
        axios.post('http://localhost:5000/AddDanhMuc', data)
            .then(response => {
                if (response.data === 'ok') {
                    alert('thêm thành công');
                }
            });
    }

    useEffect(() => {
        getdanhmuc();
        getDanhMuc();
    })

    const getdanhmuc = async () => {
        const baseurl = 'http://localhost:5000/listdm';
        const response = await axios.get(baseurl);
        setLicate(response.data);
    }

    const getDanhMuc = async () => {
        const baseurl = 'http://localhost:5000/listALLDM';
        const response = await axios.get(baseurl);
        setAllliCate(response.data);
    }

    const deleteCate = (idDanhMuc) => {
        axios.post('http://localhost:5000/deleteDM/', { idXoa: idDanhMuc })
            .then(response => {
                if (response.data === 'ok') {
                    alert('xóa thành công')             
                }
            });          
    }

      const linkStyle = {color: 'white'}
    return (

        <div className="container">

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

            <h3>Thêm danh mục :</h3>

            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
                <input placeholder="Nhập tên danh mục" {...register("tenDanhMuc")} />
                <select {...register("idcha")}>
                    <option value={0}>Danh mục mới</option>
                    {listcate.map((item) =>
                        <option key={item.idDanhMuc} value={item.idDanhMuc}>{item.tenDanhMuc}</option>
                    )}
                </select>
                <input type="submit" />
            </form>

            <table className="table-hover">
                <thead>
                    <tr>
                        <th style={{ width: '2%', backgroundColor: 'green' }}>ID</th>
                        <th style={{ width: '10%', backgroundColor: 'green' }}>Tên</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Id cha</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Ation</th>
                    </tr>
                </thead>
                <tbody>

                    {listAllCate.map((item) =>
                        <tr>
                            <td>{item.idDanhMuc}</td>
                            <td>{item.tenDanhMuc}</td>
                            <td>{item.idCha}</td>
                            <td>                               
                            <Link to={`/editdanhmuc/${item.idDanhMuc}`} style={{ fontSize: '15px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', paddingLeft: '12px', paddingRight: '12px', boxShadow: '2px 2px black' }}>
                                Sửa
                            </Link>
                                <button onClick={() => deleteCate(item.idDanhMuc)} type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Delete</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>                      

        </div>

    )
}

export default About