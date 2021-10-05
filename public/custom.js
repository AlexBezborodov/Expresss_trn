document.querySelectorAll('.price').forEach( node => {
  node.textContent = new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  }).format(node.textContent);
})

const $card = document.querySelector('#card')

if($card) {
  $card.addEventListener('click', (e)=> {
    if (e.target.classList.contains('js-remove')) {
      const id = e.target.dataset.id

      fetch('/card/remove/'+ id, {
        method: 'delete'
      }).then( res => res.json())
        .then( card => {
          if (card.courses.length) {
            const html = card.courses.map( c => {
            return  `
            <div class="row table">
              <div class="col s4 m7 l8 ">{c.title}</div>
              <div class="col s3 m2 l2 text-align">
                {c.count}
              </div>
              <div class="col s5 m3 l2">
                <button class="btn btn small deep-orange accent-3 js-remove" data-id="{{id}}" >Del</button>
              </div>
            </div>`
            })
          }else {
            $card.innerHTML = '<p>Empty basket</p>'
          }
        })
    }
  })
}
