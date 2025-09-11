# Introduction

This is a project to keep track of notes. Take notes for any occasion, store them in collections.

You can see some of the available endpoints in `urls.py`. 

Originally this was built with templates, you'll see that in `quicknotes_site` but this is likely outdated. 

You can also use `api.http` to see some of the API usage.

# Running the Project Locally

First, create a virtual environment

```
python3 -m venv .venv
. .venv/bin/activate
```

Next we will install dependencies:

```
pip install requirements.txt
```

Next up, environment variables. You can use `.env-example` as a starting point. You will duplicate this and name it `.env`. 

I launched a Postgres container for the database, but you can adjust as needed. If you change the database structure, you may need to update `settings.py`. 

# Docker Example

```
docker build -t quicknotes . && docker run -it --rm -p 8000:8000 quicknotes
```

Run with compose:
```
docker compose up
```

To force an image rebuild:
```
docker compose up --build
```

Connect to the container with:
```
docker exec -it quicknotes-webdev-1 bash
```