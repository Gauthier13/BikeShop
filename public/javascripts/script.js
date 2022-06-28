var radios = document.getElementsByName('modeLivraison');

for (var i = 0; i < radios.length; i++) {
	radios[i].addEventListener('change', function () {
		document.getElementById('formML').submit();
	});
}