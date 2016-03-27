
.phony: build deploy promote

build:
	docker build -t registry.heroku.com/ft-polyfill-service-qa/web .

deploy: build
	docker push registry.heroku.com/ft-polyfill-service-qa/web

promote:
	docker pull registry.heroku.com/ft-polyfill-service-qa/web && docker tag registry.heroku.com/ft-polyfill-service-qa/web registry.heroku.com/ft-polyfill-service/web && docker push registry.heroku.com/ft-polyfill-service/web

ci: build
	docker run -it registry.heroku.com/ft-polyfill-service-qa/web grunt ci
