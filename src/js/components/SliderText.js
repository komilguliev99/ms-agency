export default class SliderTest
{
	constructor (config = {})
	{
		const defaultConfig = {
			container: '.slider-text',
			nextBtn: '.slider-text__arrow-next',
			prevBtn: '.slider-text__arrow-prev',
			playBtn: '.slider-text__video-play',
			videoClass: '.slider-text__video-item',
			textClass: '.slider-text__item',
			selectors: '.slider-text__selectors',
			activeClass: 'active',
			active: 0
		};

		this.config = Object.assign({}, defaultConfig, config);

		console.log(this.config);
		this.init();
	}

	// Инициализация начального состояния
	init ()
	{
		this.itemsText = document.querySelectorAll(this.config.textClass);
		this.itemsVideo = document.querySelectorAll(this.config.videoClass);
		this.selectors = document.querySelectorAll(this.config.selectors + " > span");
		this.itemsCount = this.itemsText.length;
		
		this.setActive();

		this.setNextPrevListeners();
		this.setControls();
		this.setVideoListeners();	
	}

	// Установка обработчиков событий на контрольных стрелочек
	setNextPrevListeners ()
	{
		document.querySelector(this.config.nextBtn).addEventListener('click', () => {
			this.next();
		});
		document.querySelector(this.config.prevBtn).addEventListener('click', () => {
			this.prev();
		})
	}

	// Установка обработчиков событий на контрольных элементов в левой части текста слайдер
	setControls ()
	{
		document.querySelector(this.config.selectors).addEventListener('click', event => {
			let	i = 0;
			for (let el of this.selectors)
			{
				if (el == event.target)
				{
					this.clearActives();
					this.config.active = i;
					this.setActive();
				}
				i++;
			}
		});
	}

	// Установка обработчиков событии на видео
	setVideoListeners ()
	{
		document.querySelector(this.config.playBtn).addEventListener('click', event => {
			this.itemsVideo[this.config.active].querySelector('video').play();
			event.target.classList.add('d-none');
		})

		for (let item of this.itemsVideo)
		{
			item.querySelector('video').addEventListener('pause', () => {
				document.querySelector(this.config.playBtn).classList.remove('d-none');
			})

			item.querySelector('video').addEventListener('play', () => {
				document.querySelector(this.config.playBtn).classList.add('d-none');
			})
		}
	}

	// Установка активный элемент по индексу (this.config.active)
	setActive ()
	{
		this.itemsText[this.config.active].style.top = "50px";
		this.clearActives();
		console.log(this.config.active, this.itemsText[this.config.active]);
		this.itemsText[this.config.active].classList.add(this.config.activeClass);
		this.itemsVideo[this.config.active].classList.add(this.config.activeClass);
		this.selectors[this.config.active].classList.add(this.config.activeClass);
	}

	// Сделаем все элементы слайдера неактивными
	clearActives ()
	{
		window.console.log(this.itemsText, "LEMEN");
		for (let el of this.itemsText)
		{
			console.log(el.classList);
			el.classList.remove(this.config.activeClass);
		}
		
		for (let el of this.itemsVideo)
		{
			console.log(el, el.classList);
			el.classList.remove(this.config.activeClass);
		}

		for (let el of this.selectors)
		{
			el.classList.remove(this.config.activeClass);
		}
	}

	next ()
	{
		this.config.active++;
		if (this.config.active >= this.itemsCount)
			this.config.active = 0;
		this.setActive();
	}

	prev ()
	{
		this.config.active--;
		if (this.config.active < 0)
			this.config.active = this.itemsCount - 1;
		this.setActive();
	}
}