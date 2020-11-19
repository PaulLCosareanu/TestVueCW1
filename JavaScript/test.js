arrayCourses = [];//array initialisation which will keep track of the localstorage

//data of all courses available
courses = [{ "id": 1, "subject": "Math", "location": "Leyton", "price": 100, "spaces": 5, "link": "./Images/math.png" }, //el 1
{ "id": 2, "subject": "English", "location": "Leytonstone", "price": 150, "spaces": 5, "link": "./Images/english.png" }, //el2
{ "id": 3, "subject": "Science", "location": "Harrow", "price": 200, "spaces": 5, "link": "./Images/math.png" },//el 3
{ "id": 4, "subject": "Music", "location": "Stratford", "price": 300, "spaces": 5, "link": "./Images/music.png" },// el 4
{ "id": 5, "subject": "Java Programming", "location": "BondStreet", "price": 50, "spaces": 5, "link": "./Images/webdev.png" },//el 5
{ "id": 6, "subject": "Web Dev", "location": "MileEnd", "price": 90, "spaces": 5, "link": "./Images/webdev.png" }, //el 6
{ "id": 7, "subject": "Project Management", "location": "Walthamstow", "price": 100, "spaces": 5, "link": "./Images/english.png" },//el 7
{ "id": 8, "subject": "Math", "location": "MileEnd", "price": 120, "spaces": 5, "link": "./Images/math.png" }, //el 8
{ "id": 9, "subject": "Math", "location": "Liverpool", "price": 110, "spaces": 5, "link": "./Images/math.png" }, //el 9
{ "id": 10, "subject": "Math", "location": "Manchester", "price": 105, "spaces": 5, "link": "./Images/math.png" }] //el 10

var title = new Vue({
  el: '#title',
  data: {
    title: "Coursework 1 Vue.js Paul-Lucian Cosareanu",
  }
});

