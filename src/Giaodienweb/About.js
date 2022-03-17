import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'

const About = () => {
    const { register, handleSubmit } = useForm();
    const [listcate, setLicate] = useState([]);
    const [listCate, setLiCate] = useState([]);
    const onSubmit = data => {
        axios.post('http://192.168.1.23:5000/AddDanhMuc', data)
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
        const baseurl = 'http://192.168.1.23:5000/listdm';
        const response = await axios.get(baseurl);
        setLicate(response.data);
    }

    const getDanhMuc = async () => {
        const baseurl = 'http://192.168.1.23:5000/listDM';
        const response = await axios.get(baseurl);
        setLiCate(response.data);
    }

    const deleteCate = (idDanhMuc) => {
        axios.post('http://192.168.1.23:5000/deletePost/', { idXoa: idDanhMuc })
            .then(response => {
                if (response.data === 'ok') {
                    alert('xóa thành công')
                    getdanhmuc();
                    getDanhMuc();
                }
            });

    }

    return (

        <div className="container">

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
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Giá</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Ation</th>
                    </tr>
                </thead>
                <tbody>

                    {listCate.map((item) =>
                        <tr>
                            <td>{item.idDanhMuc}</td>
                            <td>{item.tenDanhMuc}</td>
                            <td>{item.idCha}</td>
                            <td>
                                <button type="button" style={{ width: '40%', backgroundColor: 'blue', color: 'white', marginRight: '3%' }}>Edit</button>
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