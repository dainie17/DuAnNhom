/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Editproduct = () => {
  const api = 'http://localhost:5000/';
  let history = useHistory();
  const { id } = useParams();

  const [listcate, setLicate] = useState([]);

  const getdanhmuc = async () => {
    const baseurl = 'http://localhost:5000/listDM';
    const response = await axios.get(baseurl);
    setLicate(response.data);
  }

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

  // const refreshPage = () => {
  //   window.location.reload();
  // }

  const [trademarkname, settrademarkname] = useState({
    tenSP: "",
    hinh: "",
    giaSP: "",
    ngayTao: "",
    hanSuDung: "",
    maDanhMuc: "",
    donVi: "",
    noiSanXuat: "",
    soLuong: "",
    tinhTrang: "",
    chiTiet: "",
    donViSL: "",
  })
  const onInputChange = e => {
    settrademarkname({ ...trademarkname, [e.target.name]: e.target.value });
  };
  const { tenSP, hinh, giaSP, ngayTao, hanSuDung, maDanhMuc, donVi, noiSanXuat, soLuong, tinhTrang, chiTiet, donViSL } = trademarkname;


  useEffect(() => {
    getsanpham();
    getdanhmuc();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editsanpham', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idSanPham: id,
        tenSP: tenSP,
        hinh: hinh,
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
        if (response.data === 'ok') {
          alert("s???a th??nh c??ng");
        }
      });
    console.log("t??n ???? nh???p : " + tenSP);
    history.push("/");
  };

  const huySua = () => {
    history.push("/");
  }

  // l???y d??? li???u s???n ph???m
  const getsanpham = async () => {
    console.log(id);
    const base_url = api + `layeditsanpham/${id}`;
    const response = await axios.get(base_url);
    console.log(response.data);
    console.log(response.data[0].tenSP);
    settrademarkname({
      update: true,
      tenSP: response.data[0].tenSP,
      hinh: response.data[0].hinh,
      giaSP: response.data[0].giaSP,
      ngayTao: response.data[0].ngayTao,
      hanSuDung: response.data[0].hanSuDung,
      maDanhMuc: response.data[0].maDanhMuc,
      donVi: response.data[0].donVi,
      noiSanXuat: response.data[0].noiSanXuat,
      soLuong: response.data[0].soLuong,
      tinhTrang: response.data[0].tinhTrang,
      chiTiet: response.data[0].chiTiet,
      donViSL: response.data[0].donViSL,
    })
  };

  return (
    <div style={{ width: '100%', alignItems: 'center', textAlign: 'center', background: '#F5F5F5' }}>
      <h2>C???p Nh???t S???n Ph???m</h2>

      <h4>ID S???n ph???m: {id} </h4>

      {/* Container right                      */}
      <div style={{ width: '40%', float: 'left', marginLeft: '5%', marginTop: '2%', border: '1px solid black' }}>

        {/* t??n s???n ph???m */}
        <div style={{ marginTop: '2%' }}>
          <text>T??n s???n ph???m: </text>
          <input
            style={{ width: '60%', height: '30px', fontSize: '19px' }}
            type="text"
            placeholder="Nh???p T??n S???n Ph???m"
            name="tenSP"
            value={tenSP}
            onChange={e => onInputChange(e)}>
          </input>
        </div>

        <div style={{ width: '80%', marginLeft: '11%', marginTop: '2%' }}>

          {/* gi?? s???n ph???m*/}
          <div style={{ float: 'left', width: '50%' }}>
            <text style={{ float: 'left' }}>Gi?? s???n ph???m : </text>
            <input
              style={{ width: '30%', float: 'left', height: '30px', fontSize: '19px', marginLeft: '2%' }}
              type="number"
              placeholder="Nh???p Gi?? S???n Ph???m"
              name="giaSP"
              value={giaSP}
              onChange={e => onInputChange(e)}>
            </input>

            <select style={{ width: '15%', float: 'left', height: '35px', fontSize: '19px' }} name='donVi' onChange={e => onInputChange(e)}>

              <option key={"g"} value={"g"}>g</option>
              <option key={"kg"} value={"kg"}>kg</option>
              <option key={"y???n"} value={"y???n"}>y???n</option>
              <option key={"t???"} value={"t???"}>t???</option>
              <option key={"t???n"} value={"t???n"}>t???n</option>

            </select>
          </div>

          {/* Ng??y t???o                         */}
          <div style={{ float: "left", width: '50%' }}>
            <text>Ng??y th??m : </text>
            <input
              style={{ width: '50%', height: '30px', fontSize: '19px' }}
              type="text"
              placeholder="Ng??y t???o"
              name="ngayTao"
              value={ngayTao}
              onChange={e => onInputChange(e)}>
            </input>
          </div>

        </div>

        <div style={{ width: '100%' }}>

          {/* H???n s??? d???ng */}
          <div style={{ width: '50%', marginLeft: '5%', float: 'left', marginTop: '2%' }}>
            <text>H???n s??? d???ng : </text>
            <select style={{ width: '25%', height: '37px' }} name='hanSuDung' onChange={e => onInputChange(e)}>

                    <option key={"Kh??ng c?? h???n s??? d???ng"} value={"Kh??ng c?? h???n s??? d???ng"}>Kh??ng c?? h???n s??? d???ng</option>
                    <option key={"1 Tu???n"} value={"1 Tu???n"}>1 Tu???n</option>
                    <option key={"2 Tu???n"} value={"2 Tu???n"}>2 Tu???n</option>
                    <option key={"3 Tu???n"} value={"3 Tu???n"}>3 Tu???n</option>
                    <option key={"1 Th??ng"} value={"1 Th??ng"}>1 Th??ng</option>
                    <option key={"2 Th??ng"} value={"2 Th??ng"}>2 Th??ng</option>
                    <option key={"3 Th??ng"} value={"3 Th??ng"}>3 Th??ng</option>
                    <option key={"4 Th??ng"} value={"4 Th??ng"}>4 Th??ng</option>
                    <option key={"5 Th??ng"} value={"5 Th??ng"}>5 Th??ng</option>
                    <option key={"6 Th??ng"} value={"6 Th??ng"}>6 Th??ng</option>
                    <option key={"7 Th??ng"} value={"7 Th??ng"}>7 Th??ng</option>
                    <option key={"8 Th??ng"} value={"8 Th??ng"}>8 Th??ng</option>
                    <option key={"9 Th??ng"} value={"9 Th??ng"}>9 Th??ng</option>
                    <option key={"10 Th??ng"} value={"10 Th??ng"}>10 Th??ng</option>
                    <option key={"11 Th??ng"} value={"11 Th??ng"}>11 Th??ng</option>
                    <option key={"1 N??m"} value={"1 N??m"}>1 N??m</option>

                </select>
          </div>

          {/* S??? l?????ng             */}
          <div style={{ width: '40%', float: 'left', marginLeft: '2%', marginTop: '2%' }}>
            <text>S??? l?????ng : </text>
            <input
              style={{ width: '40%', height: '30px', fontSize: '19px' }}
              type="number"
              placeholder="S??? l?????ng"
              name="soLuong"
              value={soLuong}
              onChange={e => onInputChange(e)}>
            </input>
            <select style={{ width: '20%', height: '35px', fontSize: '19px' }} name='donViSL' onChange={e => onInputChange(e)}>

              <option key={"g"} value={"g"}>g</option>
              <option key={"kg"} value={"kg"}>kg</option>
              <option key={"y???n"} value={"y???n"}>y???n</option>
              <option key={"t???"} value={"t???"}>t???</option>
              <option key={"t???n"} value={"t???n"}>t???n</option>

            </select>
          </div>

        </div>

        <div style={{ width: '100%' }}>

          {/* Danh m???c */}
          <div style={{ width: '50%', marginTop: '2%', float: 'left', marginLeft: '2%' }}>
            <text>Danh m???c : </text>
            <select style={{ height: '30px', fontSize: '19px' }} name='maDanhMuc' onChange={e => onInputChange(e)}>
              <option value={maDanhMuc}>Danh m???c hi???n t???i</option>
              {listcate.map((item) =>
                <option key={item.tenDanhMuc} value={item.tenDanhMuc}>{item.tenDanhMuc}</option>
              )}
            </select>
          </div>

          {/* T??nh tr???ng */}
          <div style={{ width: '40%', marginTop: '2%', float: 'left' }}>
            <text>T??nh tr???ng : </text>
            <select style={{ width: '30%', height: '30px', fontSize: '19px' }} name='tinhTrang' onChange={e => onInputChange(e)}>

              <option key={"?????"} value={"?????"}>?????</option>
              <option key={"H???t h??ng"} value={"H???t h??ng"}>H???t h??ng</option>

            </select>
          </div>

        </div>


        <div style={{ marginTop: '26%' }}>

          {/* N??i s???n xu???t */}
          <div style={{ width: '100%' }}>
            <text>N??i s???n xu???t : </text>
            <select style={{ width: '72%', height: '30px', fontSize: '19px' }} name='noiSanXuat' onChange={e => onInputChange(e)}>

                    <option key={"Kon Tum"} value={"Kon Tum"}>Kon Tum</option>
                    <option key={"Gia Lai"} value={"Gia Lai"}>Gia Lai</option>
                    <option key={"????k L??k"} value={"????k L??k"}>????k L??k</option>
                    <option key={"????k N??ng"} value={"????k N??ng"}>????k N??ng</option>
                    <option key={"L??m ?????ng"} value={"L??m ?????ng"}>L??m ?????ng</option>
                    <option key={"???? N???ng"} value={"???? N???ng"}>???? N???ng</option>
                    <option key={"Qu???ng Nam"} value={"Qu???ng Nam"}>Qu???ng Nam</option>
                    <option key={"Qu???ng Ng??i"} value={"Qu???ng Ng??i"}>Qu???ng Ng??i</option>
                    <option key={"B??nh ?????nh"} value={"B??nh ?????nh"}>B??nh ?????nh</option>
                    <option key={"Ph?? Y??n"} value={"Ph?? Y??n"}>Ph?? Y??n</option>
                    <option key={"Kh??nh H??a"} value={"Kh??nh H??a"}>Kh??nh H??a</option>
                    <option key={"Ninh Thu???n"} value={"Ninh Thu???n"}>Ninh Thu???n</option>
                    <option key={"B??nh Thu???n"} value={"B??nh Thu???n"}>B??nh Thu???n</option>
                    <option key={"Thanh H??a"} value={"Thanh H??a"}>Thanh H??a</option>
                    <option key={"Ngh??? An"} value={"Ngh??? An"}>Ngh??? An</option>
                    <option key={"H?? T??nh"} value={"H?? T??nh"}>H?? T??nh</option>
                    <option key={"Qu???ng B??nh"} value={"Qu???ng B??nh"}>Qu???ng B??nh</option>
                    <option key={"Qu???ng Tr???"} value={"Qu???ng Tr???"}>Qu???ng Tr???</option>
                    <option key={"Th???a Thi??n Hu???"} value={"Th???a Thi??n Hu???"}>Th???a Thi??n Hu???</option>
                    <option key={"TP H??? Ch?? Minh"} value={"TP H??? Ch?? Minh"}>TP H??? Ch?? Minh</option>
                    <option key={"B?? R???a V??ng T??u"} value={"B?? R???a V??ng T??u"}>B?? R???a V??ng T??u</option>
                    <option key={"B??nh D????ng"} value={"B??nh D????ng"}>B??nh D????ng</option>
                    <option key={"B??nh Ph?????c"} value={"B??nh Ph?????c"}>B??nh Ph?????c</option>
                    <option key={"?????ng Nai"} value={"?????ng Nai"}>?????ng Nai</option>
                    <option key={"T??y Ninh"} value={"T??y Ninh"}>T??y Ninh</option>
                    <option key={"An Giang"} value={"An Giang"}>An Giang</option>
                    <option key={"B???c Li??u"} value={"B???c Li??u"}>B???c Li??u</option>
                    <option key={"B???n Tre"} value={"B???n Tre"}>B???n Tre</option>
                    <option key={"C?? Mau"} value={"C?? Mau"}>C?? Mau</option>
                    <option key={"C???n Th??"} value={"C???n Th??"}>C???n Th??</option>
                    <option key={"?????ng Th??p"} value={"?????ng Th??p"}>?????ng Th??p</option>
                    <option key={"H???u Giang"} value={"H???u Giang"}>H???u Giang</option>
                    <option key={"Ki??n Giang"} value={"Ki??n Giang"}>Ki??n Giang</option>
                    <option key={"Long An"} value={"Long An"}>Long An</option>
                    <option key={"S??c Tr??ng"} value={"S??c Tr??ng"}>S??c Tr??ng</option>
                    <option key={"Ti???n Giang"} value={"Ti???n Giang"}>Ti???n Giang</option>
                    <option key={"Tr?? Vinh"} value={"Tr?? Vinh"}>Tr?? Vinh</option>
                    <option key={"V??nh Long"} value={"V??nh Long"}>V??nh Long</option>
                    <option key={"H??a B??nh"} value={"H??a B??nh"}>H??a B??nh</option>
                    <option key={"S??n La"} value={"S??n La"}>S??n La</option>
                    <option key={"??i???n Bi??n"} value={"??i???n Bi??n"}>??i???n Bi??n</option>
                    <option key={"Lai Ch??u"} value={"Lai Ch??u"}>Lai Ch??u</option>
                    <option key={"L??o Cai"} value={"L??o Cai"}>L??o Cai</option>
                    <option key={"Y??n B??i"} value={"Y??n B??i"}>Y??n B??i</option>
                    <option key={"Ph?? Th???"} value={"Ph?? Th???"}>Ph?? Th???</option>
                    <option key={"H?? Giang"} value={"H?? Giang"}>H?? Giang</option>
                    <option key={"Tuy??n Quang"} value={"Tuy??n Quang"}>?????ng Th??p</option>
                    <option key={"Cao B???ng"} value={"Cao B???ng"}>Cao B???ng</option>
                    <option key={"B???c K???n"} value={"B???c K???n"}>B???c K???n</option>
                    <option key={"Th??i Nguy??n"} value={"Th??i Nguy??n"}>Th??i Nguy??n</option>
                    <option key={"L???ng S??n"} value={"L???ng S??n"}>L???ng S??n</option>
                    <option key={"B???c Giang"} value={"B???c Giang"}>B???c Giang</option>
                    <option key={"Qu???ng Ninh"} value={"Qu???ng Ninh"}>Qu???ng Ninh</option>
                    <option key={"H?? N???i"} value={"H?? N???i"}>H?? N???i</option>
                    <option key={"B???c Ninh"} value={"B???c Ninh"}>B???c Ninh</option>
                    <option key={"H?? Nam"} value={"H?? Nam"}>H?? Nam</option>
                    <option key={"H???i D????ng"} value={"H???i D????ng"}>H???i D????ng</option>
                    <option key={"H???i Ph??ng"} value={"H???i Ph??ng"}>H???i Ph??ng</option>
                    <option key={"H??ng Y??n"} value={"H??ng Y??n"}>H??ng Y??n</option>
                    <option key={"Nam ?????nh"} value={"Nam ?????nh"}>Nam ?????nh</option>
                    <option key={"Th??i B??nh"} value={"Th??i B??nh"}>Th??i B??nh</option>
                    <option key={"V??nh Ph??c"} value={"V??nh Ph??c"}>V??nh Ph??c</option>
                    <option key={"Ninh B??nh"} value={"Ninh B??nh"}>Ninh B??nh</option>

                </select>
          </div>

        </div>

        {/* Chi ti???t */}
        <div style={{ marginTop: '2%', marginBottom: '2%' }}>
          <text>Chi ti???t : </text>
          <input
            style={{ width: '80%', height: '255px', fontSize: '19px' }}
            type="text"
            placeholder="Chi ti???t"
            name="chiTiet"
            value={chiTiet}
            onChange={e => onInputChange(e)}>
          </input>
        </div>
      </div>


      {/* Container left */}
      <div style={{ width: '40%', float: 'left', alignItems: 'center', textAlign: 'center', marginLeft: '10%', marginTop: '2%' }}>

        {/* h??nh ???nh */}
        <div>
          <input onChange={uploadFile} type="file" style={{ marginBottom: '1%' }} />
          <div>
            {userInfo.filepreview !== null ?
              <img style={{ width: '100%', height: '430px' }} src={userInfo.filepreview} alt="UploadImage" />
              : null}

            {userInfo.filepreview === null ?
              <img style={{ width: '100%', height: '430px' }} src={"http://localhost:5000/uploads/" + hinh} />
              : null}
          </div>
        </div>

        <button onClick={updateEmployee} style={{ width: '100%', height: '50px', marginBottom: '1%' }}>C???t Nh???t</button>
        <button onClick={huySua} style={{ width: '100%', height: '50px', marginBottom: '5%' }}>H???y</button>

      </div>
    </div>
  );
};

export default Editproduct;
