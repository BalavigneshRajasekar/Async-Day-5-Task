const apiUrl = "https://emojihub.yurace.pro/api/all";
let promise = new Promise((resolve, reject) => {
  let data = fetch(apiUrl);
  data
    .then((response) => {
      return response.json();
    })
    .then((value) => {
      resolve(value);
    })
    .catch((error) => {
      reject(error);
    });
});

promise
  .then((value) => {
    fetchData(value);
  })
  .catch((error) => {
    console.log("all");
  });

fetchData = (data) => {
  let parent = document.getElementsByClassName("parent");

  let filterd = data.filter((ele) => {
    return ele.category == "smileys and people";
  });
  console.log(filterd);

  filterd.forEach((element) => {
    let child = document.createElement("div");
    let code = element.htmlCode;
    //Entire Card Elements
    child.innerHTML = `<div class="card " style="width: 18rem;" id="style">
           <h5 class="card-title text-center bg-dark text-light">${element.name}</h5>
           <div class="card-body text-center" >
           <h6>Category : <span>${element.category}</span></h6>
           <h6>Group : <span>${element.group}</span></h6>
           <h6>htmlCode : <span>${code}</span></h6
           `;

    child.classList.add("col-lg-4", "col-sm-12", "mt-5", "mainclass");
    parent[0].appendChild(child);
  });
};
