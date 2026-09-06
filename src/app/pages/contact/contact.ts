import { Component, signal } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly breadcrumbs: BreadcrumbItem[] = [{ label: 'Contact' }];
  readonly status = signal<'idle' | 'sending' | 'sent' | 'warning' | 'error'>('idle');
  readonly feedback = signal('Your email is used only to respond to your message.');
  private submission: { id: string; content: string } | null = null;

  async submit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.status() === 'sending') return;
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payload = {
      email: String(data.get('email') ?? '').trim(),
      subject: String(data.get('subject') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      website: String(data.get('website') ?? ''),
    };
    if (!payload.email || !payload.subject || !payload.message) {
      this.status.set('error');
      this.feedback.set('Please complete all three fields. Spaces alone do not count.');
      return;
    }
    this.status.set('sending');
    this.feedback.set('Safely saving your message…');
    try {
      const content = JSON.stringify(payload);
      if (this.submission?.content !== content)
        this.submission = { id: crypto.randomUUID(), content };
      const response = await fetch('https://portfolio-contact-form.johnbieniekgt.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, submissionId: this.submission.id }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        saved?: boolean;
        queued?: boolean;
        message?: string;
      };
      if (!response.ok || !result.ok || !result.saved) {
        this.status.set('error');
        this.feedback.set(
          result.message ??
            'Your message could not be saved. Please try again or email me directly.',
        );
        return;
      }
      form.reset();
      this.submission = null;
      this.status.set(result.queued === false ? 'warning' : 'sent');
      this.feedback.set(result.message ?? 'Thank you! Your message is safely saved.');
    } catch {
      this.status.set('error');
      this.feedback.set(
        'I couldn’t confirm your message was saved. Your text is still here—please try again, or email me directly. Retrying the same message won’t create another submission.',
      );
    }
  }
}
