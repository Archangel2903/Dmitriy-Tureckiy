const d = document;
const body = d.querySelector('body');
const productsBox = d.querySelector('.products-box');
const cart = {
    items: d.getElementById('items_count'),
    summary: d.getElementById('total_summary'),
    button: d.getElementById('pseudo_cart'),
};
const sorting = {
    category: d.getElementById('sorting_category'),
    price: d.getElementById('sorting_price'),
};

const regular = {
    text: /^\w+$/gi,
    email: /^\w+[@]\w+\.\D+$/gi,
}

let productItems = productsBox.children;
let modalClose = d.querySelector('.modal-close');
let modalInputs = d.querySelectorAll('.modal-form__input');
let form = d.querySelector('.modal-form');
let formSubmit = d.querySelector('.modal-form__submit');

function addToCart(elem) {
    let {items, summary} = cart;
    let item = elem.closest('.product-box__item'),
        price = Number(elem.closest('.product-box__meta').children[0].innerText.match(/\d+/)[0]),
        quantity = Number(item.querySelector('.qty__item').value);

    if (quantity >= 1) {
        let itemsStr = items.innerText,
            summaryStr = summary.innerText;

        price *= quantity;

        if (isNaN(summaryStr)) {
            summary.innerHTML = price;
        }
        else {
            let summaryResult = Number(summaryStr) + price;
            summary.innerHTML = summaryResult;
        }

        if (isNaN(itemsStr)) {
            items.innerHTML = quantity;
        }
        else {
            let itemsResult = Number(itemsStr) + quantity;
            items.innerHTML = itemsResult;
        }
        toCart(item);
    }
    else if (quantity >= 0) {
        let itemsStr = items.innerText,
            summaryStr = summary.innerText;

        if (isNaN(summary.innerText)) {
            summary.innerHTML = price;
        }
        else {
            let result = Number(summaryStr) + price;
            summary.innerHTML = result;
        }

        if (isNaN(itemsStr)) {
            items.innerHTML = 1;
        }
        else {
            let itemsResult = Number(itemsStr) + 1;
            items.innerHTML = itemsResult;
        }
        toCart(item);
    }
    else {
        alert('Недопустимое число');
        return false;
    }
}
function toCart(elem) {
    let item = elem.closest('.product-box__item'),
        itemX = item.getBoundingClientRect().x,
        itemY = item.getBoundingClientRect().y;
    let cart = d.getElementById('pseudo_cart'),
        cartY = cart.getBoundingClientRect().y,
        cartX = cart.getBoundingClientRect().x;
    let clone = item.cloneNode(true);

    clone.classList.add('clone');
    clone.style.width = item.offsetWidth + 'px';
    clone.style.width = item.offsetHeight + 'px';
    clone.style.top = window.scrollY > 0 ? (itemY + window.scrollY) + 'px' : itemY + 'px';
    clone.style.left = itemX + 'px';
    productsBox.appendChild(clone);

    setTimeout(function () {
        if (window.scrollY > 0) {
            clone.style.top = (cartY + window.scrollY) + 'px';
            clone.style.left = cartX + 'px';
        }
        else {
            clone.style.top = cartY + 'px';
            clone.style.left = cartX + 'px';
        }

        setTimeout(function () {
            clone.remove();
        }, 1000);
    }, 300);
}

