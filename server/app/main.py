from fastapi import FastAPI

# Create an instance of the FastAPI class
app = FastAPI()

#  GET endpoint at the root URL "/"
@app.get("/")
def read_root():
    """
    Root endpoint that returns a welcome message.
    """
    return {"message": "Hello, FastAPI!"}

