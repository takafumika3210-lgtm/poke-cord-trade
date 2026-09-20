import http.server
import socketserver
import os
import sys

PORTS = [5173, 5174, 5175, 8080, 8000]

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        if path.endswith('.css'):
            return 'text/css; charset=utf-8'
        if path.endswith('.html'):
            return 'text/html; charset=utf-8'
        return super().guess_type(path)

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    
    server_started = False
    for port in PORTS:
        try:
            httpd = socketserver.TCPServer(("", port), MyHTTPRequestHandler)
            print(f"Server successfully started at http://localhost:{port}")
            sys.stdout.flush()
            server_started = True
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                pass
            break
        except OSError:
            continue

    if not server_started:
        print("Could not start server on any default ports.")
