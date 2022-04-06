/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const Editproduct = () => {
    const api ='http://10.22.194.204:5000/';
    let history = useHistory(); 
    const { id } = useParams(); 

    const { register, handleSubmit } = useForm();
    
    const [listcate, setLicate] = useState([]);

    const getdanhmuc = async () => {
        const baseurl = 'http://10.22.194.204:5000/listdm';
        const response = await axios.get(baseurl);
        setLicate(response.data);
    }

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
  
    const refreshPage = ()=>{
      window.location.reload();
   }

    const [trademarkname ,settrademarkname] = useState({
      tenSP:"",
      hinh:"",
      giaSP:"",
      ngayTao:"",
      hanSuDung:"",
      maDanhMuc:"",
      donVi:"",
      noiSanXuat:"",
      soLuong:"",
      tinhTrang:"",
      chiTiet:"",
      donViSL:"",
    })
    const onInputChange = e => {
      settrademarkname({ ...trademarkname,[e.target.name]: e.target.value });
    };
    const { tenSP, hinh ,giaSP, ngayTao, hanSuDung, maDanhMuc, donVi, noiSanXuat, soLuong, tinhTrang, chiTiet, donViSL } = trademarkname;
  
  
    useEffect(() => {
      getlistsanpham();
      getdanhmuc();
    }, []);
  
    //code update
    const updateEmployee = async e => {
      e.preventDefault();
      fetch(api + 'editsanphamimg/editid', {   
        method: 'POST',
        headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            idSanPham: id,
            tenSP: tenSP ,
            hinh:  hinh,
            giaSP: giaSP,
            ngayTao: ngayTao,
            hanSuDung: hanSuDung,
            maDanhMuc: maDanhMuc,
            donVi: donVi,
            noiSanXuat: noiSanXuat,
            soLuong: soLuong,
            tinhTrang: tinhTrang,
            chiTiet: chiTiet,
            donViSL: donViSL,
          })
          
      })
      .then((response) => {
        if(response === 'okedit'){
          alert("thành công")
        }
      });
      console.log("tên đã nhập : " + tenSP);
      history.push("/home");
    };
  
    //code update hình ảnh 
    const getimgedit = async(e) =>{
      // await timeout(5000);
     const data = new FormData();
     console.log(data)
     data.append('file', e.target.files[0]);
     data.append('myid', id);
     axios.post(api + "edituploadFileSanPham", data)
          .then(response => {
            console.log("Tên hình ảnh new : " + response.data)
            refreshPage();
            // data.readAsDataURL(e.files[0]);
            // this.setState({ e }, () => this.onInputChange(e));
          })
    }
   
    // code hiển thị id sanpham
    const getlistsanpham =  async() => {
      console.log(id);
  
              const base_url = api + `editsanpham/${id}`;
              const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
              console.log( response.data); 
              // setcategory(response.data);  // hiển thị
              console.log(response.data[0].tenSP);
              settrademarkname({
                      update: true,
                      tenSP:response.data[0].tenSP,
                      hinh:response.data[0].hinh,
                      giaSP:response.data[0].giaSP,
                      ngayTao:response.data[0].ngayTao,
                      hanSuDung:response.data[0].hanSuDung,
                      maDanhMuc:response.data[0].maDanhMuc,
                      donVi:response.data[0].donVi,
                      noiSanXuat:response.data[0].noiSanXuat,
                      soLuong:response.data[0].soLuong,
                      tinhTrang:response.data[0].tinhTrang,
                      chiTiet:response.data[0].chiTiet,
                      donViSL:response.data[0].donViSL,
                    })
    }; 
  
   
    return (
      <div className="container">
        <div className="row mt-4">
         <div>
          <h4 className="text-center mb-4">Cập Nhật Sản Phẩm</h4>
         
            <h5 className="text-success">ID Sản phẩm: {id} </h5>
            <div className="form-group mb-3">
              <input    
                type="text"
                className="form-control form-control-lg"
                placeholder="Nhập Tên Sản Phẩm"
                name="tenSP"
                value={tenSP}
                onChange={e => onInputChange(e)}>   
              </input>
            </div>
  
            <div className="form-group mb-3">
            <input 
                        onChange={uploadFile}
                        className="form-control"
                                    
                                    type="file"
                                />
                                 {userInfo.filepreview !== null ?
                                    <img style={{width: '300px'}} src={userInfo.filepreview} alt="UploadImage" />
                                    : null} 

                                {userInfo.filepreview === null ? 
                                        <img style={{width: '300px'}} src={"http://10.22.194.204:5000/uploads/"+hinh} />       
                                    : null}
            </div>
  
            <div className="form-group mb-3">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Nhập Giá Sản Phẩm"
                name="giaSP"
                value={giaSP}
                onChange={e => onInputChange(e)}>   
              </input>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Đơn vị"
                name="donVi"
                value={donVi}
                onChange={e => onInputChange(e)}>   
              </input>
            </div>
  
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Ngày tạo"
                name="ngayTao"
                value={ngayTao}
                onChange={e => onInputChange(e)}>   
              </input>
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Hạn sử dụng"
                name="hanSuDung"
                value={hanSuDung}
                onChange={e => onInputChange(e)}>   
              </input>
            </div>
            <div className="form-group mb-3">
              
            <select {...register("maDanhMuc")}>
                    <option value={maDanhMuc}>Danh mục hiện tại</option>
                    {listcate.map((item) =>
                        <option key={item.idDanhMuc} value={item.idDanhMuc}>{item.tenDanhMuc}</option>
                    )}
                </select>  

            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nơi sản xuất"
                name="noiSanXuat"
                value={noiSanXuat}
                onChange={e => onInputChange(e)}>   
              </input>
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Số lượng"
                name="soLuong"
                value={soLuong}
                onChange={e => onInputChange(e)}>   
              </input>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Đơn vị của số lượng"
                name="donViSL"
                value={donViSL}
                onChange={e => onInputChange(e)}>   
              </input>
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Tình trạng"
                name="tinhTrang"
                value={tinhTrang}
                onChange={e => onInputChange(e)}>   
              </input>
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Chi tiết"
                name="chiTiet"
                value={chiTiet}
                onChange={e => onInputChange(e)}>   
              </input>
            </div>
            
            <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
         
         </div>
        </div> 
      </div>
    );
  };
   
  export default Editproduct;
