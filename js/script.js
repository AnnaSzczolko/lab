const body = document.querySelector('body')
const burgerBtn = document.querySelector('.nav__btn')
const IconBtn = document.querySelector('.nav__icon')
const navList = document.querySelector('.nav__list')
const navItems = document.querySelectorAll('.nav__item')

const footerSpan = document.querySelector('.footer__span')

const allBtn = document.querySelector('.section__btn--all')
const privateBtn = document.querySelector('.section__btn--private')
const officeBtn = document.querySelector('.section__btn--office')
const allProjectsBtns = document.querySelectorAll('.section__btn')
const projectsContainer = document.querySelector('.projects')
const allProjectsItem = document.querySelectorAll('.projects__item')

const pressSliderOne = document.querySelector('.press__slider--one')
const pressSliderTwo = document.querySelector('.press__slider--two')
const pressContainerOne = document.querySelector('.press__container--one')
const pressContainerTwo = document.querySelector('.press__container--two')

const labelName = document.querySelector('.form__label--name')
const labelSurname = document.querySelector('.form__label--surname')
const labelEmail = document.querySelector('.form__label--email')
const labelTextarea = document.querySelector('.form__label--textarea')

const inputName = document.querySelector('input#name')
const inputSurname = document.querySelector('input#surname')
const inputEmail = document.querySelector('input#e-mail')
const textarea = document.querySelector('.form__textarea')

const formBtn = document.querySelector('.form__btn')

const inputs = [inputName, inputSurname, inputEmail, textarea]
const labels = [labelName, labelSurname, labelEmail, labelTextarea]

const popup = document.querySelector('.pop-up')
const PopupBtn = document.querySelector('.form__btn--pop-up')

const setYear = () => {
	const now = new Date()
	const year = now.getFullYear()
	footerSpan.textContent = year
}

const duplicateSlider = () => {
	let copyPressOne = pressSliderOne.cloneNode(true)
	pressContainerOne.appendChild(copyPressOne)
	let copyPressTwo = pressSliderTwo.cloneNode(true)
	pressContainerTwo.appendChild(copyPressTwo)
}

const showMObileMenu = () => {

	
	
	
	const navVisibility = navList.getAttribute('data-visible')
	
	if (navVisibility === 'false') {
		navItems.forEach(navItem => {
			navItem.classList.remove('nav__item--active')
		})
		navList.setAttribute('data-visible', true)
		burgerBtn.setAttribute('aria-expended', true)
		burgerBtn.innerHTML = '<i class="fa-solid fa-xmark nav__icon"></i>'
		body.classList.add('fixed-body')
		showMobileLinks()
	} else {
		hideNav()
		body.classList.remove('fixed-body')
	}
}

const showMobileLinks = () => {
	navItems.forEach(navItem => {
		navItem.classList.toggle('nav__item--active')
	})
}

const hideNav = () => {
	showMobileLinks()
	body.classList.remove('fixed-body')
	navList.setAttribute('data-visible', false)
	burgerBtn.setAttribute('aria-expended', false)
	burgerBtn.innerHTML = '<i class="fa-solid fa-bars nav__icon"></i>'
}

const showProjects = e => {
	projectsContainer.textContent = ''

	allProjectsItem.forEach(item => {
		let choosenId = e.target.id
		let itemId = item.id
		if (choosenId === 'all') {
			projectsContainer.appendChild(item)
		} else if (choosenId === itemId) {
			projectsContainer.appendChild(item)
		}
	})
}

const checkForm = () => {
	labels.forEach(item => item.classList.remove('form__label--warning'))

	inputs.forEach((item, index) => {
		if (item.value === '') {
			labels[index].classList.add('form__label--warning')
			return
		}
	})
}

const checkEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		return
	} else {
		labelEmail.classList.add('form__label--warning')
		inputEmail.value = 'Podano niepoprawny email'
	}
}

const countErrors = () => {
	let error = 0

	labels.forEach(item => {
		if (item.classList.contains('form__label--warning')) {
			error++
		}
	})

	if (error == '0') {
		showPopup()
	}
}

const showPopup = () => {
	body.classList.add('fixed-body')
	body.classList.add('no-events')
	inputs.forEach(item => {
		item.value = ''
	})
	labels.forEach(item => item.classList.remove('form__label--warning'))
	popup.classList.add('pop-up--active')
}

const closePopup = () => {
	body.classList.remove('fixed-body')
	popup.classList.remove('pop-up--active')
}

setYear()
duplicateSlider()
burgerBtn.addEventListener('click', showMObileMenu)
navItems.forEach(item => item.addEventListener('click', hideNav))

allProjectsBtns.forEach(btn => btn.addEventListener('click', showProjects))
formBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm()
	checkEmail(inputEmail)
	countErrors()
})
PopupBtn.addEventListener('click', closePopup)
