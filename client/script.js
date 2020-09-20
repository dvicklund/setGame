$(function () {
  let socket = io()
  let gameSpace

  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  function renderCard(card, index) {
    console.log(card)
    ctx.fillStyle = card.color
    ctx.fillRect(Math.floor(51*(index+1) % 204)+5,(71*(Math.floor(index/4))),50,70)
  }

  $('form').submit(function(e) {
    e.preventDefault() // prevents page reloading

    socket.emit('chat message', $('#message').val())

    $('#message').val('')

    return false
  })

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg))

    $('#messages').stop().animate({ scrollTop: $('#messages')[0].scrollHeight}, 1000);
  })

  $('#newGameButton').on('click', function(e) {
    console.log('creating new game')
    socket.emit('createGame')
  })

  $('#joinGameButton').on('click', function(e) {
    console.log('joining existing game')
    socket.emit('joinGame')
  })

  $('#dealButton').on('click', function(e) {
    console.log('dealing')
    socket.emit('deal')
  })

  socket.on('newCards', function(cards) {
    cards.forEach((card, index) => {
      renderCard(card, index)
    })
  })

})
