//need to check the keyname for prod array and cart products

const { Http2ServerRequest } = require("http2");

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
    divRowHead.classList.add("two-fifth");

    var hPrice = document.createElement("p");
    hPrice.innerText = "Price";
    
    var hQty = document.createElement("p");
    hQty.innerText = "Quantity";
    
    var hTotal = document.createElement("p");
    hTotal.innerText = "Total";

    divRowHead.append(hPrice, hQty, hTotal);

    container.append(head, divRowHead);

    data.map((e)=>{

        var divCartProd = document.createElement("div");
        divCartProd.classList.add("cart_products");

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
        qty.innerText = "1";
        //need to take this after update cart button;

        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "0");

        var total = document.createElement("div");
        total.classList.add("total");
        total.innerText = "200"; //total logic = qty * price

        wrapPQT.append(price, qty, total);
        divPriceQtyTotal.append(wrapPQT);

        divProductDetail.append(divImgAndDetails, divPriceQtyTotal);
        divCartProd.append(divProductDetail);

        var divCartTotal = document.createElement("div");
        divCartTotal.setAttribute("id", "cart-total");

        var divsubtotal = document.createElement("div");
        divsubtotal.classList.add("subTotal");
        var divSubText = document.createElement("div");
        divSubText.innerText = "SUBTOTAL";
        var divTotal = document.createElement("div");
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

        var checkoutBtn = document.createElement("button");
        checkoutBtn.setAttribute("id", "checkout-btn");
        var aChkout = document.createElement("a");
        aChkout.setAttribute("href", "information.html");
        aChkout.innerText = "CHECK OUT";
        checkoutBtn.append(aChkout);

        divBtns.append(updateBtn, checkoutBtn);

        divCartTotal.append(divsubtotal, smalltext, divBtns);



    })
}