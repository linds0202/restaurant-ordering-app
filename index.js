import { menuArray } from '/data.js'

const modal = document.getElementById('modal')
const customerName = document.getElementById('name')

let cartItems = []

document.addEventListener('click', function(e){
        
    if (e.target.dataset.id) {        
        handleAddClick(e.target.dataset.id)
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    } else if (e.target.id === 'submit-btn') {
        handleSubmitOrderClick()
    } else if (e.target.id === 'pay-btn') {
        handlePayClick()
    } else if (e.target.id === 'modal-close-btn') {
        handleCloseModal()
    }
})

function render() {
    const itemsEl = document.getElementById('items')

    let itemsHtml = ''
    
    menuArray.forEach(item => {
        itemsHtml += `
        <div class="item">
            <p class="emoji">${item.emoji}</p>
            <div class="item-desc">
                <h2 class="name">${item.name}</h2>
                <p class="desc">${createIngredients(item.ingredients)}</p>
                <p class="price">$${item.price}</p>
            </div>
            <div class="add-btn" data-id='${item.id}'>
                <p class="add" data-id='${item.id}'>+</p>
            </div>
        </div>
        `
    })
    
    itemsEl.innerHTML = itemsHtml
}


function createIngredients(item) {
    let ingredientsList = ''
    
    item.forEach(ing => ingredientsList += ing + ', ')
    
    return ingredientsList.slice(0, -2)
}

function handleAddClick(itemId) {
    cartItems.push(menuArray[itemId])

    document.getElementById('cart').classList.remove('hidden')
    
    renderCartItems()
}
    
function renderCartItems() {   
    let cartItemsList = ''
    
    cartItems.forEach((item, i) => {
        cartItemsList += `
            <div class='cart-item'>
                <p class='cartItem-name'>${item.name} <span id='remove' class'cartItem-remove' data-remove='${i}'>remove</span></p>
                <p class='cartItem-price'>$${item.price}</p>
            </div>
            
        `
    })
    
    document.getElementById('cart-items').innerHTML = cartItemsList
    document.getElementById('total-price').textContent = '$' + cartItems.reduce((s, n) => s += n.price, 0)
}

function handleRemoveClick(removeId) {
    cartItems.splice(removeId, 1)
    
    renderCartItems()
}

function handleSubmitOrderClick() {
    modal.style.display = 'inline'
}

function handlePayClick() {
    handleCloseModal()
    
    //reset & hide cart
    cartItems = []
    document.getElementById('cart').classList.add('hidden')
    
    //display message
    displayMsg(customerName.value)
}

function handleCloseModal() {
    modal.style.display = 'none'
}

function displayMsg(name) {
    document.querySelector('.complete-msg').classList.remove('hidden')
    document.getElementById('msg').textContent = `Thanks, ${name}! Your order is on it's way!`
}

render()