from http.server import HTTPServer, BaseHTTPRequestHandler
from sys import argv

BIND_HOST = 'localhost'
PORT = 8016


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.write_response(b'')

    def do_POST(self):
        content_length = int(self.headers.get('content-length', 0))
        body = self.rfile.read(content_length)

        self.write_response(body)

    def write_response(self, content):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write("hello".encode('utf-8'))
        print(content.decode('utf-8'))


if len(argv) > 1:
    arg = argv[1].split(':')
    BIND_HOST = arg[0]
    PORT = int(arg[1])

print(f'Listening on http://{BIND_HOST}:{PORT}\n')

httpd = HTTPServer((BIND_HOST, PORT), SimpleHTTPRequestHandler)
httpd.serve_forever()

'''
const xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:8016`);
xhr.send();
'''
