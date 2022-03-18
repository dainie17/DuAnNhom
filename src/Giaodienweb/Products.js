import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'


const Products = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        axios.post('http://10.22.214.218:5000/AddSanPham', data)
            .then(response => {
                if (response.data === 'ok') {
                    alert('thêm thành công');

                }
            });
    }


    return (
        <div className="container1">
            <div className="container-left">
                <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
                    <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%' }} placeholder="Nhập tên sản phẩm" {...register("tenSP")} />
                    <input type="text" style={{ width: '40%', height: '30px', marginRight: '4%', marginBottom: '4%' }} placeholder="Nhập giá sản phẩm" {...register("giaSP")} />
                    <input type="text" style={{ width: '40%', height: '30px', marginBottom: '4%' }} placeholder="Nhập đơn vị" {...register("donVi")} />
                    <input type="text" style={{ width: '40%', height: '30px', marginRight: '4%' }} placeholder="Nhập danh mục" {...register("maDanhMuc")} />
                    <input type="text" style={{ width: '40%', height: '30px' }} placeholder="Số lượng" {...register("donViSL")} />

                    <input type="text" style={{ width: '25%', height: '30px' }} placeholder="Nhập tình trạng" {...register("tinhTrang")} />
                    <input type="text" style={{ width: '25%', height: '30px', margin: '4%' }} placeholder="Nhập hạn sử dụng" {...register("hanSuDung")} />
                    <input type="text" style={{ width: '25%', height: '30px' }} placeholder="Nhập số lượng" {...register("soLuong")} />
                    <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%' }} placeholder="Ngày Tạo" {...register("ngayTao")} />
                    <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%' }} placeholder="Nhập nơi sản xuất" {...register("noiSanXuat")} />
                    <input type="text" style={{ width: '85%', height: '200px' }} o placeholder="Nhập mô tả"  {...register("chiTiet")} />
                    <button style={{ width: '85%', height: '50px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', marginTop: '5%' }} type="submit"  >Thêm sản phẩm</button>
                </form>
            </div>

            <div className="container-right">
                <img style={{ width: '85%', height: '331px' }} src="https://webcoban.vn/image/cat-2.jpg" />
                <button style={{ width: '85%', height: '40px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} >Chọn hình ảnh</button>




                <button style={{ width: '85%', height: '50px', backgroundColor: 'red', color: 'white', fontWeight: 'bold', marginTop: '1%' }} >Hủy</button>
            </div>

        </div>
    )
}

export default Products