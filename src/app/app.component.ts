import { Component, ViewChild, ElementRef } from '@angular/core';
import { connect } from 'socket.io-client';
import { authorId } from './app.constants';
import { Message, IncommingMessage } from './message/message.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static URL = 'https://socket-chat-server-zbqlbrimfj.now.sh'

  @ViewChild('container') container: ElementRef;
  public messages: Message[] = [];
  public currentMessage = '';
  public authorId = authorId;
  private socket;

  public ngOnInit() {

    this.socket = connect(AppComponent.URL, {
      transports: ['websocket'],
      reconnection: true
    });

    this.socket.on('chat message', (message: IncommingMessage) => {
      if (message.authorId !== this.authorId) {
        this.onNewMessage(message);
      }
    });
  }

  public handleEnterPress($event) {
    const text = this.currentMessage.trim();
    if ($event.which === 13 && text.length) {
      $event.preventDefault();
      this.sendMessage();
    };
  }

  public sendMessage() {
    const text: string = this.currentMessage;
    const message: Message = {
      authorId: this.authorId,
      text: text,
      timestamp: Date.now(),
    };
    this.socket.emit('chat message', message);
    this.onNewMessage(message);
    this.currentMessage = '';
  }

  private onNewMessage(message: Message): void {
    this.messages.push(message);
    setTimeout(() => {
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    });
  }
}