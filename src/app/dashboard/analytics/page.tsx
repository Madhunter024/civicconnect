// This file is intentionally blank. The analytics content is part of the main dashboard page.
// In a more complex app, this might be a separate page with more detailed analytics.
// We are redirecting to the main dashboard page.

import { redirect } from 'next/navigation';

export default function AnalyticsPageRedirect() {
    redirect('/dashboard');
}
