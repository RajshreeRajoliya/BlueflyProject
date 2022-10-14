var prodList = JSON.parse(localStorage.getItem("prodList")) || [];

// console.log(prodList.length);
var plusbtns = document.getElementsByClassName("plus");
var minusbtns = document.getElementsByClassName("minus");
var inputfields = document.getElementsByClassName("side-qty");
// console.log(plusbtns);
// console.log(minusbtns);
// console.log(inputfields);
document.getElementById("baglogo").onclick = openDrawer;
//remove dummyBtn and put the cartId or class here

document.querySelector(".closeBtn").onclick = closeDrawer;
document.querySelector("#side-cart-btn").onclick = gotoCheckout;

display();

function display(){
    if(prodList.length>0){
        displaySide(prodList);
    }
    else{
        displayEmpty();
    }
}
function openDrawer(){
    console.log("open");
    document.querySelector(".sideCart").classList.add("clickedOpen");
    var div = document.createElement("div");
    document.querySelector("body").append(div);
    div.classList.add("opaque");
}
function closeDrawer(){
    console.log("close");
    document.querySelector(".sideCart").classList.remove("clickedOpen");
    document.body.style.backgroundColor = "transparent";
    document.querySelector(".opaque").remove();
}
function displayEmpty(){
    document.querySelector("#cartList").innerHTML = "";
    var msg = document.createElement("h3");
    msg.innerText = "Your cart is currently empty.";
    console.log(msg.innerText);
    document.querySelector("#cartList").append(msg);
    document.getElementById("side-cart-footer").innerHTML = "";
    updateTotal();

}

function displaySide(data){
    document.querySelector("#cartList").innerHTML = "";
    data.map((e, i)=>{
        // console.log(e);
        var divCartProds = document.createElement("div");
        divCartProds.classList.add("cart-products");
    
        var imageDiv = document.createElement("div");
        imageDiv.classList.add("side-image", "one-third");
    
        var aImg = document.createElement("a");
        aImg.setAttribute("href", "#");
        var img = document.createElement("img");
        img.setAttribute("src", e.image_url);
        aImg.append(img);
        imageDiv.append(aImg);

        var divDetails = document.createElement("div");
        divDetails.classList.add("side-cart-details", "two-third");

        var divWrapTitle = document.createElement("div");
        divWrapTitle.classList.add("wrap-title");

        var title = document.createElement("h3");
        title.classList.add("side-title");
        title.innerText = e.detail;

        var details = document.createElement("p");
        details.classList.add("side-clr-size");
        details.innerText = e.proName;

        divWrapTitle.append(title, details);

        var divInputPrice = document.createElement("div");
        divInputPrice.classList.add("side-input-price-div");

        var divInputBtn = document.createElement("div");
        divInputBtn.classList.add("input-btn", "one-half");

        var btnMinus = document.createElement("button");
        btnMinus.classList.add("minus");
        btnMinus.innerText = "-";
        btnMinus.addEventListener("click", function(){
            decreaseInput(e, i);
        })

        var input = document.createElement("input");
        input.classList.add("side-qty");
        input.value = e.qty;
        input.onchange = function(){
            qtyChange(e, i);
        }

        var btnPlus = document.createElement("button");
        btnPlus.classList.add("plus");
        btnPlus.innerText = "+";
        btnPlus.onclick = function(){
            increaseInput(e);
        }

        divInputBtn.append(btnMinus, input, btnPlus);

        var sidePrice = document.createElement("div");
        sidePrice.classList.add("side-price-individual", "one-half");

        var price = document.createElement("p");
        var p = e.qty * e.price;
        p = Math.round(p * 100)/100;
        // console.log(p);
        price.innerText = `$${p}`;

        sidePrice.append(price);

        divInputPrice.append(divInputBtn, sidePrice);

        divDetails.append(divWrapTitle, divInputPrice);
        divCartProds.append(imageDiv, divDetails);
        document.querySelector("#cartList").append(divCartProds);

        
    })
    updateTotal();

}

function updateTotal(){
    var t = 0;
    // console.log(prodList[0]);
    for(var i=0; i<prodList.length; i++){
        t = t + prodList[i].qty * prodList[i].price;
    }
    t = Math.round(t * 100)/100;
    // console.log(t);
    localStorage.setItem("sum", t);
    document.querySelector("#cartTotal").innerText = `$${t}`;
}

function qtyChange(e, i){
    var a = event.target.value;
    a = +a;
    // console.log(typeof a, a);
    a = a < 0 ? 0 : a;
    e.qty = a;
    localStorage.setItem("prodList", JSON.stringify(prodList));
    if(e.qty === 0){
        removeFromCart(e, i);
    }else {
        display();
    // console.log(a);
    }
    
}

function removeFromCart(e, i){
    var prod = document.getElementsByClassName("cart-products")[i];
    console.log(prod);
    prod.remove();
    prodList.splice(i, 1);
    localStorage.setItem("prodList", JSON.stringify(prodList));
    display();
    
}

function decreaseInput(e, i){
    var a = e.qty;
    a = +a;
    a--;
    a = a<0 || NaN ? 0 : a;
    e.qty = a;
    // console.log(a);
    // qtyChange(event, e);
    localStorage.setItem("prodList", JSON.stringify(prodList));
    if(e.qty === 0){
        removeFromCart(e, i);
    }else display();
}
function increaseInput(e){
    
    var a = e.qty;
    a = +a;
    a++;
    e.qty = a;
    // console.log(a);
    // qtyChange(e);
    localStorage.setItem("prodList", JSON.stringify(prodList));
    display();
}

function gotoCheckout(){
    // console.log("ch");
    location.href = "cart.html"; // put the link of cart.html or information.html
}

// for(var i=0; i<plusbtns.length; i++){
//     var plus = plusbtns[i];
//     var minus = minusbtns[i];
//     var input = inputfields[i];
    // plus.addEventListener("click", function (){
        // event.preventDefault();
        // console.log("hi");
        // var v = input.value;
        // console.log(v);
        // increaseInput(input);
    // });
    // minus.addEventListener("click", function (){
        
    //     decreaseInput(input);
    // });
    // plus.onclick = increaseInput(input);
// }

// function increaseInput(input){
//     // event.preventDefault();
    
//     var a = input.value;
//     a++;
//     input.value = a;
//     console.log(a);
//     console.log(typeof a);
//     qtyChange();
// }

// function decreaseInput(input){
//     var a = input.value;
//     a--;
//     a = a<0 ? 0 : a;
//     input.value = a;
//     console.log(a);
//     console.log(typeof a);
//     qtyChange();
// }