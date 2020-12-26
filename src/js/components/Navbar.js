export default class Navbar 
{
	constructor ()
	{
		this.config = {
			container: '.navbar-nav',
			navbarClass: '.nav-item',
			activeClass: 'active',
			active: 0,
		}

		this.init();
	}

	// Инициализация начального состояния
	init ()
	{
		this.itemNodes = document.querySelectorAll(this.config.container + ' > ' + this.config.navbarClass);

		console.log(this.itemNodes);
		this.clearActive();
		this.itemNodes[this.config.active].classList.add(this.config.activeClass);

		let		it = 0;
		for (let item of this.itemNodes)
		{
			item.addEventListener('click', () => {
				this.clearActive();
				item.classList.add(this.config.activeClass);
				this.config.active = it;
			})
			it++
		}


	}

	// Сделаем все элементы навигации неактивными
	clearActive ()
	{
		for (let item of this.itemNodes)
		{
			item.classList.remove(this.config.activeClass);
		}
	}
}