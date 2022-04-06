/* eslint-disable jsx-a11y/alt-text */
import React, {useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'


const Products = () => {

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
    const onSubmit = data => {
        axios.post('http://10.22.194.204:5000/AddSanPham', data)
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
                    <input type="text" style={{ width: '40%', height: '30px' }} placeholder="Đơn vị số lượng" {...register("donViSL")} />
                    <input type="text" style={{ width: '25%', height: '30px' }} placeholder="Nhập tình trạng" {...register("tinhTrang")} />
                    <input type="text" style={{ width: '25%', height: '30px', margin: '4%' }} placeholder="Nhập hạn sử dụng" {...register("hanSuDung")} />
                    <input type="text" style={{ width: '25%', height: '30px' }} placeholder="Nhập số lượng" {...register("soLuong")} />
                    <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%' }} placeholder="Ngày Tạo" {...register("ngayTao")} />
                    <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%' }} placeholder="Nhập nơi sản xuất" {...register("noiSanXuat")} />
                    <input type="text" style={{ width: '85%', height: '200px' }} placeholder="Nhập mô tả"  {...register("chiTiet")} />
                    <button style={{ width: '85%', height: '50px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', marginTop: '5%' }} type="submit"  >Thêm sản phẩm</button>
                </form>
            </div>

            <div className="container-right">                
            <div class="form-group " >
                    <label
                        for="description"
                        >Hình ảnh </label>
                        <input 
                        onChange={uploadFile}
                        className="form-control"
                                    
                                    type="file"
                                />
                  </div>   
                  <div style={{width: 380}}  >
             
                    {userInfo.filepreview !== null ?
                    <img style={{width: "100%"}} className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                                    : null}
                    
                 </div>
                <button style={{ width: '85%', height: '50px', backgroundColor: 'red', color: 'white', fontWeight: 'bold', marginTop: '1%' }} >Hủy</button>
            </div>

        </div>
    )
}

export default Products