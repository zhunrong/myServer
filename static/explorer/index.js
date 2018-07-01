var fileList = document.querySelectorAll('.file-list li');
var showDom = document.querySelector('.show');

fileList.forEach(function (file) {
    file.addEventListener('click', function () {
        var info = JSON.parse(this.dataset.file);
        console.log(info);
        if (info.type === 'directory') {
            location.href = '/explorer/' + info.path;
        } else {
            const imgRE = /.(png|jpg|ico)$/;
            if (imgRE.test(info.path)) {
                // 图片
                var imgDom = document.querySelector('.show img');
                imgDom.src = '/' + info.path;
                imgDom.style.display = 'block';
            }
        }
    })
})
