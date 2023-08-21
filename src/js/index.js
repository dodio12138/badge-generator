// 上传按钮点击事件处理函数
document.getElementById('uploadButton').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const resultContainer = document.getElementById('resultContainer');

    // 检查是否选择了文件
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        const reader = new FileReader();

        // 读取文件内容
        reader.onload = function (event) {
            const svgContent = event.target.result;

            // 将SVG内容转换为Base64编码
            const base64Data = btoa(svgContent);

            // 在页面上显示Base64编码结果
            resultContainer.innerHTML = `<h2>Base64 Encoded SVG:</h2><pre>${base64Data}</pre>`;
        };

        // 开始读取文件
        reader.readAsText(selectedFile);
    } else {
        resultContainer.innerHTML = '<p>Please select an SVG file.</p>';
    }
});