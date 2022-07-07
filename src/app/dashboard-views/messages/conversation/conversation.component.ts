import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit,AfterViewChecked  {
  converstaion = [];
  ad:any = {
    owner: {
    }
  };
  message = "";
  receiverId = null;
  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    ) { }
    userId = localStorage.getItem("userId");
    
    @ViewChild('scrollMe',{static: true }) private myScrollContainer: ElementRef;
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
        let adId = params['adId'];
        this.getAd(adId);
      });
      this.socketService.castMessageReceived.subscribe((response) => {
        this.getConversation(this.ad.id);
      });
    }
    ngAfterViewChecked() {        
      this.scrollToBottom();
    } 
    
    scrollToBottom(): void {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
    }
    sellerId;
    getConversation(adId){
      this.converstaion = [];
      this.messageService.getSentMessageForAd(adId).subscribe((response: Array<any>) => {
        this.addMessagesToConversation(response);
        this.sortConverstaion();
        this.scrollToBottom();
      });
      this.messageService.getReceivedMessageForAd(adId).subscribe((response: Array<any>) => {
        if(response.length === 0){
          this.receiverId = this.ad.owner.id;
        }
        this.addMessagesToConversation(response);
        this.sortConverstaion();
        this.scrollToBottom();
      });
    }
    
    addMessagesToConversation(response){
      for(let message of response){
        if(message.senderId == this.userId)
          message.sendByMe = true;
        else{
          message.sendByMe = false;
          this.receiverId = message.senderId;
        }
        this.converstaion.push(message);
      }
    }
    sortConverstaion(){
      this.converstaion = this.converstaion.sort((n1,n2) => {
        if(n1.id > n2.id){
          return 1;
        }
        if(n1.id < n2.id){
          return -1;
        }
        return 0;
      });
    }
    getAd(adId){
      this.messageService.getAd(adId).subscribe((response) => {
        this.ad = response;
        this.getConversation(adId);
      });
    }
    //loggedin user is sender
    sendMessage(){
      this.ad.owner.id
      
      this.messageService.sendMessage(this.ad.id, this.receiverId, this.message).subscribe((response) => {
        if(response){
          this.getConversation(this.ad.id);
          this.message = null;
          this.socketService.notifyReceiver(this.receiverId);
        }
      })
    }
  }
  