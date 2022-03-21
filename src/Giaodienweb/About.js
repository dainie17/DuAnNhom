import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { Modal } from 'react-responsive-modal';

const About = () => {

    const [open, setOpen] = useState(false);

    function onOpenModal() {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false)
    };

    const updatePost = (item) => {
        setidDanhMucSua(item.idDanhMuc);
        setTenDanhMucSua(item.tenDanhMuc);
        setidChaSua(item.idCha);
    
        onOpenModal()
      }
    

    const { register, handleSubmit } = useForm();
    const [listcate, setLicate] = useState([]);
    const [listCate, setLiCate] = useState([]);

    const onSubmit = data => {
        axios.post('http://192.168.1.98:5000/AddDanhMuc', data)
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
        const baseurl = 'http://192.168.1.98:5000/listdm';
        const response = await axios.get(baseurl);
        setLicate(response.data);
    }

    const getDanhMuc = async () => {
        const baseurl = 'http://192.168.1.98:5000/listDM';
        const response = await axios.get(baseurl);
        setLiCate(response.data);
    }

    const deleteCate = (idDanhMuc) => {
        axios.post('http://192.168.1.98:5000/deleteDM/', { idXoa: idDanhMuc })
            .then(response => {
                if (response.data === 'ok') {
                    alert('xóa thành công')             
                }
            });          
    }

    const [idDanhMucSua, setidDanhMucSua] = useState();
    const [tenDanhMucSua, setTenDanhMucSua] = useState();
    const [idChaSua, setidChaSua] = useState();

    function onUpdate(dataUpdate) {
        axios.post('http://192.168.1.98:5000/updateDM/', {dataUpdate , idDanhMucSua: idDanhMucSua })
        .then(response => {
          if (response.data === 'ok') {
            alert('SỬa thành công')       
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
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Id cha</th>
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
                                <button onClick={() => updatePost(item)}>Sửa</button>
                                <button onClick={() => deleteCate(item.idDanhMuc)} type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Delete</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>                      
             
            <Modal open={open} onClose={() => onCloseModal()}>
            <form style={{width: '80%'}} onSubmit={handleSubmit(onUpdate)}>
              <input defaultValue={tenDanhMucSua} placeholder="tên danh mục" {...register("tenDanhMucSua")} />
              <select {...register("idChaSua")}>
                    <option value={idChaSua}>Danh mục cha hiện tại</option>
                    <option value={0}>Danh mục mới</option>
                    {listcate.map((item) =>
                        <option key={item.idDanhMuc} value={item.idDanhMuc}>{item.tenDanhMuc}</option>
                    )}
                </select>  
              <button type="submit">Sửa</button>
            </form>
            
          </Modal>

        </div>

    )
}

export default About