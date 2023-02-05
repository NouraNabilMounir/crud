var productNameInput = document.getElementById("name");
var productPriceInput = document.getElementById("price");
var productCategoryInput = document.getElementById("category");
var productDescriptionInput = document.getElementById("description");
var searchInput = document.getElementById("search");
var formButton = document.getElementById("form-button");
var con = document.getElementById("con");
// console.log(productNameInput.value);
var productList;
if(localStorage.getItem("theProducts") == null){
  productList = [];
}else {
  productList =JSON.parse(localStorage.getItem("theProducts"));
  displayProduct(productList);
}
function addProduct(){
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };
  productList.push(product);
  localStorage.setItem("theProducts",JSON.stringify(productList));
  displayProduct(productList);
  clearForm();
}
function displayProduct(anArray){
  var container = "";
  for(var i=0; i<anArray.length;i++){
    container+=`<tr>
      <td>${i+1}</td>
      <td id="name${i}">${anArray[i].name}</td>
      <td id="price${i}">${anArray[i].price}</td>
      <td id="category${i}">${anArray[i].category}</td>
      <td id="description${i}">${anArray[i].description}</td>
      <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
      <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`;
  }
  document.getElementById("table-body").innerHTML = container;
}
function clearForm(){
  productNameInput.value ="";
  productPriceInput.value ="";
  productCategoryInput.value ="";
  productDescriptionInput.value ="";
}
function deleteProduct(i){
  productList.splice(i,1);
  localStorage.setItem("theProducts",JSON.stringify(productList));
  displayProduct(productList);
}
function searchProduct(){
  var word = searchInput.value;
  var newProducts = [];
  for(var i = 0; i<productList.length; i++){
    if(productList[i].name.toLowerCase().includes(word.toLowerCase())){
      newProducts.push(productList[i]);
    }
  }
  // console.log(newProducts);
  displayProduct(newProducts);
}
function updateProduct(i) {
  formButton.style.display="none!important";
  productNameInput.value = document.getElementById(`name${i}`).innerHTML;
  console.log( productNameInput.value);
  productPriceInput.value = document.getElementById(`price${i}`).innerHTML;
  productCategoryInput.value = document.getElementById(`category${i}`).innerHTML;
  productDescriptionInput.value = document.getElementById(`description${i}`).innerHTML;
  productNameInput.addEventListener("blur",function(){
    document.getElementById(`name${i}`).innerHTML = productNameInput.value;
    con.innerHTML =`<button class="btn btn-success px-4" id="form-button" onclick="addProduct()">Insert</button>`;
  })
  productPriceInput.addEventListener("blur",function(){
    document.getElementById(`price${i}`).innerHTML = productPriceInput.value;
    con.innerHTML =`<button class="btn btn-success px-4" id="form-button" onclick="addProduct()">Insert</button>`;
  })
  productCategoryInput.addEventListener("blur",function(){
    document.getElementById(`category${i}`).innerHTML = productCategoryInput.value;
    con.innerHTML =`<button class="btn btn-success px-4" id="form-button" onclick="addProduct()">Insert</button>`;
  })
  productDescriptionInput.addEventListener("blur",function(){
    document.getElementById(`description${i}`).innerHTML = productDescriptionInput.value;
    con.innerHTML =`<button class="btn btn-success px-4" id="form-button" onclick="addProduct()">Insert</button>`;
    formButton.style.display="block";
  })
}
