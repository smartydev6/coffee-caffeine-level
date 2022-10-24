build:
	docker-compose -f docker-compose.dev.yml up --build -d

run:
	docker-compose -f docker-compose.dev.yml up
