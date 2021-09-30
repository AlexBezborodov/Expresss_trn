document.querySelectorAll('.price').forEach( node => {
  node.textContent = new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  }).format(node.textContent);
})

