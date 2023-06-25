from flask import Flask, render_template
import socket
import json

CONF_FILE = 'customization.conf'

app = Flask(__name__)

@app.route("/")
def main():
    with open(CONF_FILE, 'r') as conf_file:
        conf_dict = json.load(conf_file)
    return render_template('index.html', **conf_dict)

@app.route('/send_udp')
def send_udp():
    ip = "127.0.0.1"
    port = 50341
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, 0)
    send_data = "udp data";
    s.sendto(send_data.encode('utf-8'), (ip, port))
    print ("udp packet sent")
    return ("nothing")
  
@app.route('/send_udp_ipv6')
def send_udp_ipv6():
    ip = "::1"
    port = 50341
    s = socket.socket(socket.AF_INET6, socket.SOCK_DGRAM, 0)
    send_data = "udp data"
    s.sendto(send_data.encode('utf-8'), (ip, port))
    print ("ipv6 udp packet sent")
    return ("nothing")  

@app.route('/send_tcp_ipv6')
def send_tcp_ipv6():
    ip = "::1"
    port = 50341
    s = socket.socket(socket.AF_INET6, socket.SOCK_STREAM, 0)
    send_data = "I sent ipv6 tcp data"
    try:
        s.connect((ip, port))

        s.sendall(send_data.encode('utf-8'))

    finally:
        s.close()
    print ("ipv6 tcp packet sent")
    return ("nothing")  
