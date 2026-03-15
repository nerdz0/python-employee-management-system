async function getEmployees() {
  // 1. Identify the host
  const host = process.env.VERCEL_URL || 'employee-management-system-navy-omega.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const cleanHost = host.replace(/^https?:\/\//, '');
  const apiEndpoint = `${protocol}://${cleanHost}/api/employees`;

  // 2. Setup a Timeout (Big Company standard)
  // If the Python API doesn't respond in 5 seconds, we move on
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(apiEndpoint, {
      cache: 'no-store',
      next: { revalidate: 0 },
      signal: controller.signal, // Connect the timeout signal
      headers: {
        'Content-Type': 'application/json',
      }
    });

    clearTimeout(timeoutId); // Cancel the timeout if fetch succeeds

    if (!res.ok) {
      // Log the specific status for easier debugging in Vercel Logs
      const errorText = await res.text().catch(() => 'No error body');
      console.error(`[API Error] Status: ${res.status} | URL: ${apiEndpoint} | Body: ${errorText}`);
      return [];
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data : []; // Ensure we always return an array
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("[API Timeout] The Python backend took too long to respond.");
    } else {
      console.error("[Fetch Exception]:", error.message);
    }
    return []; 
  }
}