class LogTimer {
	constructor(text, opts) {
		const defaults = {
			partial : false,
			format : '[timer][%sms] ',
			start_format : '[timer] ',
			end_format : '[timer][%sms] ',
			tick_format : ' [tick][%sms]  '
		}
		this.opts = opts || defaults;
		this.opts.partial = this.opts.partial || defaults.partial;
		this.opts.format = this.opts.format || defaults.format;
		this.opts.start_format = this.opts.start_format || defaults.start_format;
		this.opts.end_format = this.opts.end_format || defaults.end_format;
		this.opts.tick_format = this.opts.tick_format || defaults.tick_format;
		this.text = text || 'unnamed timer';
		this.start = new Date().getTime();
		if (this.opts.partial)
			this.log(this.opts.start_format, text);
		this.ticks = [];
	}
	log(...args) {
		console.log(...args);
	}
	tick(text) {
		this.ticks.push({
			text : (text || 'unnamed tick'),
			start : new Date().getTime()
		});
		const index = this.ticks.length - 1;
		return function (text) {
			this.ticks[index].text = text || this.ticks[index].text;
			this.ticks[index].end = new Date().getTime();
			const ms = this.ticks[index].end - this.ticks[index].start;
			if (this.opts.partial)
				this.log(this.opts.tick_format, ms, this.ticks[index].text);
			return ms;
		}.bind(this);
	}
	ms() {
		return new Date().getTime() - this.start;
	}
	sec() {
		return parseInt((new Date().getTime() - this.start) / 1000);
	}
	end(text) {
		const end = new Date().getTime();
		if (this.opts.partial) {
			this.log(this.opts.end_format, end - this.start, (text || this.text));
			return end - this.start;
		}
		if (!this.ticks.length) {
			this.log(this.opts.format, end - this.start, (text || this.text));
		} else if (this.ticks.length) {
			this.log(this.opts.start_format, (text || this.text));
			for (let t = 0; t < this.ticks.length; t++) {
				this.log(this.opts.tick_format, (this.ticks[t].end || end) - this.ticks[t].start, this.ticks[t].text);
			};
			this.log(this.opts.end_format, end - this.start, (text || this.text));
		}
		return end - this.start;
	}
};

module.exports = LogTimer;
