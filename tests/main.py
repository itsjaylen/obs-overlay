import os
import subprocess
import requests
import json

def generate_random_filename():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10)) + ".png"

def main():
    random_filename = generate_random_filename()
    subprocess.run(["convert", "-size", "800x600", "xc:gray", "+noise", "Random", random_filename])
    with open(random_filename, 'rb') as f:
        files = {'file': f}
        response = requests.post('http://0.0.0.0:9191/upload', files=files)
    if response.status_code == 200:
        os.remove(random_filename)
        files_response = requests.get('http://0.0.0.0:9191/files')
        files_json = json.loads(files_response.text)
        for file_info in files_json['files']:
            print(file_info)

if __name__ == "__main__":
    main()
