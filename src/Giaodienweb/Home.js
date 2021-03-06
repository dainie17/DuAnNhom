/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {

    const [query, setQuery] = useState("");

    const getData = async () => {
        const baseUrl = "http://localhost:5000/laydulieu5sp/"+counter;
        const response = await axios.get(baseUrl);
        setListSP(response.data);
      };

    const [listSP, setListSP] = useState([]);
    const [counter, setCounter] = useState(1);
    let incrementCounter = () =>{
        setCounter(counter + 1);
        console.log(counter);
      }
    let decrementCounter = () =>{
        setCounter(counter - 1);
      } 
      if (counter <= 1) {
        decrementCounter = () => setCounter(1);
      }

      function Display(props) {
        return <label style={{ marginLeft: ".5rem" }}>{props.message}</label>;
      }    
    // const getSanPham = async () => {
    //     const baseurl = 'http://localhost:5000/listSP';
    //     const response = await axios.get(baseurl);
    //     setListSP(response.data);
    // }
    
    const deleteSP = (idSP, uri) => {
        axios
        .post("http://localhost:5000/deleteSP", {
            idXoa: idSP,
            urixoa: uri,
        })
        .then((response) => {
            if (response.data === "ok") {
            alert("Xóa thành công");
            console.log(response.data);
            // getSanPham();
            getData();
            }
        });
        console.log(uri);
    };

    useEffect(() => {
        // getSanPham();
        getData();
    })

    const linkStyle = {color: 'white'}

    return (
        <div className="container">

        <nav>
                    <h3>logo</h3>
                    <ul className="nav-ul"> 
                        <li>
                            <Link href="/" style={linkStyle}>Trang Chủ</Link>
                        </li>
                        <li>
                            <a href="/products" style={linkStyle}>Thêm Sản Phẩm</a>
                        </li>
                        <li>
                            <a href="/about" style={linkStyle}>Quản Lý Danh Mục</a>
                        </li>
                    </ul>
        </nav>

            <div className="panel-heading">LIST ITEM :</div>
            <div style={{ marginBottom: 20, fontFamily: 'bold' }}>
               
            <div className='tkR'>
            <input style={{boxShadow: "1px 1px black", width: '30%', height: '30px'}} type="text" placeholder='Tìm kiếm ...' className='seach'
              onChange={(e) => setQuery(e.target.value)} />
          </div>

            </div>
            <table className="table-hover">
                <thead>
                    <tr>
                        <th style={{ width: '2%', backgroundColor: 'green' }}>ID</th>
                        <th style={{ width: '7%', backgroundColor: 'green' }}>hình ảnh</th>
                        <th style={{ width: '10%', backgroundColor: 'green' }}>Tên</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Giá</th>
                        <th style={{ width: '15%', backgroundColor: 'green' }}>Chi tiết</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Ngày tạo</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Danh mục</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Tình trạng</th>
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Hạn sử dụng</th>
                        <th style={{ width: '10%', backgroundColor: 'green' }}>Nơi sản xuất</th>
                        <th style={{ width: '3%', backgroundColor: 'green' }}>Số lượng</th>                       
                        <th style={{ width: '5%', backgroundColor: 'green' }}>Ation</th>
                    </tr>
                </thead>
                <tbody>

                    {listSP.filter((listSP) =>
                    listSP.tenSP.toLowerCase().includes(query)
                    ).map((item) =>
                        <tr>
                            <td>{item.idSanPham}</td>
                            <td><img style={{width: '100%'}} src={"http://localhost:5000/uploads/"+item.hinh} /></td>
                            <td>{item.tenSP}</td>
                            <td>{item.giaSP}/{item.donVi}</td>
                            <td>{item.chiTiet}</td>
                            <td>{item.ngayTao}</td>
                            <td>{item.maDanhMuc}</td>
                            <td>{item.tinhTrang}</td>
                            <td>{item.hanSuDung}</td>
                            <td>{item.noiSanXuat}</td>
                            <td>{item.soLuong} {item.donViSL}</td>                         
                            <td>
                            <Link to={`/editsanpham/${item.idSanPham}`} style={{ fontSize: '15px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', paddingLeft: '12px', paddingRight: '12px', boxShadow: '2px 2px black' }}>
                                Sửa
                            </Link>
                                <button onClick={() => {
                                    const confirmBox = window.confirm(
                                        "Bạn chắc chắn muốn xóa sản phẩm : " + item.tenSP + ""
                                    );
                                    if (confirmBox === true) {
                                        deleteSP(item.idSanPham, item.hinh);
                                    }
                                    }} type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Xóa</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        <button style={{ marginLeft: ".5rem" }} onClick={decrementCounter}>
            Trang trước
          </button>
        <Display  message={counter} />
        <button style={{ marginLeft: ".5rem" }} onClick={incrementCounter}>
            Trang tiếp
        </button>
        </div>
    )
}

export default Home