var app = new Vue({
  el: '#app', //linking element
  data: { //data of the vue object
    websiteName: "Coursework 1 Vue.js Paul-Lucian Cosareanu",//website title and heading
    courses: courses, //courses found above saved within the vue object
    showCheckoutButton: false, //shows the button if true
    showProducts: true, //boolean value which decides if the products are displayed or not
    showCheckout: false, //boolean value which decides if the checkout is displayed or not
    showSubmitButton: false,
    category: "subject", //category used for sorting
    order: "asc", //order used for sorting
    checkoutItems: [], //the items which are going to be displayed
    quantityItems: [], //the quantity of the items
    name: "",
    number: "",
    isLet: false,
    isNum: false,
    showError: false,
    showSuccess: false,
    showAddButton:true,
  },
  methods: { //methods used
    addToCart(product) { //add to cart logic

      if (localStorage.getItem("product_id") !== null && localStorage.getItem("product_id") !== "" && localStorage.getItem("product_id") !== "undefined" && localStorage.getItem("product_id") != []) { //if localstorage is not empty

        arrayCourses = JSON.parse(localStorage.product_id); //the empty array is populated with the ids which are stored in localhost (the ids are the products which will go to checkout)
        this.quantityItems = JSON.parse(localStorage.quantity);

      }
      courses.forEach(Element => { //for each element from courses
        // console.log(JSON.parse(Element.id))
        if (Element.id == product && Element.spaces > 0) { //if the element id is equal with the product id parsed
          Element.spaces--; //number of available spaces decrease
          let found = false;
          console.log("1")
          if (arrayCourses.length != 0) {

            for (let i = 0; i < arrayCourses.length; i++) {
              console.log("2")
              if (product == arrayCourses[i]) {
                console.log("3")
                this.quantityItems[i]++;
                localStorage.setItem("product_id", ""); //localstorage is emptied to avoid same data being saved all over again
                localStorage.setItem("quantity", "");
                localStorage.product_id = JSON.stringify(arrayCourses); //the localstorage takes the value of the arrray
                localStorage.quantity = JSON.stringify(this.quantityItems)
                found = true;
              }
            }
            if (found == false) {
              arrayCourses.push(product); //array of elements going to checkout is populated with the id of the product parsed
              this.quantityItems.push(1);
              localStorage.setItem("product_id", ""); //localstorage is emptied to avoid same data being saved all over again
              localStorage.setItem("quantity", "");
              localStorage.product_id = JSON.stringify(arrayCourses); //the localstorage takes the value of the arrray
              localStorage.quantity = JSON.stringify(this.quantityItems)
            }

          } else {
            arrayCourses.push(product); //array of elements going to checkout is populated with the id of the product parsed
            this.quantityItems.push(1);
            localStorage.setItem("product_id", ""); //localstorage is emptied to avoid same data being saved all over again
            localStorage.setItem("quantity", "");
            localStorage.product_id = JSON.stringify(arrayCourses); //the localstorage takes the value of the arrray
            localStorage.quantity = JSON.stringify(this.quantityItems)
          }


        }
      })

    },
    onChangeCategory(event) { //every time an event is sent, the sort is caled
      this.sortBy();
    },
    onChangeOrder(event) {
      this.sortBy();
    },
    sortBy() {

      if (order.value == "asc") { //ascendent sort
        this.courses.sort((a, b) => a[category.value] < b[category.value] ? -1 : 1)
      } else if (order.value == "desc") { //descending sort
        this.courses.sort((a, b) => a[category.value] > b[category.value] ? -1 : 1)
      }
    },

    checkCheckoutButton() {
      if (localStorage.getItem("product_id") !== null && localStorage.getItem("product_id") !== "" && localStorage.getItem("product_id") !== "undefined") {
        arrayCourses = JSON.parse(localStorage.product_id)
      }
      if (arrayCourses != [""] && arrayCourses != "" && arrayCourses != undefined && arrayCourses != null) { //if localstorage is not null
        this.showCheckoutButton = true; //toggle button to true
      } else {//else
        this.showCheckoutButton = false;//set it to false

      }
    
    },
    displayCheckout() {
      this.showProducts = false;
      this.showCheckout = true;
      this.checkoutItems = JSON.parse(localStorage.product_id)
      this.showSuccess = false;

    },
    displayProducts() {
      this.showProducts = true;
      this.showCheckout = false;
      this.checkCheckoutButton();
    },
    deleteItem(prod) {

      arrayCourses == JSON.parse(localStorage.product_id);
      this.quantityItems = JSON.parse(localStorage.quantity);

      for (let i = 0; i < arrayCourses.length; i++) {

        if (prod == arrayCourses[i] && this.quantityItems[i] != 0) {

          this.quantityItems[i]--;
          for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].id == prod) {
              this.courses[i].spaces++;
            }
          }
          localStorage.quantity = JSON.stringify(this.quantityItems);
          if (this.quantityItems[i] == 0) {
            arrayCourses.splice(i, 1);

            Vue.delete(this.checkoutItems, i);
            Vue.delete(this.quantityItems, i);
            localStorage.quantity = JSON.stringify(this.quantityItems)
            localStorage.product_id = JSON.stringify(arrayCourses);
          }
        }
      }


    },
    checkout() {
      for (let i = 0; i < this.checkoutItems.length; i++) {
        if (localStorage.getItem("produts_bought") !== null && localStorage.getItem("produts_bought") !== "" && localStorage.getItem("produts_bought") !== "undefined") {
          let compareArrayProducts = JSON.parse(localStorage.produts_bought)
          let compareArrayQuantity = JSON.parse(localStorage.quantity_bought)
          let arrayPeople = JSON.parse(localStorage.clients)
          let arrayNumbers = JSON.parse(localStorage.phone)
          let found = false;
          for (let j = 0; j < compareArrayProducts.length; j++) {
            if (compareArrayProducts[j] == this.checkoutItems[i]) {
              compareArrayQuantity[j] = compareArrayQuantity[j] + this.quantityItems[i]
              console.log(compareArrayQuantity[j])
              found = true;
            }


          }
          if (found == false) {
            compareArrayProducts.push(this.checkoutItems[i])
            compareArrayQuantity.push(this.quantityItems[i])

          }
          localStorage.produts_bought = JSON.stringify(compareArrayProducts);
          localStorage.quantity_bought = JSON.stringify(compareArrayQuantity);
          arrayPeople.push(this.name)
          arrayNumbers.push(this.number)
          localStorage.clients = JSON.stringify(arrayPeople)
          localStorage.phone = JSON.stringify(arrayNumbers)
        } else {
          localStorage.produts_bought = JSON.stringify(this.checkoutItems);
          localStorage.quantity_bought = JSON.stringify(this.quantityItems);
          let arrayPeople = []
          arrayPeople.push(this.name)
          let arrayNumbers = []
          arrayNumbers.push(this.number)
          localStorage.clients = JSON.stringify(arrayPeople)
          localStorage.phone = JSON.stringify(arrayNumbers)
        }
      }
      localStorage.setItem("product_id", "")
      localStorage.setItem("quantity", "")

      for (let i = this.checkoutItems.length - 1; i >= 0; i--) {
        Vue.delete(this.checkoutItems, i);
        Vue.delete(this.quantityItems, i);

      }
      arrayCourses = [];
      this.showSuccess = true;


    },
    checkForm() {
      if (this.isLet && this.isNum && this.number != "" && this.name != "") {
        this.showSubmitButton = true;
        console.log(this.number)
        this.showError = false;
      } else {
        this.showSubmitButton = false;
        this.showError = true;
      }
    },
    isLetter() {

      let nm = this.name
      console.log("step 1")
      if (/^[A-Za-z]+$/.test(nm)) {
        this.isLet = true
        console.log("step 2")
        // this.showError=false;
      } else {
        this.isLet = false;
        // this.showError=true;
      }

    },
    isNumber() {

      let num = this.number
      console.log("here 1")
      if (/^\d+$/.test(num)) {
        this.isNum = true
        console.log("here 2")
        this.showError = false;
      } else {
        this.isNum = false;
        this.showError = true;
      }

    }
  },

  mounted() { //mounted is a function which starts after the page has been created (loaded)
//sort
    if (order.value == "asc") {
      this.courses.sort((a, b) => a[category.value] < b[category.value] ? -1 : 1)
    } else if (order == "desc") {
      this.courses.sort((a, b) => a[category.value] > b[category.value] ? -1 : 1)
    }

    //this ensures that the correct number of elements are displayed on the homepage
    if (localStorage.getItem("product_id") !== null && localStorage.getItem("product_id") !== "" && localStorage.getItem("product_id") !== "undefined") { //if the localstorage is not empty
      arrayCourses = JSON.parse(localStorage.product_id); //the array takes the value of the existing product ids within the local storage
      this.quantityItems = JSON.parse(localStorage.quantity);

      for (let i = 0; i < arrayCourses.length; i++) {


        for (let j = 0; j < courses.length; j++) {
          if (arrayCourses[i] == courses[j].id) { //if the id from checkout matches with the id from the array
            courses[j].spaces = courses[j].spaces - this.quantityItems[i]; //spaces go down 

          }

        }

      }

  
      if (localStorage.getItem("product_id") !== null) { //if localstorage is not null
        this.showCheckoutButton = true; //toggle button to true
      } else {
        this.showCheckoutButton = false;
      }
    }//


    if (localStorage.getItem("produts_bought") !== null && localStorage.getItem("produts_bought") !== "" && localStorage.getItem("produts_bought") !== "undefined") {
      let arrayCoursesBought = JSON.parse(localStorage.produts_bought)
      let arrayQuantityBought = JSON.parse(localStorage.quantity_bought)

      for (let i = 0; i < arrayCoursesBought.length; i++) {

        for (let j = 0; j < courses.length; j++) {
          if (arrayCoursesBought[i] == courses[j].id) {

            courses[j].spaces = courses[j].spaces - arrayQuantityBought[i]
            
          }
        }
      }
    }

  }


})
