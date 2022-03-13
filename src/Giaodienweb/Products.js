import React from 'react';

const Products = () => {
    return (
         <div className="container1">
            <div className="container-left">
                <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%'}} placeholder="Nhập tên sản phẩm" />
                <input type="text" style={{ width: '40%', height: '30px', marginRight: '4%',marginBottom: '4%'}} placeholder="Nhập giá sản phẩm" />
                <input type="text" style={{ width: '40%', height: '30px', marginBottom: '4%'}} placeholder="Nhập đơn vị" />
                <input type="text" style={{ width: '40%', height: '30px', marginRight: '4%'}} placeholder="Nhập danh mục" />
                <input type="text" style={{ width: '40%', height: '30px'}} placeholder="Nhập danh muc nhỏ" />               
                <input type="text" style={{ width: '25%', height: '30px'}} placeholder="Nhập tình trạng" />
                <input type="text" style={{ width: '25%', height: '30px', margin: '4%'}} placeholder="Nhập hạn sử dụng" />
                <input type="text" style={{ width: '25%', height: '30px'}} placeholder="Nhập số lượng" />   
                <input type="text" style={{ width: '85%', height: '30px', marginBottom: '4%'}} placeholder="Nhập nơi sản xuất" />            
                <input type="text" style={{ width: '85%', height: '200px'}} placeholder="Nhập mô tả" />
            </div>

            <div className="container-right">
               <img style={{ width: '85%', height: '331px'}} src="https://webcoban.vn/image/cat-2.jpg" />
               <button style={{ width: '85%', height: '40px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} >Chọn hình ảnh</button>
               <button style={{ width: '85%', height: '50px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', marginTop: '5%'}} >Thêm sản phẩm</button>
               <button style={{ width: '85%', height: '50px', backgroundColor: 'red', color: 'white', fontWeight: 'bold', marginTop: '1%' }} >Hủy</button>
            </div>
                
         </div>
    )
}

export default Products