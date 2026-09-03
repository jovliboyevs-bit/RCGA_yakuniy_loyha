import os
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    print(f"Starting RCGA Digital Platform Server...")
    print(f"Access Website at: http://{host}:{port}")
    print(f"Access API Docs at: http://{host}:{port}/docs")
    uvicorn.run("backend.app.main:app", host=host, port=port, reload=(port == 8000))

