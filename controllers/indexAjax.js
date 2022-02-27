function renderTableSinhVien(arrSV) {
    // input [sv,sv,{maSinhVien:'',tenSinhVien:''},...]
    var stringHTML = "";
    for (var i = 0; i < arrSV.length; i++) {
      //Mỗi lần duyệt lấy ra 1 sinh viên từ trong mangSinhVien
      var sv = arrSV[i];
      //Duyệt qua 1 đối tượng sinh viên thì tạo ra 1 thẻ tr tương ứng + dồn vào stringHTML
      stringHTML += `
              <tr>
                  <td>${sv.maSinhVien}</td>
                  <td>${sv.tenSinhVien}</td>
                  <td>${sv.email}</td>
                  <td>${sv.soDienThoai}</td>
                  <td>${sv.loaiSinhVien}</td>
                  <td>
                      <button class="btn btn-outline-danger" onclick="xoaSV('${sv.maSinhVien}')" >Xoá</button>
                      <button class="btn btn-outline-primary" onclick="chinhSua('${sv.maSinhVien}')" >Chỉnh sửa</button>
                  </td>
              </tr>
          `;
    }
    document.querySelector("tbody").innerHTML = stringHTML;
}
    //
function getApiSinhVien () {
    var promise = axios ({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', 
        method:'GET',
    });
    promise.then(function(result){
        console.log('Kết quả', result.data)
        renderTableSinhVien(result.data);
    })
    promise.catch(function(error){
        console.log(error)
    })
}
getApiSinhVien();

//-------------POST: thêm dữ liệu về phía sever để sever lưu trữ -----

document.querySelector('#btnXacNhan').onclick = function () {
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = +document.querySelector('#diemToan').value;
    sv.diemLy = +document.querySelector('#diemLy').value;
    sv.diemHoa = +document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = +document.querySelector('#diemRenLuyen').value;
    console.log('sv',sv);

    var promise = axios ({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method:'POST',
        data:sv
    });
    promise.then(function(result){
        console.log('result',result.data);
    })
    promise.catch(function(error){
        console.log(error);
    })
}

//---------DELETE------
function xoaSV(maSV) {
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien='+maSV,
        method:'DELETE',
    });
    promise.then(function(result){
        console.log(result.data);
        getApiSinhVien();
    });
    promise.catch(function(error){
        console.log(error.data);
    });
} 

function chinhSua(maSinhVien){

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien='+maSinhVien,
        method:'GET',
    });
    promise.then(function(result){
        console.log(result.data);
        var sinhVien = result.data;
        document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
       
    })
    promise.catch(function(error){
        console.log(error);
    })
}
document.querySelector('#btnCapNhat').onclick = function(){
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = +document.querySelector('#diemToan').value;
    sv.diemLy = +document.querySelector('#diemLy').value;
    sv.diemHoa = +document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = +document.querySelector('#diemRenLuyen').value;

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sv.maSinhVien,
        method:'PUT',
        data:sv
    });
    promise.then(function(result){
        console.log('result',result.data);
        getApiSinhVien();
    })
    promise.catch(function(erro){
        console.log(error);
    })
}


