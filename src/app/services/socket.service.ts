import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainService } from './main.service';
import * as socketio from 'socket.io-client';
import { API_Globals } from '../../global';
@Injectable({
  providedIn: 'root'
})
export class SocketService extends MainService {
  userId = null;
  url = null;
  socket;
  private messageReceivedBS: BehaviorSubject<string> = new BehaviorSubject("");
  castMessageReceived: Observable<string> = this.messageReceivedBS.asObservable();;
  constructor() {
    super();
    //this.castMessageReceived = this.messageReceivedBS.asObservable();
    this.userId = localStorage.getItem('userId');
    this.initializeSocket();
  }
  initializeSocket() {
    this.socket = socketio(API_Globals.socket_url);
    this.socket.on("connection", (socketId) => {
      this.socket.emit("save-me", {socketId, userId: this.userId});
      this.socket.emit("lb-ping", this.userId);
    });
    this.socket.on("lb-pong", (message)=>{
      console.log(message);
    });
    this.heartbeater();
    
    this.socket.on("message ", (message)=>{
      this.messageReceivedBS.next(message);
      console.log(message);
    });
    
  }
  notifyReceiver(receiverId){
    console.log('nofify call', this.userId, receiverId);
    this.socket.emit("message ", receiverId);
  }

  private heartbeater(): void {
    const heartbeater: any = setInterval(() => {
      if (this.socket && this.socket.connected) {
        this.socket.emit('lb-ping', this.userId);
      } else {
        this.socket.removeAllListeners('lb-pong');
        clearInterval(heartbeater);
      }
    }, 15000);
    this.socket.on('lb-pong', (data: any) => console.log('Heartbeat of : ' , data));
  }
}