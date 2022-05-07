let currentBoxIndex = 1

const addNewBox = (boxIndex) => {
    const  currentBox = document.getElementsByClassName('box')[boxIndex]

    const currentBoxPositionInfo = currentBox.getBoundingClientRect()

    let boxDiv = document.createElement("div");
    boxDiv.classList.add('box')
    currentBoxIndex++
    boxDiv.appendChild(document.createTextNode(currentBoxIndex))

    document.getElementsByClassName('box-container')[0].appendChild(boxDiv);

    boxDiv.style.position = "absolute";
    boxDiv.style.left = currentBoxPositionInfo.x + currentBoxPositionInfo.width + 'px';
    boxDiv.style.top = currentBoxPositionInfo.y + currentBoxPositionInfo.width +'px';
}

const deleteBox = (boxIndex) => {
    if (document.getElementsByClassName('box').length > 1) {
        const currentBox = document.getElementsByClassName('box')[boxIndex]
        currentBox.remove()
    }
}

const changeBoxSize = (boxIndex) => {
    let currentBox = document.getElementsByClassName('box')[boxIndex]

    if (currentBox.classList.contains('box-large')) {
        document.getElementsByClassName('box')[boxIndex].classList.remove('box-large')
    } else {
        document.getElementsByClassName('box')[boxIndex].classList.add('box-large')
    }
}

const changeBoxColor = (boxIndex) => {
    const colorsArray = ['yellow', 'blue', 'pink', 'green', 'orange', 'purple', 'cyan', 'olive']
    const randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)]
    
    let currentBox = document.getElementsByClassName('box')[boxIndex]
    currentBox.style.backgroundColor = randomColor
}

// Function below was taken there: https://www.w3schools.com/howto/howto_js_draggable.asp
const dragElement = (element) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    const  dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    
    const elementDrag = (e) => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    const closeDragElement = () => {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    element.onmousedown = dragMouseDown;
}

const doubleClickEvent = (event, boxIndex) => {
    if (event.altKey) {
        deleteBox(boxIndex)
    } else {
        addNewBox(boxIndex);
    }
}

const clickEvent = (event, boxIndex) => {
    if (event.shiftKey) {
        changeBoxSize(boxIndex)
    }
}

const boxEvent = () => {
    const boxElements = document.getElementsByClassName("box");
    const lastBoxElement = boxElements[boxElements.length - 1]
    const length = boxElements.length - 1

    dragElement(lastBoxElement)
    lastBoxElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        changeBoxColor(length);
    })
    lastBoxElement.addEventListener('dblclick', (e) => {
        doubleClickEvent(e, length); 
    });
    lastBoxElement.addEventListener('click', (e) => {
        clickEvent(e, length);
    });
}

const boxContainer = document.getElementsByClassName("box-container")[0];
boxContainer.addEventListener('dblclick', (e) => {
    boxEvent();
})

boxEvent();
