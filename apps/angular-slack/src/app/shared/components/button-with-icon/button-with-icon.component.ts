import { Component, ChangeDetectionStrategy, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button-with-icon',
  templateUrl: './button-with-icon.component.html',
  styleUrls: ['./button-with-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonWithIconComponent {
  @Input() text: string;
  @Input() color: string;
  @Input() iconColor: string;
  @Input() icon: IconProp;
  @Input() leftIcon = true;
  @ViewChild('btn') button: ElementRef;

  constructor(
    private renderer: Renderer2,
  ) { }

  toggleColor(active: boolean) {
    this.renderer.setStyle(this.button.nativeElement, 'background-color', active ? this.iconColor : this.color);
  }
}
