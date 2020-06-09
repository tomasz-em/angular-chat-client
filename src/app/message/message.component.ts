import { Component, Input } from '@angular/core';
import { authorId } from '../app.constants';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input('message') message;
  @Input('isLast') isLast;
  public authorId = authorId;
}