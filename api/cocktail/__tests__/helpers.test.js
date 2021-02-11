const {
	isValidDescription,
	isValidDifficulty,
	isValidGouts,
	isValidName,
	isValidPreparation,
	isValidVolume,
} = require('../helpers');

describe('Input - valids', () => {
	it('should description is valid', () => {
		const res = isValidDescription('Cette description est valide ∰∎≹');
		expect(res).toBe(true);
	});

	it('should description is not valid because too short', () => {
		const res = isValidDescription('Tro court');
		expect(res).toBe(false);
	});
	it('should description is not valid because too long', () => {
		const res = isValidDescription(`
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus erat id mauris maximus, ut elementum risus vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec nulla lectus. Etiam eu lectus ac neque commodo iaculis a in neque. Phasellus egestas sit amet turpis id malesuada. Aliquam eleifend augue in sapien mattis hendrerit. Ut viverra, ipsum in volutpat pharetra, urna elit accumsan eros, vitae hendrerit mauris lectus id ipsum. Curabitur sed rhoncus dolor. Nulla facilisi. Phasellus luctus tortor nec dui sodales, quis imperdiet nibh vestibulum. Curabitur consequat, ipsum eu ornare congue, turpis eros luctus leo, pretium varius orci eros nec nisl. Nulla facilisi. Curabitur ac felis sit amet dolor tristique mollis.
            Etiam iaculis bibendum varius. Nam et lorem eget magna viverra pellentesque. Aliquam vulputate leo risus, quis tincidunt justo faucibus ut. In aliquet dictum odio, sed eleifend justo blandit ultricies. Suspendisse fringilla augue eu nibh rhoncus feugiat. Vestibulum nibh libero, iaculis sed pharetra nec, fermentum ut lorem. Quisque eget mauris ut turpis convallis tincidunt ac et urna. Etiam sit amet metus et erat faucibus ultricies. Pellentesque nec faucibus turpis. Nullam sollicitudin pulvinar mi, eu condimentum est pellentesque et. Nulla facilisi. Etiam pharetra efficitur mi sed dictum. Phasellus eu erat finibus justo tristique tincidunt. Proin convallis dolor feugiat massa imperdiet iaculis. Nullam a venenatis elit.
            Etiam et sodales turpis. Suspendisse ut pretium enim. Nullam a mollis tellus, at malesuada nisl. Phasellus scelerisque erat vitae eleifend viverra. Proin rhoncus ante ipsum, vel vulputate eros consectetur imperdiet. Aliquam ut nibh ut enim tincidunt mattis consectetur quis libero. Vivamus rutrum orci ac diam tincidunt tincidunt a eu dui.
            In eget augue eget mi aliquam sagittis. Mauris mauris nunc, condimentum at eleifend in, accumsan nec magna. Duis eros arcu, malesuada vel lobortis et, tincidunt quis elit. Aenean vel neque id dui pretium posuere. Sed tincidunt auctor dolor. Duis vel volutpat nisi, sed suscipit lorem. Duis ex sapien, lacinia non vulputate vel, iaculis vitae augue. Aliquam bibendum velit ut ex commodo, vel tristique orci fermentum. Donec rutrum odio quis nisi porttitor, ut bibendum urna vulputate. Morbi sollicitudin lectus in leo malesuada, ac pulvinar nunc sodales. Donec sollicitudin congue orci.
            Morbi aliquet ac quam eu pharetra. Sed congue at sem at scelerisque. In tristique nunc at eros pretium, sed varius lorem vestibulum. Praesent et turpis dolor. Etiam sodales purus non facilisis vestibulum. Ut volutpat orci quis convallis pharetra. Integer suscipit turpis orci, quis vulputate nibh gravida sed.
            Etiam ac dolor at lacus mattis consequat ac ut ex. Nulla eu justo sit amet risus mattis imperdiet. Nulla finibus sem nec nisl porttitor ultricies. Sed tortor leo, cursus eget leo at, posuere suscipit felis. Phasellus ac venenatis felis. Sed vel malesuada sapien. Suspendisse tempus at odio sed tristique. Vestibulum libero sem, tempus sit amet sagittis luctus, dignissim et nisi. Nulla ac augue sed eros viverra porttitor id a velit. Fusce vestibulum mauris in libero porttitor, vel ullamcorper velit finibus. Quisque cursus purus id nisl imperdiet posuere. Sed pretium eleifend laoreet. Fusce commodo purus ante, ut hendrerit purus rhoncus.
        `);

		expect(res).toBe(false);
	});

	it('should description is not valid because bad character', () => {
		const res = isValidDescription(
			"Cette description n'est pas valide avec ceci '³↑' "
		);
		expect(res).toBe(false);
	});

	it('should difficulty is valid', () => {
		let res = isValidDifficulty('Très facile');
		expect(res).toBe(true);
		res = isValidDifficulty('Facile');
		expect(res).toBe(true);
		res = isValidDifficulty('Moyen');
		expect(res).toBe(true);
		res = isValidDifficulty('Difficile');
		expect(res).toBe(true);
	});

	it('should difficulty is not valid', () => {
		let res = isValidDifficulty('Bof');
		expect(res).toBe(false);
	});

	it('should preparation is valid', () => {
		let res = isValidPreparation('Directement dans le verre');
		expect(res).toBe(true);
	});

	it('should preparation is not valid', () => {
		let res = isValidPreparation('Directement dans le cul');
		expect(res).toBe(false);
	});

	it('should gouts is valid', () => {
		let res = isValidGouts([9, 3]);
		expect(res).toBe(true);
	});

	it('should gouts is not valid because is too short', () => {
		let res = isValidGouts([]);
		expect(res).toBe(false);
	});

	it('should gouts is not valid because is too long', () => {
		let res = isValidGouts([2, 3, 4, 54, 459, 45]);
		expect(res).toBe(false);
	});

	it('should gouts is not valid because one is not valid', () => {
		let res = isValidGouts([2, 3, 4, 54, 'test']);
		expect(res).toBe(false);
		res = isValidGouts([true, 3]);
		expect(res).toBe(false);
	});

	it('should gouts is not valid because is not an array', () => {
		let res = isValidGouts({ id: 3 });
		expect(res).toBe(false);
	});

	it('should name is valid', () => {
		let res = isValidName('Nom valide');
		expect(res).toBe(true);
	});

	it('should name is not valid because is too short', () => {
		let res = isValidName('N');
		expect(res).toBe(false);
	});

	it('should name is not valid because is too short', () => {
		let res = isValidName('Nom beaucoup beaucoup trop long');
		expect(res).toBe(false);
	});
	it('should name is not valid because is not valid', () => {
		let res = isValidName('Nom #pas valide#');
		expect(res).toBe(false);
	});

	it('should volume is valid', () => {
		let res = isValidVolume('3 cL');
		expect(res).toBe(true);
	});

	it('should volume is not valid because is too low', () => {
		let res = isValidVolume('0 cL');
		expect(res).toBe(false);
	});

	it('should volume is not valid because is too high', () => {
		let res = isValidVolume('10003 cL');
		expect(res).toBe(false);
	});

	it('should volume is not valid because there is no number', () => {
		let res = isValidVolume('test cL');
		expect(res).toBe(false);
	});

	it('should volume is not valid because there is no unit', () => {
		let res = isValidVolume('2');
		expect(res).toBe(false);
	});

	it('should volume is not valid because there is no valid unit', () => {
		let res = isValidVolume('2 cannes');
		expect(res).toBe(false);
	});
});
