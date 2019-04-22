
let responseHandler = () => {
    
}





window.onload = () => {
    const selectTags = document.querySelectorAll('select');
    if(selectTags.length > 0) {
        selectTags.forEach(tag => {
            tag.addEventListener('click', callback);
        });
    }
}

//tag.parentNode.style.id