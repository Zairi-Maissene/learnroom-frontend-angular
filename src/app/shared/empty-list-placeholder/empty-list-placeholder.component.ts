import { ChangeDetectionStrategy } from '@angular/core';
import { Component, inject, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-list-placeholder',
  templateUrl: './empty-list-placeholder.component.html',
  styleUrls: ['./empty-list-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyListPlaceholderComponent implements OnChanges {
  @Input() type: string = '';
  @Input() user: string = '';

  image = 'assets/images/emptyState.png';

  title = 'No Courses';
  descriptionText1 = 'There are no courses in this classroom yet.';
  descriptionText2 = 'Wait for your teacher to publish one.';
  router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {

      if (this.user === 'teacher') {
        this.descriptionText2 = ' Add one .';
      }
      if (this.type === 'task') {
        this.title = 'No Tasks';
        this.descriptionText1 = 'There are no tasks in this classroom yet. ';
      }
      if (this.type === 'assignment') {
        this.title = 'No Assignments';
        this.descriptionText1 =
          'There are no assignments in this classroom yet. ';
      }

    }
    if (this.type === 'students') {
      this.title = 'No Students';
      this.descriptionText1 =
        'There are no students in this classroom yet. ';
    }
  }

  goHome(): void {
    this.router.navigate(['/classroom']);
  }
}
