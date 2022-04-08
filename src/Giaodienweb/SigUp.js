import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Link } from 'react-router-dom';


const Sigup = () => {

    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,

    });

    const uploadFile = (event) => {
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        })
        const data = new FormData();
        data.append('file', event.target.files[0]);
        console.log(data);

        axios.post("http://localhost:5000/uploadFileAPI", data)
            .then(res => {
                console.log(res.data);
            })
    }

    return (
        <div style={{ width: '100%', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '50%', background: 'green', alignItems: 'center', textAlign: 'center', marginLeft: '20%', marginTop: '15%', marginBottom: '8%', padding: '5%', boxShadow: '10px 10px #666' }}>

            <div style={{width: '100%', display: 'inline-flex'}}>

            <div style={{ width: '47%', marginLeft: '2%' }}>
                    <div class="form-group " >
                        <label style={{ color: 'white' }}
                            for="description"
                        >Hình ảnh </label>
                        <input
                            style={{ color: 'white' }}
                            onChange={uploadFile}
                            className="form-control"

                            type="file"
                        />
                    </div>
                    <div style={{ width: "100%" }}  >

                        {userInfo.filepreview !== null ?
                            <img style={{ width: "100%", height: '210px' }} className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                            : null}

                        {userInfo.filepreview === null ?
                            <img style={{ width: '100%', height: '210px' }} src={"https://tincongnghe24h.net/wp-content/uploads/2021/02/giai-nen-file-img.jpg"} />
                            : null}

                    </div>

                </div>

                <div style={{ width: '47%', marginLeft: '2%' }}>

                    <input type="text" style={{ width: '100%', height: '30px', marginBottom: '4%' }} placeholder="Nhập tài khoản" />
                    <input type="text" style={{ width: '100%', height: '30px', marginBottom: '4%' }} placeholder="Nhập mật khẩu" />
                    <input type="text" style={{ width: '100%', height: '30px', marginBottom: '4%' }} placeholder="Giới tính" />
                    <input type="text" style={{ width: '100%', height: '30px', marginBottom: '4%' }} placeholder="Ngày sinh" />
                    <input type="text" style={{ width: '100%', height: '30px', marginBottom: '4%' }} placeholder="Số điện thoại" />

                </div>


            </div>
                  
                <form style={{ marginBottom: '20px' }}>
                    <Link to="/home" style={{ fontSize: 25 }}>
                        Đăng Ký
                    </Link>
                    <br />
                    <Link to="/" style={{ fontSize: 25 }}>
                        Đăng Nhập
                    </Link>
                </form>

            </div>
        </div>
    )
}

export default Sigup