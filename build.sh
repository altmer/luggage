docker build -f Dockerfile.build -t altmer/luggage_build:latest .

docker rm -f luggage_build_container
docker create --name luggage_build_container altmer/luggage_build:latest
docker cp luggage_build_container:/opt/app/_build/prod/rel/luggage/releases/0.0.1/luggage.tar.gz luggage.tar.gz
docker rm -f luggage_build_container

docker build -f Dockerfile.release -t altmer/luggage:latest .

docker push altmer/luggage
