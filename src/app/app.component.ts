import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SwitchModule } from '@progress/kendo-angular-inputs';
@Component({
  selector: 'app-root',
  imports: [SwitchModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly name = signal('');
  readonly email = signal('');
  readonly selectedStates = signal<string[]>([]);
  readonly aiActivated = signal(false);
  readonly aiNumber = signal('');
  readonly aiLoading = signal(false);
  readonly aiOpen = signal(false);

  readonly STATE_OPTIONS = ['Washington', 'Wyoming', 'California'];

  readonly updateStates = (value: string) => {
    if (!this.selectedStates().includes(value)) {
      this.selectedStates.update((s) => [...s, value]);
      return;
    }
    this.selectedStates.update((s) => [
      ...s.filter((state) => state !== value),
    ]);
  };

  readonly setAiNumber = (event: Event) => {
    this.aiNumber.set((event.target as HTMLInputElement).value);
  };

  readonly makeGuess = () => {
    this.aiLoading.set(true);
    this.aiOpen.set(true);
    setTimeout(() => {
      this.aiLoading.set(false);
    }, 2000);
  };

  readonly submit = (event: Event) => {
    event.preventDefault();
    console.log(this.name());
    console.log(this.email());
  };

  readonly dropdownOpen = signal(false);
  readonly selectedOption = signal('');
  readonly toggleDropdown = () => {
    this.dropdownOpen.update((open) => !open);
  };
  readonly dropdownOptions = [
    'Explore the Mountains',
    'Relax at the Beach',
    'Discover the City',
    'Adventure in the Forest',
    'Cruise on the River',
  ];
  readonly updateSelectedOption = (e: Event) => {
    this.selectedOption.set((e.target as HTMLSelectElement).value);
  };
}
