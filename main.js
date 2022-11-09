
// CHANGE SLIDER IMAGE
let leftArrow = document.querySelector('.left');
let rightArrow = document.querySelector('.right');
let slideImage = document.querySelector('.slide');
let currentImage = 1;
if(leftArrow){
    leftArrow.addEventListener('click', ()=>{
        currentImage--;
        if(currentImage === 0){
            currentImage = 3;
        }
        slideImage.style.backgroundImage = `url("assets/img/slider/slideImg${currentImage}.jpg")`;
    })
    rightArrow.addEventListener('click', ()=>{
        currentImage++;
        if(currentImage === 4){
            currentImage = 1
        }
        slideImage.style.backgroundImage = `url("assets/img/slider/slideImg${currentImage}.jpg")`;
    })
}

// CREATE DYNAMIC ELEMENTS
const sectionProducts = document.querySelector('section.products');

// CREATE PRODUCT ARTICLES
let prodNamesArr = new Array('Kick advanced gaming mouse' ,'Roccat XP Wireless Gaming Mouse' , 'Huano Kyocin Gaming Mouse' , 'Razer deathstalker V2 PRO' , 'Razer a32 gaming keyboard' , 'APX mechanical keyboard' , 'JBL quantum stereo microphone', 'Asus TF2 gaming monitor' , 'Onikuma K210 PRO wired')
let prodPricesArr = new Array(33, 40, 25, 100 , 120 ,80,20 , 240 , 80);
let imgSrcsArr = new Array('mouse1' , 'mouse2' , 'mouse3' , 'key1' , 'key2' , 'key3' , 'micro1' , 'monitor1'  ,'heads1');
let productsArr = new Array();

createProductsArr();
createProducts(productsArr)
function Product(name , src , price){
    this.name = name;
    this.imgSrc = src;
    this.price = price;
    this.createProducts = createProducts;
}

// CREATE HEADER NAV LIST
const headerNavbar = document.querySelector('header .navbar nav');
let navLinks = new Array('Home' , 'Services' , 'Contact' , 'About us' , 'Author');
createNavList(headerNavbar);

// CREATE FOOTER NAV LIST
let footerNavbar = document.querySelector('.footer .navbar nav')
createNavList(footerNavbar)

//SOCIAL NETWORK LIST
let socialNetworkDiv = document.querySelector('.social-networks')
let socialLinksContent = new Array('<i class="fab fa-instagram"></i>' ,'<i class="zmdi zmdi-github-alt"></i>' ,'<i class="zmdi zmdi-twitter"></i>' , '<i class="zmdi zmdi-facebook"></i>' , '<i class="zmdi zmdi-youtube-play"></i>', '<i class="zmdi zmdi-linkedin"></i>');
let socialLinksHref = new Array('instagram' , 'github' , 'twitter' , 'facebook', 'youtube', 'linkedin');
createSocialNetworkList( socialNetworkDiv , socialLinksContent , socialLinksHref );

// CREATE FILTER CHECKBOXES
let checkboxForm = document.querySelector('.filter form .check-boxes');
let labelsTextContent = new Array('Mouse' , 'Keyboard' , 'Monitor' , 'Headphones' , 'Microphone');
createFilterCheckBoxes( checkboxForm , labelsTextContent );

// CREATE SORT SELECT OPTIONS
let selectTag = document.querySelector('.sortSelect');
let optValues = new Array('null' , 'ascPrice', 'descPrice' , 'ascName', 'descName');
let optText = new Array('Sort order' , 'Ascending price', 'Descending price' , 'Ascending name', 'Descending name');
createSortOptions( selectTag , optValues ,optText );

// SEARCH INPUT

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    // UKLANJANJE SLIDERA
    if(document.querySelector('.slider'))document.querySelector('.slider').parentElement.remove();

    let searchValue = searchInput.value;
    searchValue = ( searchValue.length > 3 )? searchValue.substring(0 , 3): searchValue;

    // UKLANJANJE PARAGRAFA
    document.querySelector('.products p').classList.remove('visible');
    document.querySelector('section.products').classList.remove('flexbox');

    // DA LI SE U OBJEKTU PRODUCT ,IZ NIZA PRODUCTS ARR, NALAZI VREDNOST SEARCH INPUTA
    let filterProductsArr = productsArr.filter(product =>{
        if(product.name.toLowerCase().search(searchValue.toLowerCase()) !== -1  ){
            return product;
        }
    })
    // AKO NEMA NI JEDNOG PRODUCTA KOJI ODGOVARA SEARCHU TADA SE POJAVLJUJE PARAGRAF SA PORUKOM
    if(!filterProductsArr.length){
        document.querySelector('section.products').classList.add('flexbox');
        document.querySelector('.products p').classList.add('visible');
    }
    // DODAVANJE SVIH PROIZVODE U SECTION
    createProducts(filterProductsArr);
    // console.log(filterProductsArr);
})

