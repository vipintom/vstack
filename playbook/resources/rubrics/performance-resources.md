# Review Lens: Performance & Resources

## Purpose
Verify the implementation meets performance requirements and uses resources responsibly.

## Questions to Answer

### Time Complexity
- [ ] Is algorithmic complexity appropriate for data size?
- [ ] Are loops over collections bounded?
- [ ] Are database queries indexed and selective?
- [ ] Is pagination used for large collections?

### Space Complexity
- [ ] Are large objects streamed, not loaded entirely?
- [ ] Are caches bounded with eviction?
- [ ] Are memory leaks prevented (listeners, refs, timers)?

### Latency & Throughput
- [ ] Are synchronous calls minimized on hot paths?
- [ ] Are external calls batched or parallelized?
- [ ] Are timeouts configured on all external calls?

### Resource Management
- [ ] Are connections/pools properly sized and closed?
- [ ] Are file handles, sockets, threads cleaned up?
- [ ] Is backpressure handled for streams?

## Severity Guide
- **Critical:** OOM, unbounded growth, DoS vulnerability
- **High:** N+1 queries, missing pagination, sync on hot path
- **Medium:** Suboptimal algorithm, missing cache, large payload
- **Low:** Minor allocation, missing timeout
- **Informational:** Optimization opportunity

## Evidence Required
- Load test results (if available)
- Profiling data (if available)
- Complexity analysis for new algorithms