productsBox.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() === 'button' && e.target.classList.contains('product-box__btn')) {
        addToCart(e.target);
    }
});
sorting.category.addEventListener('change', function () {
    let priceVal = Number(sorting.price.value);

    switch (Number(this.value)) {
        case 1:
            for (let i = 0; i < productItems.length; i++) {
                let category = productItems[i].dataset.category,
                    price = productItems[i].dataset.price;

                if (category !== 'breakfast') {
                    productItems[i].style.display = 'none';
                }
                else {
                    if (priceVal !== 0 && price > priceVal) {
                        productItems[i].style.display = 'none';
                    }
                    else {
                        productItems[i].style.display = 'flex';
                    }
                }
            }
            break;

        case 2:
            for (let i = 0; i < productItems.length; i++) {
                let category = productItems[i].dataset.category,
                    price = productItems[i].dataset.price;

                if (category !== 'hotter') {
                    productItems[i].style.display = 'none';
                }
                else {
                    if (priceVal !== 0 && price > priceVal) {
                        productItems[i].style.display = 'none';
                    }
                    else {
                        productItems[i].style.display = 'flex';
                    }
                }
            }
            break;

        case 3:
            for (let i = 0; i < productItems.length; i++) {
                let category = productItems[i].dataset.category,
                    price = productItems[i].dataset.price;

                if (category !== 'garnish') {
                    productItems[i].style.display = 'none';
                }
                else {
                    if (priceVal !== 0 && price > priceVal) {
                        productItems[i].style.display = 'none';
                    }
                    else {
                        productItems[i].style.display = 'flex';
                    }
                }
            }
            break;

        default:
            for (let i = 0; i < productItems.length; i++) {
                let price = productItems[i].dataset.price;

                if (priceVal !== 0 && price > priceVal) {
                    productItems[i].style.display = 'none';
                }
                else {
                    productItems[i].style.display = 'flex';
                }
            }
            break;
    }
});
sorting.price.addEventListener('change', function () {
    let categoryVal = Number(sorting.category.value);

    for (let i = 0; i < productItems.length; i++) {
        let category = productItems[i].dataset.category;

        if (Number(this.value) === 0) {
            switch (categoryVal) {
                case 1:
                    if (category === 'breakfast') {
                        productItems[i].style.display = 'flex';
                    }
                    else {
                        productItems[i].style.display = 'none';
                    }
                    break;

                case 2:
                    if (category === 'hotter') {
                        productItems[i].style.display = 'flex';
                    }
                    else {
                        productItems[i].style.display = 'none';
                    }
                    break;

                case 3:
                    if (category === 'garnish') {
                        productItems[i].style.display = 'flex';
                    }
                    else {
                        productItems[i].style.display = 'none';
                    }
                    break;

                default:
                    productItems[i].style.display = 'flex';
                    break;
            }
        }
        else if (Number(this.value) >= productItems[i].dataset.price) {
            switch (categoryVal) {
                case 1:
                    if (category === 'breakfast') {
                        productItems[i].style.display = 'flex';
                    }
                    else {
                        productItems[i].style.display = 'none';
                    }
                    break;

                case 2:
                    if (category === 'hotter') {
                        productItems[i].style.display = 'flex';
                    }
                    else {
                        productItems[i].style.display = 'none';
                    }
                    break;

                case 3:
                    if (category === 'garnish') {
                        productItems[i].style.display = 'flex';
                    }
                    else {
                        productItems[i].style.display = 'none';
                    }
                    break;

                default:
                    productItems[i].style.display = 'flex';
                    break;
            }
        }
        else {
            productItems[i].style.display = 'none';
        }
    }
});
cart.button.addEventListener('click', function () {
    let modal = d.querySelector('.modal');

    body.style.overflow = 'hidden';
    body.style.paddingRight = '17px';
    modal.classList.add('show');
});
modalClose.addEventListener('click', function () {
    body.style.overflow = 'visible';
    body.style.paddingRight = '0';
    this.closest('.modal').classList.remove('show');
});
form.addEventListener('submit', function (e) {
    for (let i = 0; i < modalInputs.length; i++) {
        modalInputs[i].classList.remove('error');
    }

    for(let i = 0; i < modalInputs.length; i++) {
        let input = modalInputs[i];
        let inputType = input.getAttribute('type');
        let inputValue = input.value;

        console.log(inputValue.match(regular[inputType]));

        if (regular[inputType].test(inputValue)) {
            input.classList.remove('error');
        }
        else {
            input.classList.add('error');
        }
    }

    let errors = d.querySelectorAll('.modal-form__input.error');

    if (errors.length > 0) {
        e.preventDefault();
    }
    else {
        alert('Спасибо за покупку');
        cart.items.innerText = 'XXX';
        cart.summary.innerText = 'XXX';

        for (let i = 0; i < modalInputs.length; i++) {
            modalInputs[i].value = '';
        }

        d.querySelector('.modal').classList.remove('show');
    }
});