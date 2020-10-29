/*
 * Copyright (c) 2010 René Brüntrup, Martin Lablans, Frank Ückert 
 * Licensed under the MIT X11 License (see LICENSE.txt).
 */

var tempIdResolverConstructor = function(spec, my) {
	var that = {};
	var my = my || {};
	var spec = spec || {};

	my.resolvers = my.resolvers || [];

	if (typeof(spec.useCache) === 'undefined')
		spec.useCache = true;
	if (spec.useCache) {
		// use HTML5 web storage if available
		if(typeof(Storage)!=="undefined") {
			my.cache = webStorageTempIdCacheConstructor({
				maxCacheAgeSecs: spec.maxCacheAgeSecs,
				maxCacheItems: spec.maxCacheItems
		});
		} else {
			my.cache = tempIdCacheConstructor({
				maxCacheAgeSecs: spec.maxCacheAgeSecs,
				maxCacheItems: spec.maxCacheItems
			});			
		}
	}

	spec.defaultResolveFunctionName = spec.defaultResolveFunctionName || 'resolveTempIds';
	if (spec.useDefaultResolver === 'mainzellisteResolver') 
	{
		spec.useDefaultResover = true;
		my.defaultResolver = mainzellisteResolverConstructor({
			mainzellisteURL: spec.mainzellisteURL});
	} else if (typeof(spec.useDefaultResolver) === 'undefined')
	{
		spec.useDefaultResolver = true;
		my.defaultResolver = defaultResolverConstructor({
			resolveFunctionName: spec.defaultResolveFunctionName});
	} 

	addSubjectResolver = function(subject, resolveFunction) {
		my.resolvers[subject] = resolveFunction;
	};

	defaultResolver = function(subject, tempId, callback) {
		$.get(spec.defaultResolveFunctionName, {subject: subject, tempId: tempId},
			function(data, textStatus, xhr) {
				if (callback) callback(data);
			}
		);
	};

	resolve = function() {
		my.defaultResolver.startInput(); // Initialisierung
		// Durchlaufe alle Elemente mit data-subject-Attribut
		$('*[data-subject]').each(function(index, element) {
			var subject = element.getAttribute('data-subject');
			var tempId= element.getAttribute('data-tempid');

			// Falls der Wert im Cache ist, schreibe ihn direkt in das Element
			var value = my.cache.getValue(subject, tempId);
			if (value !== null) {
				insertResolvedValue(element, value);
				return;
			}

			// Ansonsten: Resolver bestimmen
			var resolver = my.resolvers[subject];
			if (typeof(resolver) === 'undefined' && spec.useDefaultResolver)
				resolver = my.defaultResolver;
			/*
			 * Der Aufruf sorgt dafür, dass das subject-tempid-Paar an eine Liste
			 * zu "erledigender" Werte angehängt wird. Mit übergeben wird eine 
			 * Callback-Funktion, die den aufgelösten Wert in den Cache und 
			 * in  das HTML-Element schreibt.
			 */
			resolver.resolve(subject, tempId,
				{subject: subject, tempId: tempId, element: element},
				function(value, data) {
					if (my.cache)
						my.cache.setValue(data.subject, data.tempId, value);
					insertResolvedValue(data.element, value); 
				});
		});
		
		// Für data-formatted hier weiter
		$('*[data-formatted]').each(function(index, element) {
			
			// Formatstring parsen: Array subject->tempid (oder andersherum) erzeugen
			// Callback muss sich merken, was er braucht
			// Dazu Cache erforderlich. Interner Cache möglich? Evtl. so etwas wie Liste zum Abhaken
			
		});
		/* Mit folgendem Aufruf wird die Liste der aufzulösenden subject-tempid-Paare
		 * abgearbeitet, was den Aufruf der oben definierten Callback-Funktion
		 * beinhaltet.
		 */
		my.defaultResolver.endInput();
	};

	insertResolvedValue = function(element, value) {
		// Gegebenenfalls benutzerdefinierte Postprocessing-Funktion aufrufen
		var postProcess = element.getAttribute('data-postProcess');
		if (typeof window[postProcess] == 'function')
			value = window[postProcess](value);
		$(element).filter(':input').val(value); 
		$(element).filter(':not(:input)').html(value);
	}
	
	/**
	 * Invalididates cached subject.
	 */
	invalidate = function(subject, tempId) {
        my.cache.clearValue(subject, tempId);
    }


	// Building that.
	that.addSubjectResolver = addSubjectResolver;
	that.defaultResolver = defaultResolver;
	that.resolve = resolve;
	that.invalidate = invalidate;

	return that;
};
