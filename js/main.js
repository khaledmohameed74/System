let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let category = document.querySelector('#category');
let submit = document.querySelector('.submite');
let mode = 'create';
let assistant;

//get total price
function totalPrice() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = '#51025f';
    }
}


// submit Proudcts 
let dataProudcts;
if (localStorage.Proudcts != null) {
    dataProudcts = JSON.parse(localStorage.Proudcts);
} else {
    dataProudcts = [];
}

submit.onclick = function () {
    let newProudcts = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (mode === 'create') {
        //count
        if (newProudcts.count > 1) {
            for (let i = 0; i < newProudcts.count; i++) {
                dataProudcts.push(newProudcts)
            }
        } else {
            dataProudcts.push(newProudcts)
        }
    } else {
        dataProudcts[assistant] = newProudcts;
        mode = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';

    }

    k = [1, 2, 3]
    k[1] = 0
    localStorage.setItem('Proudcts', JSON.stringify(dataProudcts));
    clearinputs()
    showData()

}

//clear inputs

function clearinputs() {
    title.value.toLowerCase() = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.valuetoLowerCase() = '';
}


// read proudcts and show it

function showData() {
    totalPrice()
    let table = '';
    for (let k = 0; k < dataProudcts.length; k++) {
        table += `
        <tr>
            <td>${k}</td>
            <td>${dataProudcts[k].title}</td>
            <td>${dataProudcts[k].price}</td>
            <td>${dataProudcts[k].taxes}</td>
            <td>${dataProudcts[k].ads}</td>
            <td>${dataProudcts[k].discount}</td>
            <td>${dataProudcts[k].total}</td>
            <td>${dataProudcts[k].category}</td>
            <td><button onclick="updateProudct(${k})" class="update">update</button></td>
            <td><button onclick="deleteProudct(${k})" class="delete">delete</button></td>
        </tr> 
        `
    }

    document.querySelector('#tbody').innerHTML = table;
    let deleteall = document.querySelector('.deleteall');
    if (dataProudcts.length > 0) {
        deleteall.innerHTML = `
        <button onclick="deleteallProudcts()" >Delete All (${dataProudcts.length})</button>
        `
    } else {
        deleteall.innerHTML = '';
    }
}
showData()

//delete product

function deleteProudct(k) {
    dataProudcts.splice(k, 1);
    localStorage.Proudcts = (JSON.stringify(dataProudcts));
    showData();
}

//delete all 

function deleteallProudcts() {
    localStorage.clear()
    dataProudcts.splice(0);
    showData()
}


//update Proudct

function updateProudct(k) {
    title.value = dataProudcts[k].title;
    price.value = dataProudcts[k].price;
    taxes.value = dataProudcts[k].taxes;
    ads.value = dataProudcts[k].ads;
    discount.value = dataProudcts[k].discount;
    totalPrice()
    count.style.display = 'none';
    category.value = dataProudcts[k].category;
    submit.innerHTML = 'update';
    mode = 'update';
    assistant = k;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}


//search 

let searchmoode = 'title';

function searchtype(id) {
    let search = document.querySelector('#search')
    if (id == 'searchtitle') {
        searchmoode = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchmoode = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus()
    search.value = '';
    showData()
}

function searchdata(value) {
    let table = '';
    for (let k = 0; k < dataProudcts.length; k++) {
        if (searchmoode == 'title') {
            if (dataProudcts[k].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${k}</td>
                    <td>${dataProudcts[k].title}</td>
                    <td>${dataProudcts[k].price}</td>
                    <td>${dataProudcts[k].taxes}</td>
                    <td>${dataProudcts[k].ads}</td>
                    <td>${dataProudcts[k].discount}</td>
                    <td>${dataProudcts[k].total}</td>
                    <td>${dataProudcts[k].category}</td>
                    <td><button onclick="updateProudct(${k})" class="update">update</button></td>
                    <td><button onclick="deleteProudct(${k})" class="delete">delete</button></td>
                </tr> 
                `
            }
        } else {
            if (dataProudcts[k].category.includes(value)) {
                table += `
                <tr>
                    <td>${k}</td>
                    <td>${dataProudcts[k].title}</td>
                    <td>${dataProudcts[k].price}</td>
                    <td>${dataProudcts[k].taxes}</td>
                    <td>${dataProudcts[k].ads}</td>
                    <td>${dataProudcts[k].discount}</td>
                    <td>${dataProudcts[k].total}</td>
                    <td>${dataProudcts[k].category}</td>
                    <td><button onclick="updateProudct(${k})" class="update">update</button></td>
                    <td><button onclick="deleteProudct(${k})" class="delete">delete</button></td>
                </tr> 
                `
            }
        }
    }
    document.querySelector('#tbody').innerHTML = table;
}