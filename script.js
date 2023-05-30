window.onload = function() {
    
    let categories = ['Категорія 1', 'Категорія 2', 'Категорія 3'];

    let products = [
        [{name: 'Продукт 1.1', price: 1}, {name: 'Продукт 1.2', price: 2}],
        [{name: 'Продукт 2.1', price: 3}, {name: 'Продукт 2.2', price: 4}, {name:'Продукт 2.3', price: 5}],
        [{name: 'Продукт 3.1', price: 6}, {name: 'Продукт 3.2', price: 7}]                                   
    ];

    let infoBlocks = [
        ['Інформація про товар 1.1', 'Інформація про товар 1.2'],
        ['Інформація про товар 2.1', 'Інформація про товар 2.2', 'Інформація про товар 2.3'],
        ['Інформація про товар 3.1', 'Інформація про товар 3.2']                             
    ];
       
    const divParent = document.getElementById('parent');
    divParent.setAttribute('style', 'display: flex');

    const divOrder = document.getElementById('order');
    divOrder.setAttribute('style', 'display: none');
    const titleOrder = document.createElement('h3');
    titleOrder.textContent = 'Інформація про замовлення:';
    divOrder.appendChild(titleOrder);
    const pOrder = document.createElement('p');
    divOrder.appendChild(pOrder);
    const pQuantity = document.createElement('p');
    divOrder.appendChild(pQuantity);
    const pDelivery = document.createElement('p');
    divOrder.appendChild(pDelivery);

    const divCart = document.getElementById('cart');
    divCart.setAttribute('style', 'display: none');
    
    let arrayCart = JSON.parse(localStorage.getItem('orders')) || [];
    
    function displayOrders() {
        divCart.setAttribute('style', 'display: block; margin-left: 50px');
        localStorage.setItem('orders', JSON.stringify(arrayCart));  
        divCart.innerHTML = '';
    
        for (let i = 0; i < arrayCart.length; i++) {        
        const divCartItem = document.createElement('div');
        divCartItem.setAttribute('style', 'margin-top: 20px');
        divCart.appendChild(divCartItem);

        const aCart = document.createElement('a');
        aCart.innerHTML = arrayCart[i].date + ' Вартість замовлення: ' + (arrayCart[i].cost * arrayCart[i].quantity) + ' грн.';
        aCart.setAttribute('style', 'cursor: pointer; font-weight: bold');
        
        const buttonDeleteOrder = document.createElement('button');
        buttonDeleteOrder.textContent = 'Видалити замовлення';
        buttonDeleteOrder.setAttribute('style', 'cursor: pointer; margin-left: 50px');
        divCartItem.appendChild(aCart);
        divCartItem.appendChild(buttonDeleteOrder);      
        
        buttonDeleteOrder.addEventListener('click', (event) => {
            deleteOrders(i);             
        });

        aCart.addEventListener('click', (event) => {          
            const divCartItemDetails = document.createElement('div');
            divCartItem.appendChild(divCartItemDetails);
            divCartItemDetails.insertAdjacentHTML('beforeend', 
                `
                <p>${arrayCart[i].information}</p>
                <p>Ціна: ${arrayCart[i].cost} грн.</p>
                <p>Кількість: ${arrayCart[i].quantity} од.</p>
                <p>Адреса доставки: ${arrayCart[i].city}, склад Нової пошти № ${arrayCart[i].post}</p>
                `
            );       
        }, {once: true});        
    }
    }

    function deleteOrders(i) {
        arrayCart.splice(i, 1);         
        displayOrders();             
    }
    
    const divCategories = document.createElement('div');
    divParent.appendChild(divCategories);
    divCategories.setAttribute('style', 'display: flex; flex-direction: column; width: 350px; margin: 0 50px');

    const divProducts = document.createElement('div');
    divParent.appendChild(divProducts); 
    divProducts.setAttribute('style', 'visibility: hidden');                
    
    const divInfoBlocks = document.createElement('div');
    divParent.appendChild(divInfoBlocks);
    divInfoBlocks.setAttribute('style', 'visibility: hidden');
    
    for (let i = 0; i < categories.length; i++) {
        const divCategory = document.createElement('a');
        divCategory.setAttribute('style', 'cursor: pointer; margin-bottom: 20px');
        divCategories.appendChild(divCategory);
        divCategory.innerHTML = categories[i];
        divCategory.classList.add(`cat${i + 1}`);  
                
        for (let j = 0; j < products[i].length; j++) {  
            const divProduct = document.createElement('a'); 
            divProducts.appendChild(divProduct);
            divProduct.innerHTML = products[i][j].name;
            divProduct.classList.add(`cat${i + 1}`, `cat${i + 1}_${j + 1}`);   
            
            const priceProduct = products[i][j].price;
            
            const divInfoBlock = document.createElement('div');
            divInfoBlocks.appendChild(divInfoBlock);
            divInfoBlock.classList.add(`cat${i + 1}_${j + 1}`);

            const myInfo = document.createElement('p');
            myInfo.setAttribute('style', 'margin-top: 0');
            divInfoBlock.appendChild(myInfo);
            myInfo.innerHTML = infoBlocks[i][j];            

            const myButton = document.createElement('button');
            divInfoBlock.appendChild(myButton);
            myButton.textContent = 'Купити';
            myButton.id = 'buy_button';
            myButton.setAttribute('style', 'cursor: pointer');

            const myForm = document.createElement('form');
            divInfoBlock.appendChild(myForm);  
            
            const title = document.createElement('h4');
            myForm.appendChild(title);
            title.textContent = 'Форма замовлення:';

            const userName = document.createElement('input');
            userName.type = 'text';
            userName.placeholder = 'ПІБ';
            userName.value = '';
            userName.className = 'filled';
            myForm.appendChild(userName);
            userName.setAttribute('style', 'margin-bottom: 10px');

            const userCity = document.createElement('select');
            userCity.name = 'user_city';
            userCity.setAttribute('style', 'display: block');
            myForm.appendChild(userCity);
                
            const userCityOption1 = document.createElement('option');
            userCityOption1.value = 'kyiv';
            userCityOption1.text = 'Київ';
            userCity.appendChild(userCityOption1);

            const userCityOption2 = document.createElement('option');
            userCityOption2.value = 'odesa';
            userCityOption2.text = 'Одеса';
            userCity.appendChild(userCityOption2);

            const userCityOption3 = document.createElement('option');
            userCityOption3.value = 'lviv';
            userCityOption3.text = 'Львів';
            userCity.appendChild(userCityOption3);

            const userCityOption4 = document.createElement('option');
            userCityOption4.value = 'dnipro';
            userCityOption4.text = 'Дніпро';
            userCity.appendChild(userCityOption4);

            const userCityOption5 = document.createElement('option');
            userCityOption5.value = 'kharkiv';
            userCityOption5.text = 'Харків';
            userCity.appendChild(userCityOption5);

            const userPost = document.createElement('input');
            userPost.type = 'text';
            userPost.name = 'user_post';
            userPost.placeholder = '№ складу Нової пошти';
            userPost.value = '';
            userPost.className = 'filled';
            myForm.appendChild(userPost);
            userPost.setAttribute('style', 'margin-bottom: 10px; margin-top: 10px');

            const userPostPaymentLabel = document.createElement('label');
            userPostPaymentLabel.for = 'post_payment';
            userPostPaymentLabel.textContent = 'післяплата ';
            myForm.appendChild(userPostPaymentLabel);
            userPostPaymentLabel.setAttribute('style', 'display: block');

            const userPostPaymentInput = document.createElement('input');
            userPostPaymentInput.id = 'post_payment';
            userPostPaymentInput.type = 'radio';
            userPostPaymentInput.name = 'user_payment';
            userPostPaymentInput.value = 'post';
            userPostPaymentInput.setAttribute('checked', 'checked');
            myForm.appendChild(userPostPaymentInput);

            const userCreditCardLabel = document.createElement('label');
            userCreditCardLabel.for = 'credit_card';
            userCreditCardLabel.textContent = 'банківська картка ';
            myForm.appendChild(userCreditCardLabel);
            userCreditCardLabel.setAttribute('style', 'display: block');

            const userCreditCardInput = document.createElement('input');
            userCreditCardInput.id = 'credit_card';
            userCreditCardInput.type = 'radio';
            userCreditCardInput.name = 'user_payment';
            userCreditCardInput.value = 'credit';
            myForm.appendChild(userCreditCardInput);

            const userQuantityLabel = document.createElement('label');
            userQuantityLabel.for = 'quantity';
            userQuantityLabel.textContent = "Кількість: ";
            myForm.appendChild(userQuantityLabel);
            userQuantityLabel.setAttribute('style', 'display: block');

            const userQuantityInput = document.createElement('input');
            userQuantityInput.id = 'quantity';
            userQuantityInput.name = 'user_quantity';
            userQuantityInput.type = 'text';
            myForm.appendChild(userQuantityInput);
            userQuantityInput.className = 'filled';

            const userComment = document.createElement('textarea');
            userComment.placeholder = 'Коментар';
            userComment.value = '';
            myForm.appendChild(userComment);
            userComment.setAttribute('style', 'display: block; margin-top: 10px');

            const buttonSubmit = document.createElement('button');
            buttonSubmit.type = 'submit';
            buttonSubmit.textContent = 'Оформити';
            myForm.appendChild(buttonSubmit);
            buttonSubmit.setAttribute('style', 'cursor: pointer; margin-top: 10px');

            buttonSubmit.addEventListener('click', (event) => { 
                event.preventDefault();                 
                let filledFields = myForm.querySelectorAll('.filled');
                for (i = 0; i < filledFields.length; i++) {
                    if (!filledFields[i].value) {
                        filledFields = true;
                    }                    
                }
                if (filledFields === true) {
                    alert('Помилка. Необхідно заповнити форму');
                } else {
                    divParent.setAttribute('style', 'display: none');
                    divOrder.setAttribute('style', 'display: block; margin-left: 50px');
                    pOrder.innerHTML = myInfo.innerHTML;
                    pQuantity.innerHTML = `Кількість: ${myForm.user_quantity.value}`;
                    let pDeliverySelected = myForm.user_city.options[myForm.user_city.selectedIndex];
                    pDelivery.innerHTML = `Адреса доставки: ${pDeliverySelected.text}, склад Нової пошти № ${myForm.user_post.value}`;

                    const newOrder = { 
                        date: new Date().toLocaleDateString(), 
                        cost: priceProduct, 
                        quantity: myForm.user_quantity.value,
                        information: myInfo.innerHTML,
                        city: pDeliverySelected.text,
                        post: myForm.user_post.value
                    };
                    arrayCart.push(newOrder);                  
                                    
                    localStorage.setItem('orders', JSON.stringify(arrayCart));
                }
            });  
        }        
    }  
   
    divCategories.addEventListener('click', (event) => {        
        let targetElement = event.target;
        let myClassName = targetElement.className;
        if (targetElement.tagName !== 'A') {                                    
            return;             
        } else {   
            divProducts.setAttribute('style', 'display: flex; flex-direction: column; width: 350px; margin-right: 50px');        
            for (let i = 0; i < divProducts.children.length; i++) {
                if (divProducts.children[i].classList.contains(myClassName)) {  
                    divProducts.children[i].setAttribute('style', 'display: block; cursor: pointer; margin-bottom: 20px');
                } else {
                    divProducts.children[i].setAttribute('style', 'display: none');
                }
            }  
            for (let i = 0; i < divInfoBlocks.children.length; i++) {
                divInfoBlocks.children[i].setAttribute('style', 'display: none'); 
                divInfoBlocks.children[i].lastChild.setAttribute('style', 'visibility: hidden');                    
            }  
        }                                         
    });    
    
    divProducts.addEventListener('click', (event) => {      
        let targetElement = event.target;        
        if (targetElement.tagName !== 'A') {                                    
            return;             
        } else {  
            divInfoBlocks.setAttribute('style', 'display: flex; flex-direction: column');          
            for (let i = 0; i < divInfoBlocks.children.length; i++) {
                let myClassName = divInfoBlocks.children[i].className;
                divInfoBlocks.children[i].lastChild.setAttribute('style', 'visibility: hidden');               
                if (targetElement.classList.contains(myClassName)) {
                    divInfoBlocks.children[i].setAttribute('style', 'display: block');
                } else {
                    divInfoBlocks.children[i].setAttribute('style', 'display: none');                    
                }
            }                      
        }                                   
    });
    
    divInfoBlocks.addEventListener('click', (event) => {    
            let targetElement = event.target;
            if (targetElement.tagName !== 'BUTTON') {
                return;
            } if (targetElement.id === 'buy_button') {
                targetElement.nextSibling.setAttribute('style', 'visibility: visible');               
            }        
    });   
        
    const ordersButton = document.createElement('button');
    ordersButton.textContent = 'Мої замовлення';
    ordersButton.setAttribute('style', 'cursor: pointer');
    divCategories.appendChild(ordersButton);

    ordersButton.addEventListener('click', (event) => {
        divParent.setAttribute('style', 'display: none');
        displayOrders();
    });
    
};





