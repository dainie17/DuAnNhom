/* eslint-disable jsx-a11y/alt-text */
import React, {useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Link } from 'react-router-dom';


const Login = () => {

    return (
        <div style={{width:'100%', alignItems: 'center', textAlign: 'center'}}>
            <div style={{width: '50%', background: 'green', alignItems: 'center', textAlign: 'center', marginLeft: '20%', marginTop: '15%',marginBottom: '8%', padding: '5%', boxShadow: '10px 10px #666'}}>

                <input type="text" style={{ width: '40%', height: '30px', marginBottom: '4%' }} placeholder="Nhập tài khoản" />
                <input type="text" style={{ width: '40%', height: '30px', marginRight: '4%', marginBottom: '4%' }} placeholder="Nhập mật khẩu" />
                
                <form style={{ marginBottom: '20px' }}>
                 <Link to="/home" style={{ fontSize: 25 }}>
                    Đăng Nhập
                </Link>
                <br/>
                <Link to="/sigup" style={{ fontSize: 25 }}>
                    Đăng Ký
                </Link>
                 </form>

            </div>   
        </div>
    )
}

export default Login