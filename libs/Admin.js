console.log('wczytano plik Admin.js');

class Admin{
	constructor() {
		console.log('konstruktor klasy Admin');
		this.clicks()
	}

	clicks()
	{
		$( "#zal" ).on( "click", function() {
			user.setUser();
		  });
	}

}