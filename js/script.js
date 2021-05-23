
const countries = []
const list_elem = document.querySelector('.list')
const page_block = document.querySelector('.pagenumbers')


async function getData() {
  const dataFetch = fetch('https://api.coingecko.com/api/v3/exchange_rates')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })

  let result = await dataFetch
  function getArray(data) {
    for (const key in data) {
      countries.push(data[key]);
    }
  }
  getArray(result.rates)
  createCard(countries)
}
getData()


function ListenerBtn(){
  const page_elem = document.querySelectorAll('.pagenumbers li')
  const notesOnPage = 12;
  page_elem.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault()
      let pageNum = +event.target.innerText;
      let start = (pageNum - 1) * notesOnPage
      let end = start + notesOnPage
      let notes = countries.slice(start, end)
      newCards(notes)
    })
  })
}


function ListenerCard(arg){
  let target;
  countries.forEach((item)=>{
    if (item.unit == arg.innerText) {
      target = Object.assign({}, item)
    }
  })
  let popUpElem = document.querySelector('.pop-up__card');
  let targetName = document.querySelector('.target_name')
  let targetType = document.querySelector('.target_type')
  let targetValue = document.querySelector('.target_value')
  targetName.innerText = `Name: ${target.name}`
  targetType.innerText = `Type: ${target.type}`
  targetValue.innerText = `Value: ${target.value}`
  popUpElem.classList.add('show')

}

function removePop(){
  let popUpElem = document.querySelector('.pop-up__card');
  popUpElem.classList.toggle('show')
}


function newCards(bd){
  document.querySelector('.container').innerHTML = ''
  let card = ''
  bd.forEach((item) => {
      card += `
      <div class="list" id="list" onclick="ListenerCard(this)">
        ${item.unit}
      </div>
    `
  })
  document.querySelector('.container').innerHTML = card
}


function createCard(bd){
  let card = ''
  bd.forEach((item, index)=>{
    if (index < 12) {
      card += `
      <div class="list" id="list" onclick="ListenerCard(this)">
        ${item.unit}
      </div>
    `
    }

  })
  
  document.querySelector('.container').innerHTML = card
  creaatePagNums(bd.length / 12);

}


function creaatePagNums(countries){
  let elem = ''
  for (let i = 1; i <= Math.ceil(countries); i++) {
    elem += `
      <li class="page__num">${i}</li>
    `
  }
  page_block.innerHTML = elem
  ListenerBtn()
}






