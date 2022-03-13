import React from 'react';

const Home = () => {
     return (
            <div className="container">

                    <div className="panel-heading">LIST ITEM :</div>
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: '2%', backgroundColor: 'green'}}>ID</th>
                                <th style={{ width: '10%', backgroundColor: 'green'}}>Tên</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Giá</th>
                                <th style={{ width: '15%', backgroundColor: 'green'}}>Chi tiết</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Ngày tạo</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Danh mục</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Tình trạng</th>
                                <th style={{ width: '3%', backgroundColor: 'green'}}>Đơn vị</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Hạn sử dụng</th>
                                <th style={{ width: '10%', backgroundColor: 'green'}}>Nơi sản xuất</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Số lượng</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Danh mục nhỏ</th>
                                <th style={{ width: '5%', backgroundColor: 'green'}}>Ation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Cà phê</td>
                                <td>10000 Đ</td>
                                <td>Chất lượng cao</td>
                                <td>17/07/2021</td>
                                <td>Cà phê</td>
                                <td>Còn hàng</td>
                                <td>kg</td>
                                <td>10 ngày</td>
                                <td>Đăk Lăk</td>
                                <td>10 tấn</td>
                                <td>cà phê 1</td>
                                <td>
                                    <button type="button" style={{ width: '40%', backgroundColor: 'blue', color: 'white', marginRight: '3%' }}>Edit</button>
                                    <button type="button" style={{ width: '55%', backgroundColor: 'red', color: 'white' }}>Delete</button>                                     
                                </td>
                            </tr>                                              
                        </tbody>
                    </table>

            </div>
     )
}

export default Home