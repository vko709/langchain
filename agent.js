// Trace creation
const trace = langwatch.getTrace({
    metadata: { threadId: "mythread-123", userId: "myuser-123" },
  });
  
  // Example of updating the metadata to add labels to the trace if needed
  trace.update({
    metadata: { labels: ["customer-support"] },
  });
  