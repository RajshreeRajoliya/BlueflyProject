//need to check the keyname for prod array and cart products

var prodList = JSON.parse(localStorage.getItem("prodList")) || [];

display(prodList);

function display(data){
    var container = document.createElement("div");
    container.setAttribute("id", "container");

    var head = document.createElement("div");
    head.setAttribute("id", "heading");
    var h1 = document.createElement("h1");
    h1.innerText = "CART";
    var divP = document.createElement("div");
    var btnContinue = document.createElement("p");
    btnContinue.setAttribute("id", "btn-continue-shopping");
    btnContinue.innerText = "Continue Shopping";
    divP.append(btnContinue);
    head.append(h1, divP);

    var divRowHead = document.createElement("div");
    divRowHead.setAttribute("id", "wrap-row-head");
    var rowConstant = document.createElement("div");
    rowConstant.setAttribute("id", "row-constant");
    rowConstant.classList.add("two-fifth");

    var hPrice = document.createElement("p");
    hPrice.innerText = "Price";
    
    var hQty = document.createElement("p");
    hQty.innerText = "Quantity";
    
    var hTotal = document.createElement("p");
    hTotal.innerText = "Total";
    
    rowConstant.append(hPrice, hQty, hTotal);
    divRowHead.append(rowConstant);

    container.append(head, divRowHead);

    var divCartProd = document.createElement("div");
    divCartProd.classList.add("cart_products");

    data.map((e, i)=>{


        var divProductDetail = document.createElement("div");
        divProductDetail.classList.add("product-detail");

        var divImgAndDetails =document.createElement("div");
        divImgAndDetails.classList.add("image-and-details", "three-fifth");

        var divImage = document.createElement("div");
        divImage.classList.add("image", "one-fourth");

        var aImg = document.createElement("a");
        aImg.setAttribute("href", "#");
        var img = document.createElement("img");
        img.setAttribute("src", e.image_url);
        aImg.append(img);
        divImage.append(aImg);
        // divImgAndDetails.append(divImage);


        var divDetailsClrSize = document.createElement("div");
        divDetailsClrSize.classList.add("details-clr-size", "three-fourth");
        
        var prodTitle = document.createElement("div");
        prodTitle.classList.add("prod-title");
        var aTitle = document.createElement("a");
        aTitle.setAttribute("href", "#");
        var title = document.createElement("p");
        title.innerText = e.detail;
        aTitle.append(title);
        prodTitle.append(aTitle);

        var divColorSize = document.createElement("div");
        divColorSize.classList.add("color-size")
        var smallDetails = document.createElement("p");
        smallDetails.innerText = e.proName;
        divColorSize.append(smallDetails);

        var divRemBtn = document.createElement("div");
        divRemBtn.classList.add("remove-btn");
        var remove = document.createElement("p");
        remove.innerText = "REMOVE";
        divRemBtn.append(remove);
        divRemBtn.onclick = function(){
            removeItem(e, i);
        };
        divDetailsClrSize.append(prodTitle, divColorSize, divRemBtn);

        divImgAndDetails.append(divImage, divDetailsClrSize);

        var divPriceQtyTotal = document.createElement("div");
        divPriceQtyTotal.classList.add("price-qty-total", "two-fifth")

        var wrapPQT = document.createElement("div");
        wrapPQT.classList.add("wraps-price-qty-total");


        var price = document.createElement("div");
        price.classList.add("price");
        price.innerText = `$${e.price}`;
        
        var qty = document.createElement("div");
        qty.classList.add("qty");
        

        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "0");
        input.setAttribute("value", e.qty);

        input.onchange = function(){
            qtyChanged(e, i);
        };
        // input.innerText = e.qty;
        qty.append(input);
        //need to take this after update cart button;

        var total = document.createElement("div");
        total.classList.add("total");
        var totalThis = e.qty * e.price;
        totalThis = Math.round(totalThis * 100)/100;
        total.innerText = totalThis; //total logic = qty * price

        wrapPQT.append(price, qty, total);
        divPriceQtyTotal.append(wrapPQT);

        divProductDetail.append(divImgAndDetails, divPriceQtyTotal);
        divCartProd.append(divProductDetail);


    })

    container.append(divCartProd);

    var divCartTotal = document.createElement("div");
    divCartTotal.setAttribute("id", "cart-total");

    var divsubtotal = document.createElement("div");
    divsubtotal.classList.add("subTotal");
    var divSubText = document.createElement("div");
    divSubText.innerText = "SUBTOTAL";
    var divTotal = document.createElement("div");
    divTotal.setAttribute("id", "sumtotal");
    divTotal.innerText = ""
    //logic for total is sum of all the product;

    divsubtotal.append(divSubText, divTotal);

    var smalltext = document.createElement("p");
    smalltext.setAttribute("id", "small-text");
    smalltext.innerText = "Shipping, taxes, and discounts codes calculated at checkout.";

    var divBtns = document.createElement("div");
    divBtns.setAttribute("id", "btns");
    var updateBtn = document.createElement("button");
    updateBtn.setAttribute("id", "update-btn");
    var aCart = document.createElement("a");
    aCart.setAttribute("href", "#");
    aCart.innerText = "UPDATE CART";
    updateBtn.append(aCart);
    updateBtn.onclick = function(){
        updateSubtotal();
    }

    var checkoutBtn = document.createElement("button");
    checkoutBtn.setAttribute("id", "checkout-btn");
    var aChkout = document.createElement("a");
    aChkout.setAttribute("href", "information.html");
    aChkout.innerText = "CHECK OUT";
    checkoutBtn.append(aChkout);

    divBtns.append(updateBtn, checkoutBtn);

    divCartTotal.append(divsubtotal, smalltext, divBtns);
    
    container.append(divCartTotal);

    document.querySelector("#page-content").append(container);

    
}

function qtyChanged(e, i){
    e.qty = event.target.value
    // console.log(e.qty);
    // console.log(prodList[i]);
    var prod = document.getElementsByClassName("product-detail")[i];
    if(e.qty == 0){
        removeItem(e, i);
        // console.log(prod);
        // prod.remove();
    }
    updateThisTotal(e, i);

}

function updateThisTotal(e, i){
    console.log(e.qty, e.price);
    var totalThis = e.qty * e.price;
    totalThis = Math.round(totalThis * 100)/100;
    console.log(totalThis);
    var targetTotal = document.getElementsByClassName("total")[i];
    targetTotal.innerText = totalThis;
    console.log(targetTotal.innerText);
}

function removeItem(e, i){
    var prod = document.getElementsByClassName("product-detail")[i];
    prod.remove();
    console.log(e, i);
}

function updateSubtotal(){
    var subtotal = document.getElementById("sumtotal");
    var qty = document.querySelectorAll("input");
    var totalSingle = document.querySelectorAll(".total");
    var sum = 0;
    for(var i=0; i<qty.length; i++){
        sum += qty[i].value * +totalSingle[i].innerText;
        console.log(totalSingle[i].innerText);
    }
    subtotal.innertext = ("$", sum);
    console.log(subtotal.innerText);
}