// MAKING POPUP CART VISIBLE
const cartBtn = document.querySelector('header .shopping-cart');
const popupCart = document.querySelector('.popup-cart');
let productNum = totalPrice = 0; // THIS IS USED IN ADDTOCART FUNCTION
cartBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    popupCart.classList.add('visible');
    document.body.style.overflow = 'hidden';
})
// HIDDING POPUP IF USER CLICKS ON CLOSEBTN
const closeCartBtn = document.querySelector('.popup-cart #closeBtn')
closeCartBtn.addEventListener('click',()=>{
    popupCart.classList.remove('visible');
    document.body.style.overflow = 'inherit';
})
// REMOVING CART IF USER CLICKS ON THE BACKGROUND
popupCart.addEventListener('click', (e)=>{
    let clickedEl = e.target.classList;
    for(let i = 0; i<clickedEl.length; i++){
        if(clickedEl[i]==='popup-cart'){
            popupCart.classList.remove('visible');
            document.body.style.overflow = 'inherit';
        }
    }
}) 
function createProductsArr() {
    for(let i = 0; i< prodNamesArr.length ; i++){
        productsArr[i] = new Product(prodNamesArr[i] , imgSrcsArr[i],  prodPricesArr[i])
    }
}
function createProducts(productsArr) {
    for(let articleProduct of document.querySelectorAll('.product')){
        articleProduct.remove();
    }
    productsArr.forEach(product =>{
        // CREATING ALL ELEMENTS OF SINGLE PRODUCT ARTICLE
        let article = document.createElement('article');
        article.classList.add('product');
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        img.alt = product.name;
        img.src = `assets/img/products/${product.imgSrc}.png`;
        img.classList.add('image-fluid');
        let h3 = document.createElement('h3');
        h3.classList.add('product-name');
        h3.textContent = product.name;
        let footer = document.createElement('footer')
        let p = document.createElement('p');
        p.classList.add('price');
        p.textContent = `$${product.price}`;
        let button = document.createElement('button');
        button.classList.add('addToCart');
        button.setAttribute('onclick' , 'addToCart(event)')
        button.textContent = 'Add to cart';
    
        // ADDING ELEMENTS TO THEIR PARENT
        figure.appendChild(img);
        figure.appendChild(h3);
        footer.appendChild(p);
        footer.appendChild(button);
        article.appendChild(figure);
        article.appendChild(footer);
        sectionProducts.appendChild(article);
    })
}
function createNavList(parentNav) {
    let ul = document.createElement('ul');
    navLinks.forEach(link =>{
        let li = document.createElement('li');
        let a = document.createElement('a');
        link = link.trim();
        a.textContent = link;
        if(link.indexOf(' ') !== -1){
            link = link.split(' ').join('');
        }
        let winLoc = window.location.href;
        winLoc = winLoc.substring((winLoc.lastIndexOf('/')+1))
        if(winLoc === ''){
            winLoc = 'index.html';
        }
        winLoc = winLoc.split('.')[0];
        link = (link === 'Home')?'index':link;
        if(link.toLowerCase() === winLoc){
            a.classList.add('active');
        }
        a.setAttribute('href' , `${link.toLowerCase()}.html`); 
        li.appendChild(a);
        ul.appendChild(li);
    })
    parentNav.appendChild(ul)
}
function createSocialNetworkList(parentDiv , contentList , hrefList) {
        let ul = document.createElement('ul');
        for(let i = 0 ; i<contentList.length; i++){
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.innerHTML = contentList[i];
            a.setAttribute('href' , `https://www.${hrefList[i]}.com/`);
            li.appendChild(a);
            ul.appendChild(li);
        }
        parentDiv.appendChild(ul)
}
function createFilterCheckBoxes(form , labelsText) {
    for(let i = 0 ;i < labelsText.length; i++){
        let div = document.createElement('div');
        div.classList.add('checkBoxEl');
        let input =  document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', labelsText[i].toLowerCase());
        input.setAttribute('value', labelsText[i].toLowerCase());
        input.setAttribute('id', labelsText[i].toLowerCase());
        let label = document.createElement('label');
        label.textContent = labelsText[i];
        label.setAttribute('for' , labelsText[i].toLowerCase());
        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
    }
    
}
function createSortOptions(selectTag , optValues , optText) {
    for(let i = 0; i< optValues.length; i++){
        let optionTag = document.createElement('option');
        optionTag.value = optValues[i];
        optionTag.textContent = optText[i];
        selectTag.appendChild(optionTag);
    }
}
function addToCart(e){
    let parentProductDiv = e.target.closest('.product');
    let productName =  parentProductDiv.querySelector('.product-name').textContent;
    let productPrice =  parentProductDiv.querySelector('.price').textContent;
    let productImage = parentProductDiv.querySelector('.image-fluid').src;
    let cartUl = popupCart.querySelector('ul');
    let cartLis = cartUl.children;
    let ind = false;

    if(productNum){

        for(let i = 0;i< cartLis.length;i++){
            currentProdName = cartLis[i].querySelector('[data-content="productName"]').textContent;
            // AKO JE PRODUCT DODAT U LISTU ON SE NE DODAJE OPET , VEC SE SAMO POVECAVA NJEGOV INPUT QUANTITY
            if(currentProdName === productName){
                ind = true;
                cartLis[i].querySelector('.quantity').value = +cartLis[i].querySelector('.quantity').value+ 1;
            }
        }
        // AKO TAJ ELEMENT NIJE VEC DODAT U LISTU ON SE DODAJE
        if(!ind){
            createProductInCartList(productName ,  productPrice , cartUl);
        }

    }else{
        createProductInCartList(productName ,  productPrice , cartUl);
    }
    productNum++;
    totalPrice += +productPrice.substring(1);
    popupCart.querySelector('.totalPrice').textContent = '$'+totalPrice;
    document.querySelector('.productsNum').textContent = productNum;
}
function createProductInCartList(name ,price ,list){

    // CREATING ELEMENTS AND ADDING THEIR ATTRIBUTES
    let li = document.createElement('li');
    let p1 = document.createElement('p');
    p1.textContent = name;
    p1.setAttribute('data-content' , 'productName');
    let p2 = document.createElement('p');
    p2.textContent = price;
    p2.setAttribute('data-content' , 'price')
    let input = document.createElement('input');
    input.setAttribute('type' , 'number');
    input.classList.add('quantity')
    input.setAttribute('name' , 'quantity');
    input.setAttribute('value' , '1');
    input.setAttribute('min' , '1');
    input.setAttribute('max' , '20');
    input.setAttribute('onkeydown' , 'return false');
    input.setAttribute('onchange', 'changeProductsNumberInCartList(event)');
    let button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-trash"></i>';
    button.classList.add('deleteBtn');
    button.setAttribute('onclick' , 'deleteProductFromCartList(event)');

    // ADDING ELEMENTS TO THEIR PARENTS
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(input);
    li.appendChild(button);
    list.appendChild(li);
}
function changeProductsNumberInCartList(e){
    let quantInputs = popupCart.querySelectorAll('.quantity');
    productNum= totalPrice = 0;
    quantInputs.forEach(quant =>{
        productNum += +quant.value;
        let parentLi = quant.parentElement;
        console.log(parentLi);
        let currentProductPrice = parentLi.querySelector('[data-content="price"]').textContent.substring(1);
        console.log(quant.value);
        console.log(currentProductPrice);
        totalPrice += quant.value * currentProductPrice;
    })
    popupCart.querySelector('.totalPrice').textContent = '$'+totalPrice;
    popupCart.querySelector('.productsNum').textContent = productNum;
    // let parentLi = e.target.parentElement;
    // let currentProductPrice = parentLi.querySelector('[data-content="price"]').textContent.substring(1);
    // let previousQuantity = --parentLi.querySelector('.quantity').textContent;  
    // totalPrice = popupCart.querySelector('.totalPrice').textContent.substring(1);
    // totalPrice = 
    // popupCart.querySelector('.totalPrice').textContent = +totalPrice;
    // totalPrice = +parentLi.querySelector('[data-content="price"]').textContent;



}
function deleteProductFromCartList(e){
    e.preventDefault();
    let parentDiv =  e.target.closest('li');
    parentDiv.remove();
}