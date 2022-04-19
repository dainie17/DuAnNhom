import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const About = () => {
    
    const [listAllCate, setAllliCate] = useState([]);
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
    
    const getDanhMuc = async () => {
        const baseurl = 'http://localhost:5000/listALLDM/'+counter;
        const response = await axios.get(baseurl);
        setAllliCate(response.data);
    }

    const deleteCate = (idDanhMuc) => {
        axios.post('http://localhost:5000/deleteDM/', { idXoa: idDanhMuc })
            .then(response => {
                if (response.data === 'ok') {
                    alert('xóa thành công')             
                }
            });          
    }

    useEffect(() => {
        getDanhMuc();
    })

      const linkStyle = {color: 'white'}
    return (

        <div className="container">

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

        <h3>Quản lý danh mục</h3>
        <Link to={`/addDM`} 
        style={{ fontSize: '15px', backgroundColor: 'blue', color: 'white', 
        textDecoration: 'none', paddingLeft: '12px', paddingRight: '12px', boxShadow: '2px 2px black' }}>
            Thêm
        </Link>
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

                    {listAllCate.map((item) =>
                        <tr>
                            <td>{item.idDanhMuc}</td>
                            <td>{item.tenDanhMuc}</td>
                            <td>{item.idCha}</td>
                            <td>                               
                            <Link to={`/editdanhmuc/${item.idDanhMuc}`} style={{ fontSize: '15px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', paddingLeft: '12px', paddingRight: '12px', boxShadow: '2px 2px black' }}>
                                Sửa
                            </Link>
                                <button onClick={() => deleteCate(item.idDanhMuc)} type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Delete</button>
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

export default About