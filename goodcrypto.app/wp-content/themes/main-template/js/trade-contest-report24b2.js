(function () {
	const currencyFormater = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});
	const currencyShortFormater = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 0,
		notation: 'compact',
		compactDisplay: 'short',
		style: 'currency',
		currency: 'USD'
	})

	const calcScaleFillWidth = ({ value, goals }) => {
		if (!goals.length) return 100;
		const sectorWidth = 100 / goals.length;
		const rightPointIdx = goals.findIndex(g => g > value);
		if (rightPointIdx === -1) return 100;
		const leftPointIdx = rightPointIdx - 1;
		const diff = goals[rightPointIdx] - goals[leftPointIdx];
		const remainder = value - goals[leftPointIdx];
		const remainderPercent = +((remainder / diff) * 100).toFixed(2);
		const result = leftPointIdx * sectorWidth + (sectorWidth / 100) * remainderPercent;
		return result;
	};

	const fetchReportData = (reportId, reportURI) => {
		const uri = reportURI || `https://md.goodcrypto.app/api/REPORT,${reportId}`
		return new Promise((resolve, reject) => {
			fetch(uri)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(e => reject(e));
		});
	};

	const getCurVolEl = vol => {
		const el = document.createElement('div');
		el.classList.add('trading-volume__result-val');
		el.textContent = currencyFormater.format(vol);
		return el;
	};

	const getProgressScaleEl = ({ value, goals }) => {
		const gls = [...new Set([0, ...goals])].sort((a, b) => a - b);
		const resEl = document.createElement('div');
		resEl.classList.add('trading-volume__result-pgs');
		const scaleEl = document.createElement('div');
		scaleEl.classList.add('trading-volume__result-pgs-val');
		const scaleFillEl = document.createElement('div');
		scaleFillEl.classList.add('trading-volume__result-pgs-val--fill');
		const scaleWidth = calcScaleFillWidth({ value, goals: gls });
		scaleFillEl.style.transform = `translateX(-${100 - scaleWidth}%)`;
		scaleEl.appendChild(scaleFillEl);
		const widthEl = 100 / gls.length;
		const scaleValEl = gls.reduce((res, el) => {
			const elNode = document.createElement('div');
			elNode.classList.add('trading-volume__result-goal');
			elNode.style.minWidth = `${widthEl}%`;
			elNode.style.width = `${widthEl}%`;
			elNode.style.paddingRight = `${widthEl / 2}%`;
			elNode.style.marginLeft = `-${widthEl / 2}%`;
			if (el !== 0) elNode.innerHTML = `·<br>${currencyShortFormater.format(el)}`;
			res.appendChild(elNode);
			return res;
		}, document.createElement('div'));
		scaleValEl.classList.add('trading-volume__result-goals');
		resEl.appendChild(scaleEl);
		resEl.appendChild(scaleValEl);
		return resEl;
	};

	const getTopTableEl = ({ top }) => {
		const table = document.createElement('table');
		const cols = ['place', 'volume', 'wallet'];
		const thead = cols.reduce((res, el) => {
			const th = document.createElement('th');
			th.textContent = el;
			res.appendChild(th);
			return res;
		}, document.createElement('thead'));

		const tbody = top.reduce((res, el, i) => {
			const tr = [i + 1, currencyFormater.format(el.total), el.user].reduce((r, e) => {
				const td = document.createElement('td');
				td.textContent = e;
				r.appendChild(td);
				return r;
			}, document.createElement('tr'));
			res.appendChild(tr);
			return res;
		}, document.createElement('tbody'));

		table.appendChild(thead);
		table.appendChild(tbody);
		return table;
	};

	const progressEl = document.getElementById('trade-contest-progress');
	if (!progressEl) return;
	const reportId = progressEl.dataset.reportId;
	const reportUri = progressEl.dataset.reportUri;
	if (!reportId && !reportUri) return;
	const topEl = document.getElementById('trade-contest-top');
	fetchReportData(reportId || null, reportUri)
		.then(({ total, goals, top }) => {
			total = +total;
			if (total < 0 || Number.isNaN(total)) total = 0;
			const curVolEl = getCurVolEl(total);
			progressEl.appendChild(curVolEl);
			const progressScaleEl = getProgressScaleEl({ value: total, goals });
			progressEl.appendChild(progressScaleEl);
			if (topEl) {
				const topTableEl = getTopTableEl({ top });
				topEl.appendChild(topTableEl);
			}
		})
		.catch(e => console.log(e));
})();
