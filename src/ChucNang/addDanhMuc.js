/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Adddanhmuc = () => {
  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const [listcate, setLicate] = useState([]);

  const getdanhmuc = async () => {
    const baseurl = 'http://localhost:5000/listdm0';
    const response = await axios.get(baseurl);
    setLicate(response.data);
  }

  useEffect(() => {
    getdanhmuc();
  }, []);

  const onSubmit = data => {
    axios.post('http://localhost:5000/AddDanhMuc', data)
      .then(response => {
        if (response.data === 'ok') {
          alert('thêm thành công');
          history.push("/about");
        }
      });
  }

  const huySua = () => {
    history.push("/about");
  }

  return (
    <div style={{ width: '100%', alignItems: 'center', textAlign: 'center' }}>
      <h2>Thêm Danh Mục</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '70%', marginLeft: '15%' }}>
        <input style={{width: '60%',height: '50px',}} placeholder="Nhập tên danh mục" {...register("tenDanhMuc")} />
        <select style={{width: '30%',height: '58px', marginLeft: '9%'}} {...register("idcha")}>
          <option value={0}>Danh mục mới</option>
          {listcate.map((item) =>
            <option key={item.idDanhMuc} value={item.idDanhMuc}>{item.tenDanhMuc}</option>
          )}
        </select>
        <button type="submit" style={{ width: '100%', height: '50px', marginBottom: '0.1%', marginTop: '2%' }}>Thêm danh mục</button>
        <button onClick={huySua} style={{ width: '100%', height: '50px', marginBottom: '5%', marginTop: '2%' }}>Hủy thêm</button>
      </form>

    </div>
  );
};

export default Adddanhmuc;
