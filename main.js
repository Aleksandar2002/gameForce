// PRELOADER
window.addEventListener('load' , ()=>{
    let headerHeight = window.getComputedStyle(document.querySelector('header')).getPropertyValue('height');
    document.querySelector('.preloader').classList.add('hide');
    document.querySelector('.main').style.paddingTop = headerHeight; 
})
window.addEventListener('resize' , ()=>{
    let headerHeight = window.getComputedStyle(document.querySelector('header')).getPropertyValue('height');
    document.querySelector('.main').style.paddingTop = headerHeight; 
})
window.addEventListener('scroll' , ()=>{
    let headerHeight = window.getComputedStyle(document.querySelector('header')).getPropertyValue('height');
    let header = document.querySelector('header');

    if(window.scrollY > parseInt(headerHeight) )
    header.classList.add('semi-transparent');
    if(window.scrollY < parseInt(headerHeight))
    header.classList.remove('semi-transparent');
});

// CHANGE SLIDER IMAGE
let previousBtn = document.querySelector('#previousBtn');
let nextBtn = document.querySelector('#nextBtn');
let slideImages = document.querySelectorAll('.slide');

slideImages.forEach((slide , index) =>{
    slide.style.transform = `translateX(${index * 100}%)`;
    slide.style.backgroundImage = `url("assets/img/slider/slideImg${index+1}.jpg")`;
})
let currentImage = minSlide = maxSlide = previousImage = 0;
maxSlide = slideImages.length-1;

if(previousBtn){
    previousBtn.addEventListener('click', ()=>{
        if(currentImage === minSlide){
            currentImage = maxSlide;
        }else{
            currentImage--;
        }
        slideImages.forEach((slide, index) =>{
            slide.style.transform = `translateX(${100 * (index - currentImage)}%)`;
            slide.classList.add('animate');
        })
    })
    nextBtn.addEventListener('click', ()=>{
        previousImage = currentImage;
        if(currentImage === maxSlide){
            currentImage = 0;
        }else{
            currentImage++;
        }
        slideImages.forEach((slide, index) =>{
            if(index === 1){
                slide.classList.add('first-visible')
            }
            slide.style.transform = `translateX(${100 * (index - currentImage)}%)`;
            slide.classList.add('animate');
        })
    })
    let slideInterval  = setInterval(()=>{
        previousImage = currentImage;
        if(currentImage === maxSlide){
            currentImage = 0;
        }else{
            currentImage++;
        }
        slideImages.forEach((slide, index) =>{
            if(index === 1){
                slide.classList.add('first-visible')
            }
            slide.style.transform = `translateX(${100 * (index - currentImage)}%)`;
            slide.classList.add('animate');
        })
    },20000)
}

let currentPage = window.location.href;
currentPage = currentPage.substring(currentPage.lastIndexOf('/')+1);

if(currentPage === ''){
    currentPage = 'index';
}else{
    currentPage = currentPage.substring(0  , currentPage.lastIndexOf('.'));
}


