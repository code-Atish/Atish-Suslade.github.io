$(Window).scroll(function () {
    // 100 = The point you would like to fade the nav in.
    if ($(window).scrollTop() > 200) {
		$('.scroll-top-wrapper').addClass('visible');
	} else {
		$('.scroll-top-wrapper').removeClass('visible');
	}

    if ($(window).scrollTop() > 100) {

        $('.main-nav').addClass('show');

    } else {

        $('.main-nav').removeClass('show');

    };
});

$(document).ready(function(){

	"use strict";
	// here all ready functions
	mobileMenuToggle();
	navigateNavBar();
	scrollToTop();
	changeGradientPos();
	textHackEffect()
	onScrollAnimate();
	skillCardDelay();
	projImg3DEffect();
	sendMessage();
	console.clear();
});


function mobileMenuToggle(){
	
	"use strict";

	var hamburger 		= $('.ham-burger-container');
	var mobileMenu		= $('.dropdown');
	var mobileMenuList	= $('.dropdown .dropdown_inner ul li a');

	hamburger.on('click',function(){
		var element= $(this);

		if(element.hasClass('is-active')){
			element.removeClass('is-active');
			mobileMenu.slideUp();
		}else{
			element.addClass('is-active');
			mobileMenu.slideDown();
		}
		// return false;
	});
	
	mobileMenuList.on('click',function(){
		$('.ham-burger-container').removeClass('is-active');
		mobileMenu.slideUp();
		// return false;
	});
}


function scrollToTop(){
	$('.scroll-top-wrapper').on('click',()=>window.scrollTo({ 
		top: 0,
		behavior: 'smooth' 
	}))
}

function navigateNavBar(){
	$('.one-page-nav').onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 10,
		scrollThreshold: 0.2,
		filter: '',
		easing: 'swing',
	});
}

function changeGradientPos(){
	document.getElementById('skills-list').onmousemove = e => {
		for (const card of document.getElementsByClassName("skill-container")) {
			const rect = card.getBoundingClientRect(),
				x = e.clientX - rect.left,
				y = e.clientY - rect.top;

			card.style.setProperty("--mouse-x", `${x}px`);
			card.style.setProperty("--mouse-y", `${y}px`);
		};
	}
}


function projImg3DEffect(){
var projImg = document.querySelectorAll('.proj-img-col img');
for (const img of projImg) {
	if (img) {
		img.addEventListener("mousemove", (event) => {
			const rect = img.getBoundingClientRect();
			const { width, height, left, top } = rect;
			let x = (event.clientX - left) / width;
			let y = (event.clientY - top) / height;
			let tiltX = (1 * (7 - x * 7 * 2)).toFixed(2);
			let tiltY = (1 * (y * 7 * 2 - 7)).toFixed(2);
			img.style.transform = `perspective(200em) rotateX(${tiltY}deg) rotateY(${tiltX}deg) `;
		})
		img.addEventListener("mouseleave", (event) => {
			img.style.removeProperty("transform");
		});
	}
}
}

function textHackEffect() {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const originalText = ['STUDENT', 'DEVELOPER', 'PYTHON | C', 'FRONT-END']
	let count = 0

	const changeWords = setInterval(() => {
		let element = document.querySelector('.line-3')
		let iterations = 0;

		const interval = setInterval(() => {
			element.innerText = originalText[count].split("")
				.map((letter, index) => {
					if (index < iterations) {
						return originalText[count][index];
					} else {
						return letters[Math.floor(Math.random() * 26)];
					}
				}).join('');

			if (iterations >= element.innerText.length) clearInterval(interval);
			iterations += 1 / 3;
		}, 30);
		count = (count + 1) % originalText.length;

	}, 2500,)

}

function skillCardDelay(){
	document.querySelectorAll('.skill-container').forEach(skill=>{
		let denominator;
		var width=window.innerWidth;
		if(width>1100){
			denominator=3;
		} else if(width>784 && width<1100){
			denominator=2;
		} else{ 
			denominator=1;
		}
		var order=skill.style.getPropertyValue('--order') % denominator;
		skill.style.setProperty('--order',order);
	})
}


function onScrollAnimate(){
	const observer=new IntersectionObserver( (entries) =>{
		entries.forEach((entry) => {
			if(entry.isIntersecting)
			var AnimationClass=entry.target.dataset.animateClass;
			entry.target.classList.add(AnimationClass);
			entry.target.classList.remove(undefined);
		})
	})

	const hiddenElements =document.querySelectorAll('.hidden');
	hiddenElements.forEach( (element) =>{
		observer.observe(element);
	})
}

function sendMessage(){
		const scriptURL = 'https://script.google.com/macros/s/AKfycbxAW1xKQNTcS5L6qA4Zyj0y7YnPXQdy7QEKT75snrIDBcPJBMP9cK4mcx11HShwqIuf/exec'
        const form = document.forms['contact-form']

        form.addEventListener('submit', e => {
            e.preventDefault()
            var msgbox=$('.btn-wrapper');
            var btn=document.getElementsByClassName('submit-btn')[0];
            
            btn.disabled=true;
            btn.classList.add('height-0');
            msgbox.attr('data-content','Please Wait !!').css({'color':'white'})

            const onSuccess=()=>{
                    form.reset();
                    btn.disabled=false;
                    btn.classList.remove('height-0');
                    msgbox.attr('data-content','Message sent successfully!!').css({'color':'lime'});
                    setTimeout(()=>{
                        msgbox.attr('data-content','');
                    },4000);
                }
            const onFailure=()=>{
                    btn.disabled=false;
                    btn.classList.remove('height-0');
                    msgbox.attr('data-content','Failed to send message !!').css({'color':'red'});
                    setTimeout(()=>{
                        msgbox.attr('data-content','');
                    },4000);
            }
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => onSuccess())
                .catch(error => onFailure())
        })
}