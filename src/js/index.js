
const loadBtn = document.querySelector(".load-btn");
const tableBody = document.querySelector(".table_body");
const firstPage = document.querySelector(".first-page");
const section = document.querySelector(".section");
const searchBtn = document.querySelector(".search-btn");
const loadContainer = document.querySelector(".load-container");
const searchInput = document.querySelector(".search-input");
const price = document.querySelector(".price");
const date = document.querySelector(".date");
const priceChevron = document.querySelector(".price-chevron");
const dateChevron = document.querySelector(".date-chevron");
let search = false;

class Action {
    tarakonesh() {
        loadContainer.style.display = "none";
        searchBtn.style.display = "flex";
        section.style.display = "block";
        section.style.transition = "all 2ms";
        axios.get(`http://localhost:3000/transactions`).then((data) => {
        const datas = data.data;
        this.view(datas);
        });

        searchInput.addEventListener("input", (e) => {
        this.search(e);
        });
        
        date.addEventListener("click", () => {
                    if (!search) {
                    this.dateSort();
                    }
        });
        
        price.addEventListener("click", () => {
                    if (!search) {
                    this.priceSort();
                    }
        });
            
    }

    search(e) {
            search = true;
            const searchValue = e.target.value;
            axios
                .get(`http://localhost:3000/transactions?refId_like=${searchValue}`)
                .then((data) => {
                    const datas = data.data;
                    this.view(datas);
                });
            
            date.addEventListener("click", () => {
                if (search) {
                    this.searchDateSort(searchValue);
                }
            });
            
            price.addEventListener("click", () => {
                if (search) {
                    this.searchPriceSort(searchValue);
                }
            });

    }

    view(datas) {
        let result = "";
        datas.forEach((data) => {
        const html = `
                <tr>
                <td>${data.id}</td>
                <td ${
                data.type == "افزایش اعتبار" ? "class='green'" : "class='red'"
                }>${data.type}</td>
                <td class="price-bold">${data.price}</td>
                <td>${data.refId}</td>
                <td>${data.date}</td>
                </tr>`;
        result += html;
        });
        tableBody.innerHTML = result;
    }

    dateSort() {
        dateChevron.classList.toggle("transform");
        if (dateChevron.classList.contains("transform")) {
            axios
            .get(`http://localhost:3000/transactions?_sort=date&_order=desc`)
            .then((data) => {
                const datas = data.data;
                this.view(datas);
            });
        } else {
            axios
            .get(`http://localhost:3000/transactions?_sort=date&_order=asc`)
            .then((data) => {
                const datas = data.data;
                this.view(datas);
            });
        }
    }

    priceSort() {
        priceChevron.classList.toggle("transform");
        if (priceChevron.classList.contains("transform")) {
        axios
            .get(`http://localhost:3000/transactions?_sort=price&_order=desc`)
            .then((data) => {
            const datas = data.data;
            this.view(datas);
            });
        } else {
        axios
            .get(`http://localhost:3000/transactions?_sort=price&_order=asc`)
            .then((data) => {
            const datas = data.data;
            this.view(datas);
            });
        }
    }

    searchDateSort(searchValue) {
        dateChevron.classList.toggle("transform");
        if (dateChevron.classList.contains("transform")) {
        axios
            .get(`http://localhost:3000/transactions?refId_like=${searchValue}&_sort=date&_order=desc`)
            .then((data) => {
            const datas = data.data;
            this.view(datas);
            });
        } else {
        axios
            .get(`http://localhost:3000/transactions?refId_like=${searchValue}&_sort=date&_order=asc`)
            .then((data) => {
            const datas = data.data;
            this.view(datas);
            });
        }
    }

    searchPriceSort(searchValue) {
        priceChevron.classList.toggle("transform");
        if (priceChevron.classList.contains("transform")) {
        axios
            .get(
            `http://localhost:3000/transactions?refId_like=${searchValue}&_sort=price&_order=desc`
            )
            .then((data) => {
            const datas = data.data;
            this.view(datas);
            });
        } else {
        axios
            .get(
            `http://localhost:3000/transactions?refId_like=${searchValue}&_sort=price&_order=asc`
            )
            .then((data) => {
            const datas = data.data;
            this.view(datas);
            });
        }
    }
}

const action = new Action();

loadBtn.addEventListener("click", () => action.tarakonesh());
