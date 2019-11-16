//  <div class="card">
// <div class="user_img">
//   <img src="12.jpg" alt="">
// </div>
// <div class="user_detail">
//   <h3 class="user_name">Test Test</h3>
//   <p class="user_gender">Male</p>
//   <p class="user_age">42</p>
//   <p class="user_mail">test@test.com</p>
// </div>
// </div> 

const userForm = document.querySelector('#userForm');
let users = [];
let output;

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.loader').classList.add('loading');
  document.querySelector('.custom__wrapper').innerHTML = '';
  const count = document.querySelector('#count').value;
  let gender;

  let radios = document.querySelectorAll('.gender__wrap input');
  radios.forEach(radio => {
    if(radio.checked){
      gender = radio.value;
    }
  })
  
  fetch(`https://randomuser.me/api/?results=${count}&gender=${gender}`)
  .then(res => res.json())
  .then(data => {
    users = data.results;
    users.forEach(user => {
       
      setTimeout(() => {
        output = `
          <div class="card">
          <div class="user_img">
          <img src="${user.picture.medium}" alt="">
          </div>
          <div class="user_detail">
          <h3 class="user_name">${user.name.title}. ${user.name.first} ${user.name.last}</h3>
          <p class="user_gender">${user.gender}</p>
          <p class="user_age">${user.dob.age}</p>
          <p class="user_mail">${user.email}</p>
          </div>
          </div>
          `;
          document.querySelector('.loader').classList.remove('loading');
          document.querySelector('.custom__wrapper').innerHTML += output;
          document.querySelector('.bildirim span').innerText = count;
          document.querySelector('.bildirim').classList.add('show');
          setTimeout(() => {
            document.querySelector('.bildirim').classList.remove('show');
          }, 2000);
        }, 3000);
      })
    });

    
    document.querySelector('#count').value = '';                     
    
})