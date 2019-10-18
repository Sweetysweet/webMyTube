export default function addIsInViewPort() {
	$.fn.isInViewport = function () {
		const $this = $(this);
		const $window = $(window);
		return ($this.offset().top + $this.outerHeight()) > $window.scrollTop() && $this.offset().top < ($window.scrollTop() + $window.height());
	};
}
