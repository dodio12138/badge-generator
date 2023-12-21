//TODO: 优化markdown下的直接链接点击 使用原生markdown
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
const logoInput = document.getElementById('logo-input');
const copyMD = document.getElementById('copy-md');
const copyHTML = document.getElementById('copy-html');
let MDCode = '';
let HTMLCode = '';
let svg = '';
let badgeURL = 'https://img.shields.io/static/v1?label=Dodio&message=badge-generator&color=blue&logo=github';
// 添加按钮的点击事件监听器
copyMD.addEventListener('click', function () {
    if (navigator.clipboard) {
        MDCode = `![Static Badge](${badgeURL})`
        navigator.clipboard.writeText(MDCode);
    }
});

copyHTML.addEventListener('click', function () {
    if (navigator.clipboard) {
        HTMLCode = `<img alt="Static Badge" src="${badgeURL}">`
        navigator.clipboard.writeText(HTMLCode);
    }
});

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
    let logoColor = '';
    let label = '';
    let labelColor = '';
    let link = '';
    let logo = '';

    if(document.getElementById('logo-color-input').value != ''){
        logoColor = "&logoColor=" + document.getElementById('logo-color-input').value;
    }
    if(document.getElementById('label-input').value != ''){
        label = "&label=" + document.getElementById('label-input').value;
    }
    if(document.getElementById('label-color-input').value != ''){
        labelColor = "&labelColor=" + document.getElementById('label-color-input').value;
    }
    if(document.getElementById('link-input').value != ''){
        link = "&link=" + document.getElementById('link-input').value;
    }
    // const logoColor = document.getElementById('logo-color-input').value || '';
    // const label = document.getElementById('label-input').value || '';
    // const labelColor = document.getElementById('label-color-input').value || '';
    // const link = document.getElementById('link-input').value || '';
    // let logo = '';
    // let badgeURL = '';
    if(fileInput.style.display === 'none'){
        if(document.getElementById('logo-input').value != ''){
            logo = "&logo=" + document.getElementById('logo-input').value;
        }
        badgeURL = `https://img.shields.io/badge/${content}-${color}?style=${style}${logo}${logoColor}${label}${labelColor}${link}`;
    }else if (fileInput.style.display === 'block'){
        console.log(svg2Base64());
        await svg2Base64();
        logo = svg;
        console.log(svg2Base64());
        badgeURL = `https://img.shields.io/badge/${content}-${color}.svg?logo=data:image/svg%2bxml;base64,${logo}&style=${style}${logoColor}${label}${labelColor}${link}`;
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
        badgeShowLink.href = "https://" + link.replace("&link=",'');
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