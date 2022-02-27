console.log(axios)

function getData () {
    var promise = axios(
        {
            url:'../data/data.txt',
            mathod:'GET',
            responseType:'text'
        }
    );
    // Promise là đối tượng có 2 phương thức cần nhớ
    // then : nhận vào 1 hàm khi request thành công
    // catch : nhận vào 1 hàm khi request thất bại
    promise.then(function(ketQua) {
        console.log('ketQua',ketQua.data);
        document.querySelector('#content').innerHTML = 'Họ tên:'+ ketQua.data;
    });
    promise.catch(function(error) {
        console.log('error',error);
    });
}
getData();


function getDataXML () {
    var promise = axios (
        {
            url:'../data/data.xml',
            method:'GET',
            responseType:'document'
        }
    );
    promise.then(function(ketQua){
        console.log('ketQua',ketQua.data);
        var hoTen = ketQua.data.querySelector('hoten').innerHTML;
        document.querySelector('#content').innerHTML = '<h1>' + hoTen + '</h1>';
    });
    promise.catch(function(error){
        console.log('ketQua',error)
    });
}
getDataXML();
console.log(document);

function getDatajson () {
    var promise = axios ({
        url:'../data/data.json',
        method:'GET',
    });

    promise.then(function(ketQua){
        console.log('ketQua',ketQua.data);
        document.querySelector('#content').innerHTML += '<h3>' + ketQua.data.hoTen + '</h3>';
    })
    promise.catch(function(error){
        console.log('ketQua',error)
    });
}
getDatajson();