// IF THE CURRENT PAGE IS INDEX HTML DO THIS
if(currentPage === 'index'){
    
    // CREATE DYNAMIC ELEMENTS
    const sectionProducts = document.querySelector('section.products');
    // CREATE PRODUCT ARTICLES
    let prodNamesArr = new Array('Kick advanced gaming mouse' ,'Roccat XP Wireless Gaming Mouse' , 'Huano Kyocin Gaming Mouse' , 'Razer deathstalker V2 PRO' , 'Razer a32 gaming keyboard' , 'APX mechanical keyboard' , 'JBL quantum stereo microphone', 'Asus TF2 gaming monitor' , 'Onikuma K210 PRO wired')
    let prodPricesArr = new Array(33, 40, 25, 100 , 120 ,80,20 , 240 , 80);
    let imgSrcsArr = new Array('mouse1' , 'mouse2' , 'mouse3' , 'key1' , 'key2' , 'key3' , 'micro1' , 'monitor1'  ,'heads1');
    let prodTypesArr = new Array('mouse' , 'mouse' , 'mouse' , 'keyboard' , 'keyboard' , 'keyboard' , 'microphone' , 'monitor'  ,'headphone');
    let productsArr = new Array();

    createProductsArr();
    createProductsArticle(productsArr)
    let cloneProdArr = [...productsArr];

    // CREATE SORT SELECT OPTIONS
    const selectTag = document.querySelector('.sortSelect');
    let optValues = new Array('null' , 'ascPrice', 'descPrice' , 'ascName', 'descName');
    let optText = new Array('Sort order' , 'Ascending price', 'Descending price' , 'Ascending name', 'Descending name');
    createSortOptions( selectTag , optValues ,optText );

    // SEARCH INPUT
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    let searchProductsArr = new Array();
    let isSearching = false;

    searchBtn.addEventListener('click', (e)=>{
        e.preventDefault();

        // UKLANJANJE SLIDERA
        if(document.querySelector('.slider'))document.querySelector('.slider').parentElement.remove();

        let searchValue = searchInput.value;
        searchValue = ( searchValue.length > 3 )? searchValue.substring(0 , 3): searchValue;
        isSearching = ( searchValue.trim().length === 0)?false : true;
        // UKLANJANJE PARAGRAFA
        document.querySelector('.products p').classList.remove('visible');
        document.querySelector('section.products').classList.remove('flexbox');

        // DA LI SE U OBJEKTU PRODUCT ,IZ NIZA PRODUCTS ARR, NALAZI VREDNOST SEARCH INPUTA
        searchProductsArr = cloneProdArr.filter(product =>{
            if(product.name.toLowerCase().search(searchValue.toLowerCase()) !== -1  ){
                return product;
            }
        })
        // AKO NEMA NI JEDNOG PRODUCTA KOJI ODGOVARA SEARCHU TADA SE POJAVLJUJE PARAGRAF SA PORUKOM
        if(!searchProductsArr.length){
            document.querySelector('section.products').classList.add('flexbox');
            document.querySelector('.products p').classList.add('visible');
        }
        // DODAVANJE SVIH PROIZVODE U SECTION
        productsArr = [...searchProductsArr];
        createProductsArticle(searchProductsArr);
    })
        // CREATE FILTER CHECKBOXES
    const checkboxForm = document.querySelector('.filter form .checkboxes');
    let labelsTextContent = new Array('Mouse' , 'Keyboard' , 'Monitor' , 'Headphone' , 'Microphone');
    createFilterCheckBoxes( checkboxForm , labelsTextContent );



    // MAKING POPUP CART VISIBLE
    const cartBtn = document.querySelector('header .shopping-cart');
    const popupCart = document.querySelector('.popup-cart');
    const somethingIsInCartSpan = document.querySelector('.somethingIsInCart')
    let productNum = totalPrice = 0; // THIS IS USED IN ADDTOCART FUNCTION

    cartBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        popupCart.classList.add('visible');
        document.body.style.overflow = 'hidden';
    })

    // HIDDING POPUP IF USER CLICKS ON CLOSEBTN
    const closeCartBtn = document.querySelector('.popup-cart #closeBtn');

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

    // SORTING PRODUCTS
    selectTag.addEventListener('change', (e)=>{
        let currentOptionValue = e.target.value;
        switch ( currentOptionValue ){
            case 'ascPrice': sortProductsByPrice('asc');break;
            case 'descPrice': sortProductsByPrice('desc');break;
            case 'ascName': sortProductsByNames('asc');break;
            case 'descName': sortProductsByNames('desc');break;
            // default: productsArr = [...cloneProdArr];
        }
        createProductsArticle(productsArr);
    })

    // FILTER PRODUCTS
    const filterDiv = document.querySelector('#filter');
    const filterBtn = document.querySelector('#filterBtn');
    let isFilterVisible = false; // used in SHOW FILTER
    filterBtn.addEventListener('click' , (e)=>{
        e.preventDefault();

        // FILTER BY PRODUCT TYPES AND PRICE
        const typeCheckboxes = Array.from(filterDiv.querySelectorAll('.checkboxes input:checked'));
        var newProductArray = new Array;
        if(typeCheckboxes.length){
            for(let checkbox of typeCheckboxes){
                let checkboxValue = checkbox.getAttribute('value');
                if(isSearching){
                    filterProducts(searchProductsArr , newProductArray , checkboxValue);
                }   else{
                    filterProducts(cloneProdArr , newProductArray , checkboxValue);
                }
            }
            productsArr = [...newProductArray];
            createProductsArticle(newProductArray);
        }else{
            if(isSearching){
                productsArr= searchProductsArr.filter(product=>{
                    if(checkProductPrice(product))return product;
                })
                createProductsArticle(productsArr);
            } else{
                let newArray = cloneProdArr.filter(product=>{
                    if(checkProductPrice(product))return product;
                })
                productsArr = [...newArray];
                createProductsArticle(newArray);
            }
        }

        if(isFilterVisible){
            filterDiv.classList.remove('visible');
            isFilterVisible = false;
        }
    })

    // SHOW FILTER DIV ON SMALER RESOULUTION
    const showFilterBtn = document.querySelector('.showFilterDiv');

    showFilterBtn.addEventListener('click', ()=>{
        if(isFilterVisible){
            filterDiv.classList.remove('visible');
            isFilterVisible = false;
        } else{
            filterDiv.classList.add('visible');
            isFilterVisible = true;
        }
    })

    window.addEventListener('resize' , ()=>{
        // FILTER
        filterDiv.classList.remove('visible');
        isFilterVisible = false;
        if(!window.matchMedia("(max-width: 1380px)").matches){
            filterDiv.classList.add('visible');
        }

    })

    // FUNCTIONS
    function Product(name , src , price ,type){
        this.name = name;
        this.imgSrc = src;
        this.price = price;
        this.type = type;
        this.createProductsArticle = createProductsArticle;
    }
    function createProductsArr() {
        for(let i = 0; i< prodNamesArr.length ; i++){
            productsArr[i] = new Product(prodNamesArr[i] , imgSrcsArr[i],  prodPricesArr[i], prodTypesArr[i])
        }
    }
    function createProductsArticle(productsArr) {
    
        for(let articleProduct of document.querySelectorAll('.product')){
            articleProduct.remove();
        }
    
        productsArr.forEach(product =>{
            // CREATING ALL ELEMENTS OF SINGLE PRODUCT ARTICLE
            let article = document.createElement('article');
            article.classList.add('product');
            article.setAttribute('data-content', product.type);
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
    
            //  DISABLE BUTTON IF THAT PRODUCT IS IN CART LIST
            let popupCartLis = Array.from(document.querySelectorAll('.popup-cart li'));
            let isSome = popupCartLis.some(el=>{
                let productNameFromList = el.querySelector('[data-content="productName"]').textContent;
                if(productNameFromList.toLowerCase() === product.name.toLowerCase()){
                    return true;
                }
            })
            if(isSome) {
                disableAddToCartBtn(button);
            }
    
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
    function createFilterCheckBoxes(form , labelsText) {
        for(let i = 0 ;i < labelsText.length; i++){
            let div = document.createElement('div');
            div.classList.add('checkBoxEl');
            let input =  document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('name', labelsText[i].toLowerCase());
            input.setAttribute('value', labelsText[i].toLowerCase());
            input.setAttribute('id', labelsText[i].toLowerCase());
            // input.setAttribute('checked' , 'yes');
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
    
        // DISABLE ADDTOCART BTN
        let addToCartBtn = e.target;
        disableAddToCartBtn(addToCartBtn);
    
        createProductInCartList(productName ,  productPrice , cartUl);
    
        productNum++;
        totalPrice += +productPrice.substring(1);
        updateShoppingCartInterface();
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
        input.setAttribute('onchange', 'changeProductsNumberAndPriceInCartList(event)');
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
    function changeProductsNumberAndPriceInCartList(e){
        let quantInputs = popupCart.querySelectorAll('.quantity');
        productNum= totalPrice = 0;
    
        quantInputs.forEach(quant =>{
            productNum += +quant.value;
            let parentLi = quant.parentElement;
            let currentProductPrice = parentLi.querySelector('[data-content="price"]').textContent.substring(1);
            totalPrice += quant.value * currentProductPrice;
        })
        updateShoppingCartInterface();
    }
    function deleteProductFromCartList(e){
        e.preventDefault();
    
        let deletedProductLi =  e.target.closest('li');
        let deletedProductQuantity = deletedProductLi.querySelector('.quantity').value;
        let deletedProductPrice = deletedProductLi.querySelector('[data-content="price"]').textContent.substring(1);
        let deletedProductName = deletedProductLi.querySelector('[data-content="productName"]').textContent;
        
        productNum -= +deletedProductQuantity;
        totalPrice -= (+deletedProductQuantity * +deletedProductPrice);
        updateShoppingCartInterface();
        
        deletedProductLi.remove();
        
        // ENABLE ADD TO CART BUTTON AND REMOVE CLASS
        let allArticlesInProductSection = sectionProducts.querySelectorAll('.product');
        allArticlesInProductSection = Array.from(allArticlesInProductSection);
    
        let articleWithSameProdAsDeletedProd = allArticlesInProductSection.find(article =>{
            let prodName = article.querySelector('.product-name').textContent;
            if(prodName === deletedProductName)return article;
        })
    
        if(articleWithSameProdAsDeletedProd){
            let addToCartBtn = articleWithSameProdAsDeletedProd.querySelector('.addToCart');
            enableAddToCartBtn(addToCartBtn);
        }
    }
    function updateShoppingCartInterface(){
        popupCart.querySelector('.totalPrice').textContent = '$'+totalPrice;
        document.querySelector('.productsNum').textContent = productNum;
    
        if(productNum){
            somethingIsInCartSpan.classList.add('visible');
            somethingIsInCartSpan.textContent = productNum;
        }else{
            somethingIsInCartSpan.classList.remove('visible');
            somethingIsInCartSpan.textContent = '';
        }
    }
    function sortProductsByNames(sortType){
        if(sortType === 'asc'){
            productsArr.sort((a , b)=>{
                let aName = a.name.toLowerCase();
                let bName = b.name.toLowerCase();
                if(aName > bName){
                    return 1;
                }
                if(bName > aName){
                    return -1;
                }
                return 0
            });
        }else{
            productsArr.sort((a , b)=>{
                let aName = a.name.toLowerCase();
                let bName = b.name.toLowerCase();
                if(aName > bName){
                    return -1;
                }
                if(bName > aName){
                    return 1;
                }
                return 0
            });
        }
    }
    function sortProductsByPrice(sortType){
        if(sortType === 'asc'){
            productsArr.sort((a , b)=>{
                return a.price - b.price;
            })
        } else {
            productsArr.sort((a , b)=>{
                return b.price - a.price;
            })
        }
    }
    function disableAddToCartBtn(button){
        button.classList.add('added');
        button.disabled = true;
        button.textContent = 'Added';
    }
    function enableAddToCartBtn(button){
        button.classList.remove('added');
        button.disabled = false;
        button.textContent = 'Add to cart';
    }
    function checkProductPrice(product) {
        let minPriceInputValue =  filterDiv.querySelector('[name="minPrice"]').value;
        let maxPriceInputValue =  filterDiv.querySelector('[name="maxPrice"]').value;
    
        return(product.price >= minPriceInputValue && product.price <= maxPriceInputValue)?true:false;
    } 
    function filterProducts(baseArr , newArray , checkboxValue){
        baseArr.forEach(product =>{
            if(product.type === checkboxValue && checkProductPrice(product)){
                newArray.push(product);
            }
        })
    }
}
if(currentPage === 'services'){
    const ourServicesDivs = document.querySelectorAll('.our-services .service');
    const serviceImages = new Array('20.jpg' ,'s6.jpg' ,'u8.jpg');
    const fadeIn = new Array({opacity : '0'}, {opacity : '1'});

    // ADDING BACKGROUND IMAGE FOR ALL SERVICE DIVS , AND ADDING EVENTLISTENER ON THEM
    ourServicesDivs.forEach((div , index) =>{
        // ADDING BACKGROUND IMAGE
        div.style.backgroundImage = `url(../assets/img/services/${serviceImages[index]})`;

        // ADDING LAYER TO ALL SMALL BLOCKS
        if(div.classList.contains('smaller-block')){
            div.appendChild(addLayer(div.getAttribute('data-content')));
        }
        // EVENT LISTENER
        div.addEventListener('click' , ()=>{
            let divClasses = Array.from(div.classList);

            if(divClasses.includes('smaller-block')){

                if(div.classList.contains('top')){
                    swapServiceBlocks('top' , div)
                }else{
                    swapServiceBlocks('bottom', div);
                }
            }
        })
    })

    let infoContent = document.querySelector('.info-content');
    let singleInfos = Array.from(document.querySelectorAll('.single-info'));
    let nextBtn = document.querySelector('.nextArrow');
    let prevBtn = document.querySelector('.prevArrow');

    //MOVE DIVS TO THE RIGHT SIDE
    nextBtn.addEventListener('click' , e=>{
        singleInfos.forEach(info =>{
            // GET POSITON PROPERTIES FOR CURRENT INFO ELEMENT AND WHOLE INFOCONTENT DIV
            let singleInfoPosition = info.getBoundingClientRect();
            let infoContentPosition = infoContent.getBoundingClientRect();

            if(singleInfoPosition.left < infoContentPosition.right && infoContentPosition.right  < singleInfoPosition.right){

                let infoContentGap = getPropertyValue(infoContent , 'grid-column-gap')
                let infoWidth = getPropertyValue(info , 'width')
                
                // CHECKING IF ANY OF INFODIVS IS OUT OF THE INFOCONTENT DIV
                if(singleInfos.some(info=>{
                    let infoPosition = info.getBoundingClientRect();
                    if(infoPosition.left < infoContentPosition.left)return true;
                })){
                    tranlateSingleInfo(-(infoContentGap + infoWidth) , singleInfos);
                }else{
                    tranlateSingleInfo(0 , singleInfos)
                }
            }
            
        })
    })
    // MOVE DIVS TO THE LEFT SIDE
    prevBtn.addEventListener('click' , e=>{
        singleInfos.forEach(info =>{
            let singleInfoPosition = info.getBoundingClientRect();
            let infoContentPosition = infoContent.getBoundingClientRect();
            
            if(singleInfoPosition.left < infoContentPosition.left && infoContentPosition.left  < singleInfoPosition.right){

                let infoContentGap = getPropertyValue(infoContent , 'grid-column-gap')
                let infoWidth = getPropertyValue(info , 'width')
                
                if(singleInfos.some(info=>{
                    let infoPosition = info.getBoundingClientRect();
                    if(infoPosition.right > infoContentPosition.right)return true;
                })){
                    tranlateSingleInfo((infoContentGap + infoWidth) , singleInfos);
                }else{
                    tranlateSingleInfo(0 , singleInfos)
                }
            }
            
        })
    })
    window.addEventListener('scroll' , () =>{
        if(window.innerHeight-100 > infoContent.getBoundingClientRect().top){

            infoContent.classList.add('animate');
        }else if(window.innerHeight/1.05 < infoContent.getBoundingClientRect().top){
            infoContent.classList.remove('animate');
        }
    })


    // FUNCTION THAT MOVES ALL SINGLE INFO DIVS
    function tranlateSingleInfo(translateValue , items){
        items.forEach(item =>{
            item.style.transform = `translateX(${translateValue}px)`;
        })
    }
    function getPropertyValue(element , propertyName) {
        return parseInt(window.getComputedStyle(element).getPropertyValue(propertyName));
    }
    function addLayer(dataContent){
        let layer = document.createElement('div');
        layer.classList.add('layer');
        let p = document.createElement('p');
        p.innerText = dataContent;
        layer.appendChild(p);
        return layer;
    }
    function swapServiceBlocks(gridArea , currentDiv){
        let biggest = document.querySelector('.biggest-block');

        biggest.classList.remove('center');
        biggest.classList.remove('biggest-block');
        biggest.classList.add('smaller-block');
        biggest.classList.add(gridArea);
        biggest.animate(fadeIn , 2000);
        biggest.appendChild(addLayer(biggest.getAttribute('data-content')));
        
        currentDiv.classList.remove(gridArea);
        currentDiv.classList.remove('smaller-block');
        currentDiv.classList.add('biggest-block');
        currentDiv.classList.add('center');
        currentDiv.animate(fadeIn , 1500);
        currentDiv.querySelector('.layer').remove();
    }
}
if(currentPage === 'contact'){

    let formInputs = document.querySelectorAll('.contact-form .form-field input');

    formInputs.forEach(input =>{
        let parentFormField = input.parentElement;
        
        input.addEventListener('focus' , ()=>{
            parentFormField.querySelector('label').classList.add('goUp');
        })
        input.addEventListener('blur' , ()=>{

            if(input.value.length === 0){
                parentFormField.querySelector('label').classList.remove('goUp');
            } else{
            }
        })
    })

    let changeBtns = document.querySelectorAll('.change-section button');
    changeBtns.forEach(btn =>{
        btn.addEventListener('click' , (e)=>{
            let currentBtn = e.target;
            if(!currentBtn.classList.contains('active')){
                changeActiveBtn(currentBtn);
                let currentDataContent = currentBtn.getAttribute('data-content');
                switch(currentDataContent){
                    case 'company-info':{
                        let companyInfoWidth = window.getComputedStyle(document.querySelector('.company-info')).getPropertyValue('width');
                        document.querySelector('.info-form').style.transform = `translateX(${parseInt(0)}px)`;
                        break;
                    }
                    case 'contact-form':{
                        let contactFormWidth = window.getComputedStyle(document.querySelector('.contact-form')).getPropertyValue('width');
                        document.querySelector('.info-form').style.transform = `translateX(-${parseInt(contactFormWidth)}px)`;
                        break;
                    }
                }
            }
        })
    })
    window.addEventListener('resize' , ()=>{
        document.querySelector('.info-form').style.transform = 'translateX(0)';
        changeActiveBtn(document.querySelector('#showInfo'))
    })


    let errors = new Array([],[],[],[],[]);

    formInputs.forEach((input , inputNumber) => {
        input.addEventListener('input' , ()=>{
            errors[inputNumber] = [];
            let currentInput = input;
            let currentInputValue = input.value;
            switch(currentInput.getAttribute('name')){
                case 'username':{
                    if(!isNotEmpty(currentInputValue)){
                        errors[inputNumber].push('The field must not be empty');
                    }
                    if(!isLongEnough(currentInputValue , 6)){
                        errors[inputNumber].push('The field must be longer than 5 characters')
                    }
                    break;
                }
                case 'email':{
                    if(!isNotEmpty(currentInputValue)){
                        errors[inputNumber].push('The field must not be empty');
                    }
                    if(!isLongEnough(currentInputValue , 10)){
                        errors[inputNumber].push('The field must be longer than 9 characters')
                    }
                    if(!isValidEmail(currentInputValue)){
                        errors[inputNumber].push('Mail must be in this format: somename@gmail.com');
                    }
                    break;
                }
                case 'password':{
                    if(!isNotEmpty(currentInputValue)){
                        errors[inputNumber].push('The field must not be empty');
                    }
                    if(!isLongEnough(currentInputValue , 8)){
                        errors[inputNumber].push('The field must be longer than 7 characters')
                    }
                    if(!isValidPassword(currentInputValue)){
                        errors[inputNumber].push('Password must contain numbers , one small and one big latter')
                    }
                    errors[inputNumber+1].pop();
                    if(!passwordIsMatching(document.querySelector('[name="confirmPassword"]').value)){
                        errors[inputNumber+1].push('This field must be the same as field password');
                    }
                    break;
                }
                case 'confirmPassword':{
                    if(!isNotEmpty(currentInputValue)){
                        errors[inputNumber].push('The field must not be empty');
                    }
                    if(!isLongEnough(currentInputValue , 8)){
                        errors[inputNumber].push('The field must be longer than 7 characters')
                    }
                    if(!passwordIsMatching(currentInputValue)){
                        errors[inputNumber].push('This field must be the same as field password');
                    }
                    break;
                }
                case 'message':{
                    if(!isNotEmpty(currentInputValue)){
                        errors[inputNumber].push('The field must not be empty');
                    }
                    if(!isLongEnough(currentInputValue , 6)){
                        errors[inputNumber].push('The field must be longer than 5 characters')
                    }
                    break;
                }
            }
            errors.forEach(error=>{
                let submitBtn = document.querySelector('[name="sendBtn"]');
                if(error.length === 0){
                    submitBtn.removeAttribute('disabled');
                }else{
                    submitBtn.setAttribute('disabled' , 'disabled');
                }
            })
            showErrors();
        })
    })
    let submitBtn = document.querySelector('[name="sendBtn"]');
    submitBtn.addEventListener('click', e=>{
        e.preventDefault();
        ind = false;
        formInputs.forEach(input =>{
            if(!isNotEmpty(input.value)){
                ind = true;
            }
            console.log(input);
        })
        console.log(ind);
        if(!ind){
            showFormModal();
            document.querySelector('.contact-form form').reset();
        }
    })
    let okBtn = document.querySelector('.popupForm #okBtn');
    okBtn.addEventListener('click' , hideFormModal);

    let closeBtn = document.querySelector('.popupForm #closeBtn');
    closeBtn.addEventListener('click' , hideFormModal);

    // FUNCTIONS
    function isNotEmpty(inputValue) {
        if(inputValue.length === 0)return false;
        return true;
    }
    function isLongEnough(inputValue , requiredNumberOfCharacters) {
        if(inputValue.length < requiredNumberOfCharacters)return false;
        return true;
    }
    function isValidEmail(inputValue) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue))return true;
        return false;
    }
    function isValidPassword(inputValue) {
        let bigLatterBr = smallLatterBr = numBr = 0;
        for(let i = 0 ; i < inputValue.length ; i++){
            if(inputValue.charCodeAt(i) >= 48 && inputValue.charCodeAt(i) <= 57 )numBr++;
            if(inputValue.charCodeAt(i) >= 65 && inputValue.charCodeAt(i) <= 90 )bigLatterBr++;
            if(inputValue.charCodeAt(i) >= 97 && inputValue.charCodeAt(i) <= 122 )smallLatterBr++;
        }

        if(numBr && bigLatterBr && smallLatterBr)return true;
        return false;
    }
    function passwordIsMatching(inputValue){
        if(inputValue === document.querySelector('#password').value)return true;
        else false;
    }
    function showErrors(){
        // DELETE ALL SPANS IN FORM
        for(let span of document.querySelectorAll('.contact-form span')){
            span.remove();
        }
        // SHOW SPANS FOR EACH ELEMENT THAT HAS SOME ERRORS
        for(let errorsForEachInput in errors){
            errors[errorsForEachInput].forEach(error =>{
                // CREATING SPAN
                let span = document.createElement('span');
                span.classList.add('error');
                span.innerHTML = `${error}</br>`;

                let parentDiv = formInputs[errorsForEachInput].parentElement;
                parentDiv.appendChild(span);
            })
        }
    }
    function showFormModal(){
        let modal = document.querySelector('.popupForm');
        console.log(modal);
        modal.classList.add('visible');
    }
    function hideFormModal(){
        let modal = document.querySelector('.popupForm');
        modal.classList.remove('visible');
    }
    function changeActiveBtn(current){
        document.querySelector('.change-section .active').classList.remove('active');
        current.classList.add('active');
    }
}
if(currentPage === 'aboutus'){
    let ourOfficeDiv = document.querySelector('.our-office');
    let colDivs = ourOfficeDiv.querySelectorAll('.col');
    
    colDivs.forEach(col =>{
        let spans = col.querySelectorAll('span');
        col.addEventListener('mouseover', e=>{
            let rotationDeg = 8;
            spans.forEach((span)=>{
                if(rotationDeg !== 8){
                    span.classList.add('back');
                }
                span.style.transform = `rotate(${rotationDeg}deg)`;
                rotationDeg += 10;
            })
            let colImg = col.querySelector('img');
            colImg.classList.add('smaller');
            let pTag = col.querySelector('p');
            let h3Tag = col.querySelector('h3');
            pTag.classList.add('visible')
            h3Tag.classList.add('visible')
        })
        col.addEventListener('mouseout', e=>{
            spans.forEach(span=>{
                span.style.transform = `rotate(0deg)`;
            })
            let pTag = col.querySelector('p');
            let h3Tag = col.querySelector('h3');
            pTag.classList.remove('visible')
            h3Tag.classList.remove('visible')
            let colImg = col.querySelector('img');
            colImg.classList.remove('smaller');
        })
    })
    
}

// CREATE HEADER NAV LIST
const headerNavbar = document.querySelector('header .navbar nav');
let navLinks = new Array('Home' , 'Services' , 'Contact' , 'About us' , 'Author');
createNavList(headerNavbar);

// CREATE FOOTER NAV LIST
const footerNavbar = document.querySelector('.footer .navbar nav')
createNavList(footerNavbar)

//SOCIAL NETWORK LIST
const socialNetworkDiv = document.querySelector('.social-networks')
let socialLinksContent = new Array('<i class="fab fa-instagram"></i>' ,'<i class="zmdi zmdi-github-alt"></i>' ,'<i class="zmdi zmdi-twitter"></i>' , '<i class="zmdi zmdi-facebook"></i>' , '<i class="zmdi zmdi-youtube-play"></i>', '<i class="zmdi zmdi-linkedin"></i>');
let socialLinksHref = new Array('instagram' , 'github' , 'twitter' , 'facebook', 'youtube', 'linkedin');
createSocialNetworkList( socialNetworkDiv , socialLinksContent , socialLinksHref );

// SHOW NAVBAR WHEN HAMBURGER BTN IS CLICKED
const hamburgerBtn = document.querySelector('#hamburgerBtn');
let hamburgerIndex = false;
let smallNavbarNavTag = document.querySelector('.smallNavbar nav');
createNavList(smallNavbarNavTag);

hamburgerBtn.addEventListener('click' , ()=>{
    if(hamburgerIndex){
        smallNavbarNavTag.parentElement.style.width = '0' ;
        hamburgerIndex = false;
    } else{
        hamburgerIndex = true;
        smallNavbarNavTag.parentElement.style.width = '200px' ;
    }
})

// FUNCTIONS

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
        winLoc = winLoc.substring((winLoc.lastIndexOf('/')+1));
        
        if(winLoc === ''){
            winLoc = 'index.html';
        }
        winLoc = winLoc.split('.')[0];
        link = (link === 'Home')?'index':link;
        if(link.toLowerCase() === winLoc){
            a.classList.add('active');
        }
        if(winLoc === 'index'){
            if(link !== 'index'){
                link = `pages/${link}`;
            }
        } else{
            if(link === 'index'){
                link = `../${link}`;
            }
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
        parentDiv.appendChild(ul);
}
