// Declarar variables para elementos del DOM
var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    companyName = document.getElementById("name"),
    nit = document.getElementById("nit"),
    startDate = document.getElementById("sDate"),
    addres = document.getElementById("direccion"),
    submitBtn = document.querySelector(".submit"),
    companyInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newCompanyBtn = document.querySelector(".newUser");

let companyData = localStorage.getItem('companyProfile') ? JSON.parse(localStorage.getItem('companyProfile')) : [];

let isEdit = false, editCompanyId;

showCompanyInfo();

newCompanyBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Guardar';
    modalTitle.innerText = "Nueva Empresa";
    isEdit = false;
    imgInput.src = "./image/Profile Icon.webp";
    form.reset();
});

file.onchange = function () {
    if (file.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };

        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("Este archivo es demasiado grande");
    }
};

function showCompanyInfo() {
    document.querySelectorAll('.companyDetails').forEach(info => info.remove());
    companyData.forEach((element, index) => {
        let createElement = `<tr class="companyDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.companyName}</td>
            <td>${element.nit}</td>
            <td>${element.startDate}</td>
            <td>${element.direccion}</td>

            <td>
                <button class="btn btn-success" onclick="readCompanyInfo('${element.picture}', '${element.companyName}', '${element.nit}', '${element.startDate}', '${element.direccion}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editCompanyInfo(${index}, '${element.picture}', '${element.companyName}', '${element.nit}', '${element.startDate}', '${element.direccion}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteCompanyInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        companyInfo.innerHTML += createElement;
    });
}

function readCompanyInfo(pic, name, nit, sDate, direccion) {
    document.querySelector('.showImg').src = pic;
    document.querySelector('#showName').value = name;
    document.querySelector("#showNit").value = nit;
    document.querySelector("#showsDate").value = sDate;
    document.querySelector("#showDireccion").value = direccion;
}

function editCompanyInfo(index, pic, name, nitUse, sDate, direccion) {
    isEdit = true;
    editCompanyId = index;
    imgInput.src = pic;
    companyName.value = name;
    nit.value = nitUse;
    startDate.value = sDate;
    addres.value = direccion;

    submitBtn.innerText = "Actualizar";
    modalTitle.innerText = "Actualizar Empresa";
}

function deleteCompanyInfo(index) {
    if (confirm("¿Estás seguro de que quieres eliminar?")) {
        companyData.splice(index, 1);
        localStorage.setItem("companyProfile", JSON.stringify(companyData));
        showCompanyInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const companyInformation = {
        picture: imgInput.src || "./image/Profile Icon.webp",
        companyName: companyName.value,
        nit: nit.value,
        startDate: startDate.value,
        direccion: direccion.value
    };

    if (!isEdit) {
        companyData.push(companyInformation);
    } else {
        isEdit = false;
        companyData[editCompanyId] = companyInformation;
    }

    localStorage.setItem('companyProfile', JSON.stringify(companyData));

    submitBtn.innerText = "Guardar";
    modalTitle.innerHTML = "Nueva Empresa";

    showCompanyInfo();

    form.reset();

    imgInput.src = "./image/Profile Icon.webp";
});
