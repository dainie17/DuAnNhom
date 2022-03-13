import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'

const About = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [listcate, setLicate] = useState([]);
    const onSubmit = data => {
        axios.post('http://192.168.1.98:5000/AddDanhMuc', data)
        .then(response => {
            if(response.data=='ok'){
                alert('thêm thành công');
            }
        });
    }

    useEffect(() => {
        getdanhmuc();
    })

    const getdanhmuc = async() => {
        const baseurl = 'http://192.168.1.98:5000/listdm';
        const response = await axios.get(baseurl);
        setLicate(response.data);
    }

    return (

         <div className="container">
         
            <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Nhập tên danh mục" {...register("tenDanhMuc")} />
            <select {...register("idcha")}>
            <option value={0}>Danh mục mới</option>
               {listcate.map((item) => 
                   <option key={item.idDanhMuc} value={item.idDanhMuc}>{item.tenDanhMuc}</option>
               )}
            </select>
            <input type="submit" />
            </form>

         </div>

    )
}

export default About