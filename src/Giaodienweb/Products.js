/* eslint-disable jsx-a11y/alt-text */
import React, {useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios'


const Products = () => {

    let history = useHistory();

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
      
        axios.post("http://localhost:5000/uploadFileAPI", data)
            .then(res => { 
              console.log(res.data);
            })
      }

    const { register, handleSubmit } = useForm();
    
    const onSubmit = data => {
        axios.post('http://localhost:5000/AddSanPham', data)
            .then((response) => {
                if (response.data === 'ok') {
                    
                    alert('thêm thành công');  
                                  
                }

            });
            history.push("/");       
    }

    const linkStyle = {color: 'white'}
    return (
        <div className="container1">

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

            <div className="container-left">

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

            </div>

            <div className="container-right">                
            <div class="form-group " >
                    <label style={{color: 'white'}}
                        for="description"
                        >Hình ảnh </label>
                        <input 
                        style={{color: 'white'}}
                        onChange={uploadFile}
                        className="form-control"
                                    
                                    type="file"
                                />
                  </div>   
                  <div style={{width: "100%"}}  >
             
                    {userInfo.filepreview !== null ?
                    <img style={{width: "100%", height: '430px'}} className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                                    : null}
                    
                    {userInfo.filepreview === null ?
                    <img style={{ width: '100%', height: '430px' }} src={"https://tincongnghe24h.net/wp-content/uploads/2021/02/giai-nen-file-img.jpg" } />
                    : null}

                 </div>
                 <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
                 <button style={{ width: '85%', height: '51px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', marginTop: '5%' }} type="submit"  >Thêm sản phẩm</button>
                 </form>
            </div>

        </div>
    )
}

export default Products