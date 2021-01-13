import eventlet
import socketio
import pyautogui
import time
sio = socketio.Server(cors_allowed_origins = '*')
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'},
    '/slides':"./slides",
    '/assets':"./assets",
})

@sio.event
def connect(sid, environ):
	sio.emit('connect', {'data': 'Hey'})
	print('connect ', sid)

@sio.event
def move(sid,data):
    print('message ',data)
    x = data['x']
    z = data['z']
    #data  = int(data)
    pyautogui.move(x*-1, z*-1)
    

@sio.event
def next(sid,data):
    print('next slide',data)
    pyautogui.press('d')
    

@sio.event
def prev(sid,data):
    print('prev ',data)
    pyautogui.press('a')

@sio.event
def startDarkMode(sid,data):
    print('start ',data)
    time.sleep(2)
    pyautogui.press('y')

@sio.event
def stopDarkMode(sid,data):
    print('stop ',data)
    pyautogui.press('h')    

@sio.event
def presentImage(sid,data):
    print('start presenting image ',data)
    pyautogui.press('n')              

@sio.event
def stopImage(sid,data):
    print('stop presenting image ',data)
    pyautogui.press('m')

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('192.168.29.212', 5000)), app)
