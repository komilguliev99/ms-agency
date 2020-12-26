export default class Testimonial {
	constructor ()
	{
		this.config = {
			container: '.testimonial',
			itemClass: '.testimonial__item',
			nextBtn: '.testimonial__arrow-next',
			prevBtn: '.testimonial__arrow-prev',
			controll: '.testimonial__controll',
			activeClass: 'active',
			active: 0
		};

		this.init();
	}

	// Инициализация начального состояния
	init ()
	{
		this.items = document.querySelectorAll(this.config.itemClass);
		this.controllBtn = document.querySelectorAll(this.config.controll);

		console.log(this.items);
		console.log(this.controllBtn);

		this.clear();
		this.items[this.config.active].classList.add(this.config.activeClass);
		this.controllBtn[this.config.active].classList.add(this.config.activeClass);
		this.itemsNum = this.items.length;

		this.setArrowListeners();
		this.setControllListener();
	}

	// Установка обработчиков событий на контрольных блоков
	setControllListener ()
	{
		let		it = 0;
		for (let el of this.controllBtn)
		{
			el.addEventListener('click', event => {
				let		it = 0;

				for (let controll of this.controllBtn)
				{
					if (controll == event.target)
						this.setActive(it);
					it++;
				}
			})
			it++;
		}
	}

	// Установка обработчиков событий на стрелках для контроля
	setArrowListeners ()
	{
		document.querySelector(this.config.nextBtn).addEventListener('click', () => {
			let next = this.config.active + 1;
			if (next >= this.itemsNum)
				next = 0;
			console.log(next);
			this.setActive(next);
		});

		document.querySelector(this.config.prevBtn).addEventListener('click', () => {
			let prev = this.config.active - 1;
			if (prev < 0)
				prev = this.itemsNum - 1;
			this.setActive(prev);
		});
	}

	// Установка активного элемента
	setActive (index)
	{
		let		curr = this.config.active;

		this.clear()
		this.controllBtn[curr].classList.remove(this.config.activeClass);
		this.items[index].classList.add(this.config.activeClass);
		this.controllBtn[index].classList.add(this.config.activeClass);	
		this.config.active = index;
	}

	// Делаем все элементы неактивными
	clear ()
	{
		let	it = 0;
		for (let el of this.items)
		{
			el.classList.remove(this.config.activeClass);
			el.classList.remove(this.config.disabledClass);
			this.controllBtn[it].classList.remove(this.config.activeClass);
		}

	}
}