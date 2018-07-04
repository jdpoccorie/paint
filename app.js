((d) => {
  let canvas = d.getElementById("сanvasTemp"),
    canvasCopy = d.getElementById("сanvasCopy"), //lienzo principal
    ctx,
    ctxCopy,
    mouse = {}, // objeto para las coordenadas del mouse
    mousedown = false,
    started = false,
    curColor = "#cb3594",
    curSize = 15,
    curTool = "marker",
    x0 = 0,
    y0 = 0,
    iColor = d.getElementById('iColor'),
    iSize = d.getElementById('iSize')

  function init() {
    initCanvas()
    setUpListeners()
    info()
  }

  function info() {
    iColor.innerHTML = curColor
    iSize.innerHTML = curSize
    iColor.style.backgroundColor = `${curColor}`
    iColor.style.padding = `.5px`
  }

  function initCanvas() {
    ctx = canvas.getContext('2d')
    ctxCopy = canvasCopy.getContext("2d")
  }

  // Escuchador de eventos
  function setUpListeners() {
    d.querySelector("#clearCanvas").addEventListener('click', _clearCanvas)
    canvas.addEventListener('mouseup', _mouseup)
    canvas.addEventListener('mousedown', _mousedown)
    canvas.addEventListener('mousemove', _startTracking)
    canvas.addEventListener('mouseleave', _stopTracking)
    d.querySelector(".btn-colors").addEventListener('click', _setColor)
    d.querySelector(".btn-sizes").addEventListener('click', _setSize)
  }

  function _clearCanvas(e) {
    e.preventDefault()
    ctxCopy.closePath()
    ctxCopy.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  function _mousedown(e) {
    mousedown = true; // включит режим рисования
    x0 = _getCursorCoordinate(e).x;
    y0 = _getCursorCoordinate(e).y;
    console.log(x0);
  }

  function _mouseup() {
    mousedown = false;
    started = false;
    _imgUpdate();
  }

  function _getCursorCoordinate(e) {
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;

    return {
      x: mouseX,
      y: mouseY
    };
  }

  function _startTracking(e) {
    e.preventDefault();
    mouse.x = _getCursorCoordinate(e).x;
    mouse.y = _getCursorCoordinate(e).y;

    if (mousedown) {
      ctx.strokeStyle = curColor;
      ctx.lineWidth = curSize;
      _setTool(e, curTool);
    }
  }

  function _stopTracking() {
    _mouseup();
  }

  function _setTool(e, curTool) {
		switch (curTool) {
			case "marker":
				return (function() {
					if (!started) {
						ctx.beginPath();
						ctx.moveTo(mouse.x, mouse.y);
						started = true;
					} else {
						ctx.lineTo(mouse.x, mouse.y);
						ctx.stroke();
					}
				})();
		}
  }
  

  function _setColor(e) {
    e.preventDefault()
    
    
    // let analizandoColor = e.srcElement.attributes[3]
    let analizandoColor = e.srcElement.getAttribute('data-colors')
    console.log(analizandoColor)
    curColor = analizandoColor
    info()
	}

  function _imgUpdate() {
    ctxCopy.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function _setSize(e) {
    e.preventDefault()
    
    
    let analizandoSize = e.srcElement.getAttribute('data-size')
    console.log(analizandoSize)
    curSize = analizandoSize
    info()
  }

  init()

})(document);