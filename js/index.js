


$(document).ready(function () {
  $(".side-navbar .toggle-icon").click(function () {
      $(".side-navbar .toggle-icon i").toggleClass("fa-times")
      $(".side-navbar").toggleClass("nav-view")
      $('.side-navbar .nav-content ul li').slideToggle(1000),
      $(".nav-content .item1").animate({
              opacity: "1",
              paddingTop: "30px"
          }, 500)
            $(".nav-content .item2").animate({
              opacity: "1",
              paddingTop: "30px"
          }, 500)
            $(".nav-content .item3").animate({
              opacity: "1",
              paddingTop: "30px"
          }, 500)
            $(".nav-content .item4").animate({
              opacity: "1",
              paddingTop: "30px"
          }, 500)
            $(".nav-content .item5").animate({
              opacity: "1",
              paddingTop: "30px"
          }, 500)
  })
})

/////////////////////////////////////////////////////// start search



let searchInput = document.getElementById('search');
searchInput.addEventListener("click", function () {
    
  document.getElementById("display2").innerHTML = `
    <div class="col-6 mt-5">
        <input id="searchInput" type="text" class="form-control border-0 border-bottom border" placeholder="Search By Name">

    </div>
    <div class="col-6 mt-5 ">
        <input id="searchByLetter" type="text" class="form-control border-0 border-bottom border" placeholder="Search By First Letter">

    </div>
    
    `;
    async function searchByWord(y) {
  let searchWord = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${y}`
  );
    searchWord = await searchWord.json();
    arr=[...searchWord.meals]
    displaysupermeal();
}
    $("#searchInput, #searchByLetter").keyup((e) => {

    searchByWord(e.target.value)
})

});



/////////////////////////////////////////////////////////////////////////// start display


let arr = [];
async function getsupermeal() {
  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=seafood`
  );

  let finalResult = await request.json();
  arr = [...finalResult.meals];
  console.log(arr);
  displaysupermeal();
}
getsupermeal();

function displaysupermeal() {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    
    <div class="col-md-6 col-lg-3 my-3">
                    <div class="mymovie overflow-hidden rounded position-relative">
                        <img class="img rounded" src="${arr[i].strMealThumb}" alt="">
                        <div class="layer d-flex flex-wrap align-items-center" onclick ="getMeal('${arr[i].idMeal}')">
                            <div class="layer-info">
                                <h2>${arr[i].strMeal.split(" ").slice(0,3).join(" ")}</h2>
                               
                            </div>
                        </div>

                    </div>
                </div>`;
  }
  document.getElementById("display").innerHTML = cartona;
}

async function getMeal(mealID) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  meal = await meal.json();
  displayMeal(meal.meals[0]);
}

function displayMeal(meal) {
  let cartona = "";
  for (let i = 1; i <= 20; i++) {
    cartona += `<li class="my-1 myliststyle mx-1  rounded">${meal[`strMeasure${i}`]} ${
      meal[`strIngredient${i}`]
    }</li>`;
  }
  let displaymeal = `
                    <div class="col-md-4 text-white">
					<img class="w-100" src="${meal.strMealThumb}">
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 text-white mytextstyle ">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p class="fs-5 fw-bolder"> Area:${meal.strArea}</p>
					<p class="fs-5 fw-bolder">Category : ${meal.strCategory}</p>
          <div class="text-style">

					<h3>Recipes:</h3>
					<ul class="text-white reciepestyle d-flex flex-wrap" id="recipes">
          
					</ul>
					<h3 class="mx-1 my-3 text-white">Tags:</h3>
					<ul class="text-white d-flex  my-2 text-dark">
                     <li class=" mx-1 myliststyle my-3 tagstyle  p-1 rounded">${meal.strTags}</li>
                    </ul>
					<a class="btn Source text-white mx-2 p-2" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn  youtube text-white mx-2 p-2" target="_blank" href="${meal.strYoutube}">Youtub</a>
          </div>

                    </div>`;

  document.getElementById("display").innerHTML = displaymeal;
  document.getElementById("recipes").innerHTML = cartona;
}

/////////////////////////////////////////////////////////////// end


let send =document.getElementById('Categories');
send.addEventListener('click',function () {
  getCategories();
})


async function getCategories() {
  x = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  x = await x.json()
  arr=[...x.categories]
  console.log(arr)
displayCategories();

}


arr= [];
function displayCategories() {
  let cartonaa = ""
  for (var i = 0; i < arr.length; i++){
    cartonaa += `
    <div class="col-md-6 col-lg-3 my-3">
    <div class="mymovie overflow-hidden rounded position-relative">
        <img class="img-fluid rounded" src="${arr[i].strCategoryThumb}" alt="">
        <div class="layer align-items-center">
            <div class="layer-info" onclick="filterByCategory('${arr[i].strCategory}')">
                <h2>${arr[i].strCategory}</h2>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>

    </div>
</div>`
  }
  document.getElementById('display').innerHTML=cartonaa;

}


async function filterByCategory(category) {
  let filterCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  filterCategory = await filterCategory.json();
  arr = [...filterCategory.meals];
  displaysupermeal();
}
//////////////////////////////////////////////// start area

let area = document.getElementById('area');
area.addEventListener('click',function () {
    getArea();
})

async function getArea() {
  area = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  area = await area.json();
  arr = [...area.meals]
  displayArea();
}

function displayArea() {
  let cartonaa = ``;
    for (var i = 0; i < arr.length; i++) {
      
  
        cartonaa += `
    <div class="area col-md-4 my-3  shadow ">
        <div class="shadow rounded mx-1   text-center">
            <div onclick="filterByArea('${arr[i].strArea}')">
                <i class="fa-3x   fa-solid fa-city"></i>
                <h2 class="text-white">${arr[i].strArea}</h2>
            </div>
        </div>
    </div>`;
    }
    document.getElementById('display').innerHTML = cartonaa;
}

async function filterByArea(area) {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
    meals = await meals.json();
    arr = [...meals.meals.slice(0, 20)];
    displaysupermeal();
  
}
//////////////////////////////////////////// start ingredients

let ingredients = document.getElementById("ingredients");
ingredients.addEventListener('click',function () {
    getIngredient();
})

async function getIngredient() {
  ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  ingredients = await ingredients.json();
  arr = [...ingredients.meals];
  displayingredients();
}

function displayingredients() {
  let cartonaa = "";
    for (var i = 0; i < 20; i++) {
        cartonaa += `
    <div class=" ingredients text-center col-md-6 col-lg-3 my-3">
        <div onclick="filterbyingredients('${arr[i].strIngredient}')" class="shadow rounded">
            <div class=" ">
                <i class=" fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${arr[i].strIngredient}</h2>
                <p class="text-white">${arr[i].strDescription.split(" ").splice(0, 30).join(" ")}</p>
            </div>
        </div>
    </div>`;
    }
    document.getElementById('display').innerHTML = cartonaa;
}

async function filterbyingredients(mealName) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`
  );
    meal = await meal.json();
    arr=[...meal.meals]
    displaysupermeal();
}

////////////////////////////////////////////// start contact

let contactinput = document.getElementById('contact');
contactinput.addEventListener("click", function () {
    
  document.getElementById("display").innerHTML = `<div class="p-2">
  <h2 class="text-light mb-5">Contact Us...</h2>
  <div class="row ">
      <div class="col-md-6">
          <input placeholder="enter your name" id="inputname" class="form-control" >

      </div>
      <div class="col-md-6">
          <input placeholder="enter Email" id="inputname" class="form-control" >

      </div>
      <div class="col-md-6">
          <input placeholder="enter phone" id="inputname" class="form-control" >

      </div>
      <div class="col-md-6">
          <input placeholder="enter age" id="inputname" class="form-control" >

      </div>
      <div class="col-md-6">
          <input type="password" placeholder="enter password" id="inputname" class="form-control" >

      </div>
      <div class="col-md-6">
          <input type="password" placeholder="enter Repassword" id="inputname" class="form-control" >

      </div>

  </div>

  <button type="submit" disabled="" id="submitBtn" class="btn mt-4 btn-outline-danger">Submit</button>

</div>
  `



})