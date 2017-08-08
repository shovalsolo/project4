(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _carousel = require("./carousel");

exports.default = function (obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url + '?apiKey=' + obj.api + '&format=json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.statusText);
        };
        xhr.send(obj.body);
    });
};

},{"./carousel":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
                value: true
});

exports.default = function (obj) {

                for (var i = 0; i < obj.length; i++) {

                                //-------------jquery----------------------
                                // var newElement = document.createElement("div");
                                // $(newElement).css("background", "url("+mediumImage+")");
                                // $(newElement).append("<a class='Link' href="+url+"><p>"+title+"</p></a>");
                                // $(newElement).append("<input type='button' class='btn' onclick='location.href="+addToCartUrl+" value='Add to cart'>");
                                // $(newElement).addClass("pop");
                                // $(".bxSlider").append(newElement);
                                //---------------------------------------
                                if (obj[i].includedItemList.length > 0 && obj[i].manufacturer !== null) {

                                                var manufacturer = obj[i].manufacturer;
                                                var largeImage = obj[i].largeImage;
                                                var includedItem = obj[i].includedItemList[0].includedItem;

                                                var url = obj[i].url;
                                                var addToCartUrl = obj[i].addToCartUrl;
                                                var price = obj[i].regularPrice;
                                                var sku = obj[i].sku;

                                                var node = document.createElement("div");

                                                node.innerHTML = "\n                <h4 class=\"manufacturer\"> " + manufacturer + " </h4>\n                <h6 class=\"includedItem\"> " + includedItem + " </h6>\n                <h5 class=\"price\"> " + price + " </h5>";
                                                var btn = document.createElement("button");
                                                btn.setAttribute("class", "atc");
                                                btn.innerHTML = "Add to cart";
                                                btn.setAttribute("data-sku", sku);
                                                btn.setAttribute("data-price", price);
                                                node.appendChild(btn);

                                                node.setAttribute("class", "caro");
                                                node.style.backgroundImage = "url('" + largeImage + "')";
                                                node.style.backgroundRepeat = "no-repeat";
                                                node.style.height = '50vh';
                                                document.getElementById("slider").appendChild(node);
                                } else {}
                }
};

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./index":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*import Cart from "./cart";*/

//import * as y from "./productutil";


var _bestbuy = require("./bestbuy");

var _bestbuy2 = _interopRequireDefault(_bestbuy);

var _carousel = require("./carousel");

var _carousel2 = _interopRequireDefault(_carousel);

var _productutil = require("./productutil");

