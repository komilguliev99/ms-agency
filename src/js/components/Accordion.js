export default class Accordion {
	constructor ()
	{
		this.config = {
			container: '.accordion',
			element: '.accordion__item',
			elementIdClass: 'accordion__number',
			activeClass: 'active',
			active: 0
		};

		this.init();
	}

	// Инициализация начального состояния Аккордиона
	init ()
	{
		this.items = document.querySelectorAll(this.config.element);
		this.addElementIdsToDOM();
		this.setEventListeners();
	}

	// Добавляем нумерация каждому элементу аккордиону в дом дереве
	addElementIdsToDOM ()
	{			
		let it = 1;
		this.spans = [];
		for (let el of this.items)
		{
			let span = document.createElement('span');
			span.classList.add(this.config.elementIdClass);
			span.innerHTML = '' + it;
			this.spans.push(span);
			el.insertAdjacentElement('afterbegin', span);
			it++;
		}
	}

	// Сделаем все элементы неактивными
	clearActives ()
	{
		for (let el of this.items)
		{
			el.classList.remove(this.config.activeClass);
		}
	}

	// Добавляем все необходимые обработчики события
	setEventListeners ()
	{
		for (let el of this.items)
		{
			el.querySelector('h4').addEventListener('click', () => {
				if (!el.classList.contains(this.config.activeClass))
				{
					this.clearActives();
					el.classList.add(this.config.activeClass);
				}
			})
		}

		this.spans.forEach((el, i) => {
			el.addEventListener('click', () => {
				if (!this.items[i].classList.contains(this.config.activeClass))
				{
					this.clearActives();
					this.items[i].classList.add(this.config.activeClass);
				}
			})
		})
	}
}