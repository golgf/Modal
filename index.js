let vegetables = [
    { id: 1, title: 'Баклажан', price: 20, img: 'https://avatars.mds.yandex.net/i?id=9cd65d6d48eaedfbb6dc3e75a3825a0988b0bca2-4825378-images-thumbs&n=13' },
    { id: 2, title: 'Помидор', price: 30, img: 'https://catherineasquithgallery.com/uploads/posts/2021-03/1614570828_5-p-pomidor-na-belom-fone-5.jpg' },
    { id: 3, title: 'Огурец', price: 40, img: 'https://avatars.mds.yandex.net/i?id=06be7a6014fd6056d886eca4e0d706b0fb937639-7284491-images-thumbs&n=13' }
]

const toHTML = vegetable => `
<div class="col">
<div class="card">
    <img class="card-img-top" style="height: 300px;"
        src="${vegetable.img}" alt="${vegetable.title}">
    <div class="card-body">
        <h5 class="card-title">${vegetable.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${vegetable.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${vegetable.id}">Удалить</a>
    </div>
</div>
</div>
`

function render() {
    const html = vegetables.map(toHTML).join('')
    document.querySelector('#vegetables').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }
        },
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const vegetable = vegetables.find(f => f.id === id)

    if (btnType === 'price') {

        priceModal.setContent(`
       <p>Цена на ${vegetable.title}: <strong>${vegetable.price}$</strong></p>
       `)

        priceModal.open()
    } else if (btnType === 'remove') {
        // confirmModal.setContent(`
        // <p>Вы удаляете овощ: <strong>${vegetable.title}</strong></p>
        // `)
        // confirmModal.open()
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете овощ:<strong>${vegetable.title}</strong></p>`
        })
            .then(() => {
                vegetables = vegetables.filter(f => f.id !== id)
                render()
            })
            .catch(() => {
                console.log('Cancel')
            })
    }

})