var _productutil2 = _interopRequireDefault(_productutil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import categoryutil from "./categoryutil";


var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.baseurl = "https://api.bestbuy.com/v1/products";
		this.url = "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))";
		this.category();
		this.initBBCall();
		this.x = new _productutil2.default();
	}

	_createClass(App, [{
		key: "initBBCall",
		value: function initBBCall() {
			var _this = this;

			(0, _bestbuy2.default)({ url: this.url, api: "8ccddf4rtjz5k5btqam84qak" })
			//request({url: "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))",api : "8ccddf4rtjz5k5btqam84qak"})
			.then(function (data) {
				(0, _carousel2.default)(data.products);

				_this.addToCart();

				/* fill carosel with products */
			}).catch(function (error) {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
		}
	}, {
		key: "category",
		value: function category() {
			var _this2 = this;

			// Listen for click on category .category when li is clicked then retrive value for sku and price
			// init new categoryutil().category() pass both sku and price
			//-------------------java-script--------------------

			// var selected = document.getElementsByClassName("category");
			// for (var i = 0; i < selected.length; i++){
			//    selected[i].addEventListener("click", (e) =>  {
			// 	   var selectedCategory = e.target.getAttribute("category-data");
			//        new categoryutil().category(selectedCategory);
			//    });
			// }


			$(".option").on("click", function (e) {
				//getting the button id when clicking on the button
				var target = e.target.value;
				//setting a param and getting the value from the button that is the id of the link 
				_this2.url = _this2.baseurl + target;
				//concatinating the url with the base url and the value fron the button data
				$(".caro").remove();
				//
				_this2.initBBCall();
				//calling the initBBcall to call the api
			});
		}
	}, {
		key: "addToCart",
		value: function addToCart() {
			var _this3 = this;

			// Listen for any click that happens on .atc when button is clicked then retrive value for sku and price
			// init new productutil().addToCart() pass both sku and price

			//-----------------jquery-------------------------
			// $(".atc").on("click",  function(){

			// 	var sku = $(this).attr('data-sku');
			// 	var price = $(this).attr('data-price');
			// 	new productutil().addToCart(sku,price);
			// });

			//-------------------java-script--------------------
			var adding = document.getElementsByClassName("atc");
			for (var i = 0; i < adding.length; i++) {
				adding[i].addEventListener("click", function (e) {
					var sku = e.target.getAttribute("data-sku");
					var price = e.target.getAttribute("data-price");
					_this3.x.addToCart(sku, price);
				});
			}

			// 	$("#productContainer").on("click", ".addButton", (x) =>{
			// 	let product = new cart;
			// 	product.sku = $(x.target).data("sku");
			// 	product.price = $(x.target).data("price");
			// 	product.addToCart();
			// });
		}
	}]);

	return App;
}();

exports.default = App;

var x = new App();

},{"./bestbuy":1,"./carousel":2,"./productutil":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        // console.log("12 work");
        this.total = 0; //will be the counter of the quantity of all items 
        this.amount = 0; //will be the sum of the same item
        //this.getTotal();
    }

    _createClass(_class, [{
        key: "addToCart",
        value: function addToCart(sku, price) {

            var cart = { price: price, qty: 0 }; // price of item ant the quantity of the item
            var item = JSON.parse(sessionStorage.getItem(sku)); // inserting begining state to item


            //adding to sessionStorage after converting to string
            if ((typeof Storage === "undefined" ? "undefined" : _typeof(Storage)) !== undefined) {

                if (item == null) {
                    //
                    cart.qty = 1;
                    this.total = 1;
                    this.amount = cart.price * cart.qty;
                    console.log("cart qty " + cart.qty);
                    console.log("amounty " + this.amount);
                    $(".totals").html("the total amount is : " + this.amount);

                    //console.log("total "+this.total);
                    //$(".counter").html(this.total);
                } else {
                    cart.qty = item.qty + 1;
                    this.amount = cart.price * cart.qty;
                    console.log("cart qty " + cart.qty);
                    console.log("amounty " + this.amount);
                    $(".totals").html("the total amount is : " + this.amount);

                    //document.getElementsByClassName("counter").innerHTML=cart.qty;
                    //$(".counter").html(cart.qty)
                    //cart.amount = item.price + price;


                    ////let diff= cart.qty - item.qty; 
                    ////this.total+= cart.qty;
                    ////$(".counter").html(this.total);
                }
            } else {
                console.log("your browser is not supporting session Storage");
            }
            sessionStorage.setItem(sku, JSON.stringify(cart));
            this.getTotal(cart.qty);
        }
    }, {
        key: "getTotal",
        value: function getTotal(qty) {
            var cartTotal = qty;
            console.log("cart Total " + cartTotal);
            for (var i = 0; i < localStorage.length; i++) {
                var key = sessionStorage.getItem(sessionStorage.key(i));
                this.total = this.total + sessionStorage.getItem(sessionStorage.key(i).qty);
                console.log("total in cart" + this.total);
            }
        }
    }]);

    return _class;
}();

// function selectApi(id){
//     var selected = id;


//     if (selected == abcat0502000) {
//         console.log("Laptops");
//         console.log(selected.id);

//     }else if(selected == pcmcat209400050001){
//         console.log("Cell phones");
//         console.log(selected.id);

//     }else if(selected == abcat0101000){
//         console.log("Television");
//         console.log(selected.id);

//     }else{
//         console.log("Headphones");
//         console.log(selected.id);
//     }

// }


// function selectApi1(p,s){
//     var price = p;
//     var sku = s;
//     console.log(price);
//     console.log(sku);
// }
//export {selectApi,selectApi1};


exports.default = _class;

},{}]},{},[3]);
