

// #################### Xử lý logic ####################
let description = document.querySelector("#description");
let input = document.getElementById("category-input");
let tag_container = document.querySelector(".category-list");
let text_area = document.querySelector("#description");
let class_btn = document.querySelector(".predict-btn");

let tags = [];

function removeTag(element, tag) {
    let index= tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
}

function addTag(e) {
    if(e.key == "Enter") {
        let tag_content = e.target.value.replace("/\s+/g", " ").toLowerCase();
        if(tag_content.length > 0 && !tags.includes(tag_content)) {
            tags.push(tag_content);
            let tag = `<li><span>${tag_content}</span><span onclick="removeTag(this, '${tag_content}')">&#x2715;</span></li>`;
            tag_container.insertAdjacentHTML("afterbegin", tag);
        }
        e.target.value = "";
    }
}

input.addEventListener("keyup", addTag);

text_area.addEventListener("keyup", e => {
    text_area.style.height = 'auto';
    let scHeight = e.target.scrollHeight;
    text_area.style.height = `${scHeight}px`;
});

class_btn.addEventListener('click', e => {
    let pred_content = description.value.replace("/(\r\n|\n|\r)/gm", " ").trim();
    predict(pred_content);
    console.log(pred_content);
});

// #################### Xử lý API ####################
const pred_Url = "http://localhost:8000/predict";

let result = [];

async function predict(product_description) {
    var res = await fetch(pred_Url, {
        method: "POST",
        body: JSON.stringify(product_description),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    var pred = await res.json();

    tags = [];
    tag_container.innerHTML = '<input type="text" id="category-input" placeholder="thêm nhãn" />';

    if(pred["sac_dep"] == 1) {
        let tag = `<li><span>sắc đẹp</span><span onclick="removeTag(this, 'sắc đẹp')">&#x2715;</span></li>`;
        tag_container.insertAdjacentHTML("afterbegin", tag);
        tags.push('sắc đẹp')
    }

    if(pred["trang_diem"] == 1) {
        let tag = `<li><span>trang điểm</span><span onclick="removeTag(this, 'trang điểm')">&#x2715;</span></li>`;
        tag_container.insertAdjacentHTML("afterbegin", tag);
        tags.push('trang điểm')
    }

    if(pred["cham_soc"] == 1) {
        let tag = `<li><span>chăm sóc</span><span onclick="removeTag(this, 'chăm sóc')">&#x2715;</span></li>`;
        tag_container.insertAdjacentHTML("afterbegin", tag);
        tags.push('chăm sóc')
    }

    if(pred["phu_kien"] == 1) {
        let tag = `<li><span>phụ kiện</span><span onclick="removeTag(this, 'phụ kiện')">&#x2715;</span></li>`;
        tag_container.insertAdjacentHTML("afterbegin", tag);
        tags.push('phụ kiện')
    }
}

