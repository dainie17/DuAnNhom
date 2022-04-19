/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Editdanhmuc = () => {
  const api = 'http://localhost:5000/';
  let history = useHistory();
  const { id } = useParams();

  const [listcate, setLicate] = useState([]);

  const getdanhmuc = async () => {
    const baseurl = 'http://localhost:5000/listdm0';
    const response = await axios.get(baseurl);
    setLicate(response.data);
  }

  // const refreshPage = () => {
  //   window.location.reload();
  // }

  const [trademarkname, settrademarkname] = useState({
    tenDanhMuc: "",
    idCha: "",
  })
  const onInputChange = e => {
    settrademarkname({ ...trademarkname, [e.target.name]: e.target.value });
  };
  const { tenDanhMuc, idCha  } = trademarkname;


  useEffect(() => {
    getdanhmucsua();
    getdanhmuc();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editdanhmuc', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idDanhMuc: id,
        tenDanhMuc: tenDanhMuc,
        idCha: idCha,
      })

    })
      .then((response) => {
        if (response.data === 'ok') {
          alert("sửa thành công");
        }
      });
    console.log("tên đã nhập : " + tenDanhMuc);
    history.push("/about");
  };

  const huySua = () =>{
    history.push("/about");
  }

  // lấy dữ liệu danh mục
  const getdanhmucsua = async () => {
    console.log(id);
    const base_url = api + `layeditdanhmuc/${id}`;
    const response = await axios.get(base_url);
    console.log(response.data);
    console.log(response.data[0].tenDanhMuc);
    settrademarkname({
      update: true,
      tenDanhMuc: response.data[0].tenDanhMuc,
      idCha: response.data[0].idCha,
    })
  };

  return (
    <div style={{ width: '100%', alignItems: 'center', textAlign: 'center' }}>
      <h2>Cập Nhật Danh Mục</h2>

      <h4>ID danh mục: {id} </h4>

        {/* tên danh mục */}
        <div style={{ marginTop: '2%' }}>
          <text>Tên danh mục : </text>
          <input
            style={{ width: '60%', height: '30px', fontSize: '19px' }}
            type="text"
            placeholder="Nhập Tên Danh Mục"
            name="tenDanhMuc"
            value={tenDanhMuc}
            onChange={e => onInputChange(e)}>
          </input>
        </div>

          {/* Danh mục */}
          <div style={{ width:'50%', marginTop: '2%', float: 'left', marginLeft: '1%' }}>
            <text>Danh mục cha : </text>
            <select style={{ height: '30px', fontSize: '19px' }} name='idCha' onChange={e => onInputChange(e)}>
              <option value={idCha}>Danh mục hiện tại</option>
              {listcate.map((item) =>
                <option key={item.idDanhMuc} value={item.idDanhMuc}>{item.tenDanhMuc}</option>
              )}
            </select>
          </div>

      <button onClick={updateEmployee} style={{ width: '70%', height: '50px', marginBottom: '0.1%', marginTop: '2%' }}>Cật Nhật</button>
      <button onClick={huySua} style={{ width: '70%', height: '50px', marginBottom: '5%', marginTop: '2%' }}>Hủy sửa</button>

    </div>
  );
};

export default Editdanhmuc;
