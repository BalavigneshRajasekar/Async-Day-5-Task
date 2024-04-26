// API URl of the Emoji
const apiUrl = "https://emojihub.yurace.pro/api/all";
//Spinner element to hide once we get the API data
let spinner = document.getElementsByClassName("spin");
let alertBlock = document.getElementsByClassName("alert");

//Promise Contain the Producer code
let promise = new Promise((resolve, reject) => {
  let data = fetch(apiUrl);
  data
    .then((response) => {
      return response.json();
    })
    //Once We get the Data It resolve it
    .then((value) => {
      resolve(value);
    })
    //If API call get any error It will handle
    .catch((error) => {
      reject(error);
    });
});

//Now We take care of the consumer code
promise
  //If its resolved call the fetchdata() function
  .then((value) => {
    //this will Hide the Alert block whenever we got the response
    alertBlock[0].classList.replace("d-block", "d-none");
    fetchData(value);
  })
  //If API call failed we got an alert
  .catch((error) => {
    //This point we got the error,so we hide the spinner
    spinner[0].classList.replace("d-block", "d-none");
    alertBlock[0].classList.replace("d-none", "d-block");
    alertBlock[0].innerHTML = "Something went wrong";
  });

//fetchData that takes in a data array as input which come from API
fetchData = (data) => {
  //This point we got the data,so we hide the spinner
  spinner[0].classList.replace("d-block", "d-none");

  //Capture parent to append the created child into it
  let parent = document.getElementsByClassName("parent");

  //Here I filter the data which are comes under the category smileys and people
  let filtered = data.filter((ele) => {
    return ele.category == "smileys and people";
  });

  // Here I Iterate the array and extract the value and add those value in newly created HTML
  filtered.forEach((element) => {
    let child = document.createElement("div");

    //Entire Card Elements
    child.innerHTML = `<div class="card rounded-2"  id="style">
           <h5 class="card-title text-center bg-dark text-light px-2 py-3 rounded-2 mx-1 mt-1">${element.name}</h5>
           <div class="card-body text-center" >
           <h6>Category : <span>${element.category}</span></h6>
           <h6>Group : <span>${element.group}</span></h6>
           <h1>${element.htmlCode}</h1>
           `;

    child.classList.add("col-lg-4", "col-sm-12", "mt-5", "mainclass");
    parent[0].appendChild(child);
  });
};
