all: build-release

build-release:
	docker build -t lmyjo/evaluation-worker -f docker/Dockerfile .

clean:
	docker rmi -f lmyjo/evaluation-worker
