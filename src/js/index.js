// 获取按钮元素
const generateButton = document.getElementById('button-generate');

// 添加点击事件处理程序
generateButton.addEventListener('click', generateBadge);

// 获取输入框的内容
// const flat = document.getElementById('flat');
// const plastic = document.getElementById('plastic');
// const flatSquare = document.getElementById('flat-square');
// const foTheBadge = document.getElementById('for-the-badge');
// const social = document.getElementById('social');


// 获取输入框和按钮的元素
const fileInput = document.getElementById('fileInput');
const changeButton = document.getElementById('logo-upload-button');
const logoInput = document.getElementById('logo-input')
let svg = '';
// 添加按钮的点击事件监听器
changeButton.addEventListener('click', function () {
    // 切换输入框的显示状态
    if (fileInput.style.display === 'none') {
        fileInput.style.display = 'block';
        logoInput.style.display = 'none'; // 或 'inline'，具体根据您的需求
        changeButton.textContent = 'ByName'
    } else {
        fileInput.style.display = 'none';
        logoInput.style.display = 'block';
        changeButton.textContent = "ByFile"
    }
});


async function generateBadge() {
    const content = document.getElementById('content-input').value || 'content';
    const color = document.getElementById('content-color-input').value || 'blue';
    let style = 'flat';
    const styleChooses = Array.from(document.getElementsByClassName('choose-button'));
    styleChooses.forEach(function (styleChoose) {
        if(styleChoose.checked){
            style =  styleChoose.id;
        }
    });
    const logoColor = document.getElementById('logo-color-input').value || '';
    const label = document.getElementById('label-input').value || '';
    const labelColor = document.getElementById('label-color-input').value || '';
    const link = document.getElementById('link-input').value || '';
    let logo = '';
    let badgeURL = '';
    if(fileInput.style.display === 'none'){
        logo = document.getElementById('logo-input').value || ' ';
        badgeURL = `https://img.shields.io/badge/${content}-${color}?style=${style}&logo=${logo}&logoColor=${logoColor}&label=${label}&labelColor=${labelColor}&link=${link}`;
    }else if (fileInput.style.display === 'block'){
        console.log(svg2Base64());
        await svg2Base64();
        logo = svg;
        console.log(svg2Base64());
        badgeURL = `https://img.shields.io/badge/${content}-${color}.svg?logo=data:image/svg%2bxml;base64,${logo}&style=${style}&logoColor=${logoColor}&label=${label}&labelColor=${labelColor}&link=${link}`;
    }
    // 构建Shields.io链接
    // const badgeURL = `https://img.shields.io/badge/${content}-${color}?style=${style}&logo=${logo}&logoColor=${logoColor}&label=${label}&labelColor=${labelColor}&link=${link}`;
    // 显示生成的Badge链接
    const badgeDiv = document.getElementById('out-url');
    badgeDiv.textContent = badgeURL;

    const badgeShowLink = document.getElementById('badge-show-link');
    const badgeShowImg = document.getElementById('badge-show-img');

    // 更新 <a> 元素的 href 属性和 title 属性
    if(link==''){
        badgeShowLink.href = badgeURL;
    }else{
        badgeShowLink.href = link;
    }
    badgeShowLink.title = 'staticBadge';

    // 更新 <img> 元素的 src 属性和 alt 属性
    badgeShowImg.src = badgeURL;
    badgeShowImg.alt = 'staticBadge';
}

function svg2Base64() {
    return new Promise((resolve, reject) => {
        if (fileInput.files && fileInput.files.length > 0) {
            const selectedFile = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                const svgContent = event.target?.result;

                const base64Data = btoa(svgContent);
                
                svg = base64Data;
                resolve(); // 解析 Promise，表示操作完成
            };

            reader.readAsText(selectedFile);
        } else {
            svg = ' ';
            resolve(); // 解析 Promise，表示操作完成
        }
    });
}