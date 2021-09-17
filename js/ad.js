window.addEventListener('load', function(){

    function getWidth(){
        return document.body.offsetWidth;
    }

    let ul = this.document.querySelector('.ad .imgs');
    let lis = ul.querySelectorAll(' li');
    let newLi = lis[0].cloneNode(true);
    let lastLi = lis[lis.length - 1].cloneNode(true);
    ul.appendChild(newLi);
    ul.insertBefore(lastLi, lis[0]);
    ul.style.width = lis.length + 2 + '00%';
    let flag = true;
    let ulInistialPos = 0;

    ul.style.transform = 'translateX(-' + getWidth() + 'px)';

    for (let i = 0; i < ul.children.length; i++){
        ul.children[i].style.width = 100 / (ul.children.length) + "%";
    }

    let circles = this.document.querySelector('.circles');
    for (let i = 0; i < ul.children.length - 2; i++){
        let circle = this.document.createElement('li');
        circle.classList.add('circle');
        if (i == 0) {
            circle.classList.add('selected');
        }
        circles.appendChild(circle);
    }
    
    let i = 1;
    setInterval(function(){
        if (flag) {
            let w = getWidth();
            i++;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + (-i * w) + 'px)';
        }
    }, 3000);

    ul.addEventListener('transitionend', function(){
        if (flag) {
            if (i >= 3){
                i = 1;
                ul.style.transition = 'none';
                ul.style.transform = 'translateX(-' + getWidth() + 'px)';
            } else if (i <= 0) {
                i = 2;
                ul.style.transition = 'none';
                ul.style.transform = 'translateX(-' + (i * getWidth()) + 'px)';
            }
            document.querySelector('.ad .circles .selected').classList.remove('selected');
            circles.children[i-1].classList.add('selected');
        }
    })

    ul.addEventListener('touchstart', function(e){
        flag = false;
        ulInistialPos = e.touches[0].pageX;
    })

    ul.addEventListener('touchmove', function(e){
        let currentPos = e.touches[0].pageX;
        let moved = currentPos - ulInistialPos;
        ul.style.transition = 'none';
        ul.style.transform = 'translate(' + (moved - getWidth() * i) + 'px)';
        ul.style.transition = 'all .5s';
    })

    ul.addEventListener('touchend', function(e){
        let finalPos = e.changedTouches[0].pageX;
        if (finalPos < ulInistialPos) {
            i++;
        } else if (finalPos > ulInistialPos){
            i--;
        }
        ul.style.transform = 'translate(' + (-i * getWidth()) + 'px)';
        flag = true;
    })
})