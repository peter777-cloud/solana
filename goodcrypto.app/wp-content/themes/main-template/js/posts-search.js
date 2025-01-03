(function () {
	const INPUT = document.querySelector('input.category__search-input')
	const CLEAR_BTN = document.querySelector('.category__search-clear')
	const TARGET_SELECTOR = '#more-posts'
	const INPUT_WRAP_SELECTOR = '.category__search'
	const LOADER_URI = '/wp-content/themes/main-template/images/spin.svg'
	const POSTS = []
	const STATE = { isPostLoading: false, isPostRendered: false, PAGE: 1, POSTS_PER_PAGE: 10 }
	let SOURCE = null
	let BACKUP_MARKUP = null
	const LANG = window.__LANG__ || 'en'
	const TEXT_CONTENT = {
		en: {
			noPostsFound: 'Sorry, but nothing matched your search terms. \r\nPlease try again with some different keywords.',
			loadMoreBtn: 'Load more'
		},
		ru: {
			noPostsFound: 'Ничего не найдено по вашему запросу. \r\nПопробуйте использовать другие ключевые слова.',
			loadMoreBtn: 'Загрузить еще'
		},
		uk: {
			noPostsFound: 'Нічого не знайдено на ваш запит. \r\nСпробуйте використати інші ключові слова.',
			loadMoreBtn: 'Завантажити ще'
		}
	}

	const debounce = (callback, wait) => {
		let timeoutId = null
		return (...args) => {
			window.clearTimeout(timeoutId)
			timeoutId = window.setTimeout(() => {
				callback.apply(null, args)
			}, wait)
		}
	}

	const getPosts = () => {
		const uri = window.__FRONT_POSTS_URI__
		if (!uri) return
		return new Promise(resolve => {
			fetch(uri)
				.then(r => r.json())
				.then(data => resolve(data))
				.catch(e => resolve([]))
		})
	}

	const preparePostNode = ({ post }) => {
		const node = SOURCE.cloneNode(true)
		const titleNode = node.querySelector('.entry-title')
		titleNode.href = post.guid
		titleNode.textContent = post.post_title
		const imageLink = node.querySelector('.entry-image')
		const image = imageLink.querySelector('img')
		imageLink.href = post.guid
		image.alt = post.post_title
		image.title = post.post_title
		image.src = post.img
		node.querySelector('.excerpt p').textContent = String(post.post_content).slice(0, 156) + '...'
		node.querySelector('.date').textContent = post.post_date
		return node
	}

	const createNoResultNode = () => {
		const node = document.createElement('h3')
		node.classList.add('category__no-result')
		node.innerText = TEXT_CONTENT[LANG].noPostsFound
		return node
	}

	const restoreBackupNode = () => {
		if (!BACKUP_MARKUP || !STATE.isPostRendered) return
		const target = document.querySelector(TARGET_SELECTOR)
		target.parentElement.replaceChild(BACKUP_MARKUP, target)
		STATE.isPostRendered = false
		setVisibleAnotherElements({ isVisible: true })
	}

	const setVisibleAnotherElements = ({ isVisible }) => {
		const pagination = document.querySelector('.navigation.pagination')
		pagination.style.display = isVisible ? 'flex' : 'none'
		const digest = document.querySelector('.digest-row')
		if (digest) digest.style.display = isVisible ? 'block' : 'none'
	}

	const filterPosts = ({ query }) => {
		const words = String(query).toLowerCase().split(' ')
		return POSTS.filter(post => {
			post.vl = 0
			const title = String(post.post_title).toLowerCase()
			const content = String(post.post_content).toLowerCase()
			words.forEach(word => {
				post.vl += (title.split(word).length - 1) * 100
				post.vl += content.split(word).length - 1
			})
			return post.vl > 0
		}).sort((a, b) => b.vl - a.vl)
	}

	const setInputWrapActiveClass = ({ isActive }) => {
		const inputWrap = document.querySelector(INPUT_WRAP_SELECTOR)
		inputWrap.classList.toggle('category__search--active', isActive)
	}

	const onInputFocus = () => {
		saveBackUpMarkup()
		if (STATE.isPostLoading || POSTS.length) return
		STATE.isPostLoading = true
		getPosts().then(posts => {
			POSTS.push(...posts)
			STATE.isPostLoading = false
			handleSearchQuery({ query: INPUT.value })
			setVisibleLoader({ isVisible: false })
		})
	}

	const initLoader = () => {
		const parent = document.querySelector(TARGET_SELECTOR)
		parent.style.background = 'url(' + LOADER_URI + ') -100% -100% no-repeat'
	}

	const setVisibleLoader = ({ isVisible }) => {
		const parent = document.querySelector(TARGET_SELECTOR)
		if (isVisible) {
			parent.style.backgroundPosition = 'center center'
			parent.style.minHeight = '50px'
		} else {
			parent.style.backgroundPosition = '-100% -100%'
			parent.style.minHeight = 'unset'
		}
	}

	const saveBackUpMarkup = () => {
		if (BACKUP_MARKUP) return
		BACKUP_MARKUP = document.querySelector(TARGET_SELECTOR).cloneNode(true)
		SOURCE = BACKUP_MARKUP.querySelectorAll('.col-sm-6')[1]
	}

	const onClearBtnClick = () => {
		STATE.PAGE = 1
		INPUT.value = ''
		restoreBackupNode()
		setInputWrapActiveClass({ isActive: false })
		INPUT.focus()
	}

	const getLoadMoreBtn = () => {
		const wrap = document.createElement('div')
		wrap.classList.add('category__load-more-wrap')
		const btn = document.createElement('button')
		btn.classList.add('btn', 'btn--load-more')
		btn.type = 'button'
		btn.textContent = TEXT_CONTENT[LANG].loadMoreBtn
		btn.addEventListener('click', onLoadMoreBtnClick)
		wrap.appendChild(btn)
		return wrap
	}

	const onLoadMoreBtnClick = e => {
		const filteredPosts = filterPosts({ query: INPUT.value })
		let postsAsNode
		const from = STATE.PAGE * STATE.POSTS_PER_PAGE
		const to = from + STATE.POSTS_PER_PAGE
		postsAsNode = filteredPosts.map(post => preparePostNode({ post })).splice(from, to)
		postsAsNode.forEach(node => e.target.parentElement.parentElement.insertBefore(node, e.target.parentElement))
		if (to >= filteredPosts.length) e.target.parentElement.remove()
		STATE.PAGE++
	}

	const onInputKeyUp = debounce(e => {
		const query = e.target.value
		handleSearchQuery({ query })
	}, 500)

	const handleSearchQuery = ({ query }) => {
		STATE.PAGE = 1
		if (query.length < 2) {
			if (!query.length) return restoreBackupNode()
			return setInputWrapActiveClass({ isActive: false })
		}
		const parent = document.querySelector(TARGET_SELECTOR)
		const isPostLoading = !POSTS.length && STATE.isPostLoading
		if (isPostLoading) setVisibleLoader({ isVisible: true })
		STATE.isPostRendered = true
		setInputWrapActiveClass({ isActive: true })
		setVisibleAnotherElements({ isVisible: false })
		const filteredPosts = filterPosts({ query })
		let postsAsNode
		if (filteredPosts.length) {
			postsAsNode = filteredPosts.map(post => preparePostNode({ post })).splice(0, STATE.POSTS_PER_PAGE)
		} else if (!isPostLoading) {
			postsAsNode = [createNoResultNode()]
		} else postsAsNode = []
		const parentClone = parent.cloneNode(false)
		parentClone.classList.remove('change-row')
		parentClone.innerHTML = ''
		postsAsNode.forEach(node => parentClone.appendChild(node))
		if (filteredPosts.length > STATE.POSTS_PER_PAGE) parentClone.appendChild(getLoadMoreBtn())
		parent.parentElement.replaceChild(parentClone, parent)
	}


	const init = () => {
		if (!INPUT) return
		INPUT.addEventListener('focus', onInputFocus)
		INPUT.addEventListener('keyup', onInputKeyUp)
		CLEAR_BTN.addEventListener('click', onClearBtnClick)
		initLoader()
	}

	init()
})()
