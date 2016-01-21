#!/bin/bash
MOCHA=node_modules/.bin/mocha
ISTANBUL=node_modules/.bin/istanbul

TESTS=$(shell find test/ -name "*.js")

all: build-release

build-release:
	docker build -t lmyjo/evaluation-worker -f docker/Dockerfile .

clean:
	docker rmi -f lmyjo/evaluation-worker

coverage:
	# *******************************
	# Creación de directorio
	@test -d reports || mkdir reports
	# Creación de codigo coverage
	$(ISTANBUL) instrument --output app-cov app
	# Realización de pruebas
	NODE_ENV=test mocha test/models/*.js test/utils/*.js
	# Generación unicamente de archivo lcov con istanbul
	ISTANBUL_REPORTERS=lcovonly $(MOCHA) -R mocha-istanbul $(TESTS)
	# Mover el archivo lcov hacia la carpeta de reportes
	mv lcov.info reports/
	# Eliminar el codigo coverage	
	rm -rf app-cov
	# Generación de html
	genhtml reports/lcov.info --output-directory reports/

clean-reports:
	rm -rf reports

test:
	$(MOCHA) -R spec $(TESTS)
