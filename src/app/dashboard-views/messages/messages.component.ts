import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messageInbox = [];

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.messageService.getLatestSentMessage().subscribe((response: Array<any>) => {
      this.addMessage(response);
    });
    this.messageService.getLatestReceivedMessages().subscribe((response: Array<any>) => {
      this.addMessage(response);
    });
  }

  addMessage(response){
    for(let message of response){
      this.messageInbox.push(message);
    }
    this.sortInbox();
    this.removeDuplicates();
  }

  sortInbox(){
    this.messageInbox = this.messageInbox.sort((n1,n2) => {
      if(n1.id > n2.id){
        return 1;
      }
      if(n1.id < n2.id){
        return -1;
      }
      return 0;
    });
  }
  removeDuplicates(){
    this.messageInbox = Array.from(new Set(this.messageInbox.map(a => a.ad.id)))
      .map(id => {
        return this.messageInbox.find(a => a.ad.id === id)
      });
  }
}
